import pandas as pd
import numpy as np
import re
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from geopy import geocoders

df = pd.read_csv('properties-New-York-NY.csv')

to_drop=['title','real estate provider']
df.drop(columns=to_drop, inplace=True)

# drop the rows, if the address column is nan
df.dropna(subset=['address'],inplace=True)
df['postal_code']=df['postal_code'].astype(int).astype(str)

#combine the address,city,postal_code column into location
df['location']=df['address']+','+df['city']+','+df['state']+','+df['postal_code']
to_drop2=['address','city','state','postal_code']
df.drop(columns=to_drop2, inplace=True)

#delete the non-digit character in the price column
df['price_per_month']=df['price'].apply(lambda x: re.sub(r'\D',"", x))

#split the facts and features column into mutiple columns
new_feature=df['facts and features'].str.split(" ",expand=True)
df['bed num']=new_feature[0]
df['bath num']=new_feature[3]
df['sqft']=new_feature[6]






#deal with special case: Studio, represent 1 bed room and 1 bath room
for i in range(df.shape[0]):
    #print(df.iloc[i,2])
    if df.iloc[i,5]=='Studio':
        df.iloc[i,5]='1'
        df.iloc[i,6]='1'
        df.iloc[i,7]=new_feature.iloc[i,5]

#df['bed num'].replace(to_replace='Studio',value='1',inplace=True)
#df['bath num'].replace(to_replace='ba',value='1',inplace=True)

#df['sqft'].replace(to_replace='--',value=np.nan,inplace=True)
df['bed num'].replace(to_replace='--',value=np.nan,inplace=True)
df['bath num'].replace(to_replace='--',value=np.nan,inplace=True)






to_drop3=['facts and features','price']
df.drop(columns=to_drop3, inplace=True)
#exact the numb from the strings via regular experssion synstax
# df['bed_num']=df['bed num'].apply(lambda x: re.sub(r'\D',"", x))
# df['bath_num']=df['bath num'].apply(lambda x: re.sub(r'\D',"", x))
df['sqft']=df['sqft'].apply(lambda x: re.sub(r'\D',"", x))

#print(df.head())



df['url of rental info']=df['url']

#to_drop4=['bed num','bath num','sqft','url']
to_drop4=['url']
df.drop(columns=to_drop4, inplace=True)


df.drop_duplicates(inplace=True)


# #change some column data to be numeric data
df[['price_per_month','bed num','bath num','sqft']]=df[['price_per_month','bed num','bath num','sqft']].apply(pd.to_numeric)

#drop the rows wth the price_per_month is nan

df.dropna(subset=['price_per_month'],inplace=True)
#then sort by the price
df.sort_values(by=['price_per_month'],inplace=True)

#fill nan with method  bfill first and then ffill
df.fillna(method='bfill',inplace=True)
df.fillna(method='ffill',inplace=True)


#delete the row which location contains undisclosed Address
special_string='(undisclosed Address)'
condition=df['location'].apply(lambda y: special_string not in y)
df=df[condition]

#change the location to latitude and longitude
# geolocator = Nominatim(user_agent="specify_your_app_name_here")
# df['latitude']=0
# df['longitude']=0

# geolocator = Nominatim(user_agent="yutinglu")

# for i in range(df.shape[0]):
#         print(df.iloc[i,0])

#         try:
#                 target=geolocator.geocode(df.iloc[i,0],timeout=60)

#                 df.iloc[i,6] = target.latitude
#                 df.iloc[i,7] = target.longitude
#         except:
#                 pass

g = geocoders.GoogleV3(api_key='AIzaSyD8f3gxQL4k8-jUVsNvq01HPVtqa0bbXpY')
df['latitude']=0
df['longitude']=0

for i in range(df.shape[0]):
        print(df.iloc[i,0])
        try:
                target=g.geocode(df.iloc[i,0],timeout=10)

                df.iloc[i,6] = target.latitude
                df.iloc[i,7] = target.longitude
        except:
                pass

#create an input address string
#you can also build this by reading from an input database and building a string
# inputAddress = '175 5th Ave, New York,  NY' 

# #do the geocode
# location = g.geocode(inputAddress, timeout=10)

# #some things you can get from the result
# print(location.latitude, location.longitude)
# print(location.raw)
# print(location.address)

# delete the rows which has zero latitute, which represetns google map request fail
df=df[df['latitude']!=0]
df.to_csv('../data/cleaned_zillow_data.csv',index=False,index_label=False)



#print(df.iloc[444,:])
#print(df.head())
#print(df.shape)

