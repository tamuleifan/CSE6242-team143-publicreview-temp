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
df['price']=df['price'].apply(lambda x: re.sub(r'\D',"", x))
#print(df[])
print(df.head())
print(df.shape)

