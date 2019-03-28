import pandas as pd
import numpy as np
import re

df = pd.read_csv('properties-New-York-NY.csv')

to_drop=['title','real estate provider','url']
df.drop(columns=to_drop, inplace=True)

df.dropna(inplace=True)
df['postal_code']=df['postal_code'].astype(int).astype(str)

df['location']=df['address']+','+df['city']+','+df['postal_code']
to_drop2=['address','city','state','postal_code']
df.drop(columns=to_drop2, inplace=True)
#df["price_per_month"]=df["price"].str.extract(r"(\d*\.?\d+)", expand=True)
df['price_per_month']=df['price'].apply(lambda x: re.sub(r'\D',"", x))
new_feature=df['facts and features'].str.split(" ",expand=True)
df['bed num']=new_feature[0]
df['bath num']=new_feature[3]
df['sqft']=new_feature[6]


to_drop3=['facts and features','price']
df.drop(columns=to_drop3, inplace=True)

df['bed_num']=df['bed num'].apply(lambda x: re.sub(r'\D',"", x))
df['bath_num']=df['bath num'].apply(lambda x: re.sub(r'\D',"", x))
df['sqft_']=df['sqft'].apply(lambda x: re.sub(r'\D',"", x))

to_drop4=['bed num','bath num','sqft']
df.drop(columns=to_drop4, inplace=True)


df.drop_duplicates(inplace=True)


#change some column data to be numeric data
df[['price_per_month','bed_num','bath_num','sqft_']]=df[['price_per_month','bed_num','bath_num','sqft_']].apply(pd.to_numeric)
#then sort by the price
df.sort_values(by=['price_per_month'],inplace=True)
df.to_csv('cleaned_zillow_data.csv',index=False,index_label=False)

print(df.head())
print(df.shape)

