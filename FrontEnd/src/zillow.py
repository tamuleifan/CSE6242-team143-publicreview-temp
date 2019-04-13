# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

from lxml import html
import requests
import unicodecsv as csv
#import argparse
#import sys
"""
url example1 https://www.zillow.com/homes/for_rent/New-York-NY/6181_rid/paymenta_sort/1_p 
request the first page of zillow data ranked by price
url example2 https://www.zillow.com/homes/for_rent/New-York-NY/6181_rid/days_sort/1_p 
request the first page of zillow data ranked by posted date


command to run the scirpt example:
python zillow.py

output:
properties-New_York_NY CSV file

"""
def parse(location,filter=None,pagenum=None):
    page_index=str(pagenum+1)+'_p'
    if filter=="newest":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/days_sort/{1}/".format(location,page_index)
        print(url)
    elif filter == "cheapest":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/paymenta_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="expensive":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/paymentd_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="bednum":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/beds_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="bathnum":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/baths_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="size":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/size_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="yearbuild":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/built_sort/{1}/".format(location,page_index)
        print(url)
    elif filter =="lot":
        url = "https://www.zillow.com/homes/for_rent/{0}/6181_rid/lot_sort/{1}/".format(location,page_index)
        print(url)
    for i in range(5):
		# try:
        headers= {
					'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					'accept-encoding':'gzip, deflate, sdch, br',
					'accept-language':'en-GB,en;q=0.8,en-US;q=0.6,ml;q=0.4',
					'cache-control':'max-age=0',
					'upgrade-insecure-requests':'1',
					'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
                    }
        response = requests.get(url,headers=headers)
        #print ("hello")
        print(response.status_code)
        parser = html.fromstring(response.text)
        search_results = parser.xpath("//div[@id='search-results']//article")
        #print (search_results)
        properties_list = []
		
        for properties in search_results:
            raw_address = properties.xpath(".//span[@itemprop='address']//span[@itemprop='streetAddress']//text()")
            raw_city = properties.xpath(".//span[@itemprop='address']//span[@itemprop='addressLocality']//text()")
            raw_state= properties.xpath(".//span[@itemprop='address']//span[@itemprop='addressRegion']//text()")
            raw_postal_code= properties.xpath(".//span[@itemprop='address']//span[@itemprop='postalCode']//text()")
            raw_price = properties.xpath(".//span[@class='zsg-photo-card-price']//text()")
            raw_info = properties.xpath(".//span[@class='zsg-photo-card-info']//text()")
            raw_broker_name = properties.xpath(".//span[@class='zsg-photo-card-broker-name']//text()")
            url = properties.xpath(".//a[contains(@class,'overlay-link')]/@href")
            raw_title = properties.xpath(".//h4//text()")
			
            address = ' '.join(' '.join(raw_address).split()) if raw_address else None
            city = ''.join(raw_city).strip() if raw_city else None
            state = ''.join(raw_state).strip() if raw_state else None
            postal_code = ''.join(raw_postal_code).strip() if raw_postal_code else None
            price = ''.join(raw_price).strip() if raw_price else None
            info = ' '.join(' '.join(raw_info).split()).replace(u"\xb7",',')
            broker = ''.join(raw_broker_name).strip() if raw_broker_name else None
            title = ''.join(raw_title) if raw_title else None
            property_url = "https://www.zillow.com"+url[0] if url else None 
            #is_forsale = properties.xpath('.//span[@class="zsg-icon-for-sale"]')
            is_forrent = properties.xpath('.//span[@class="zsg-icon-for-rent"]')
            properties = {
							'address':address,
							'city':city,
							'state':state,
							'postal_code':postal_code,
							'price':price,
							'facts and features':info,
							'real estate provider':broker,
							'url':property_url,
							'title':title
                            }
            if is_forrent:
                properties_list.append(properties)
        return properties_list
		#except:
		# 	print ("Failed to process the page",url)

if __name__=="__main__":
	#argparser = argparse.ArgumentParser(formatter_class=argparse.RawTextHelpFormatter)
	#argparser.add_argument('zipcode',help = '')
    sort_list=["newest","cheapest","expensive","bednum","bathnum","size","yearbuild","lot"]
    location="New-York-NY"
    pages=20
    
    #sysargv = sys.argv
    #location=sys.argv[1]
    #sort=sys.argv[2]
    #request_num_page=sys.argv[3]
    #sortorder_help = """
    #available sort orders are :
    #newest : Latest property details,
    #cheapest : Properties with cheapest price
    #"""
	#argparser.add_argument('sort',nargs='?',help = sortorder_help,default ='Homes For You')
	#args = argparser.parse_args()
	#zipcode = args.zipcode
	#sort = args.sort
    print ("Fetching data for %s"%(location))
    scraped_data=[]
    #pages=int(request_num_page) # how many pages to scape
    for sort in sort_list:
        for i in range(pages):
            scraped_data.append(parse(location,sort,i))
        #scraped_data = parse(location,sort)
    #print(scraped_data)
    print(len(scraped_data))
    print ("Writing data to output file")
    with open("properties-%s.csv"%(location),'wb')as csvfile:
        fieldnames = ['title','address','city','state','postal_code','price','facts and features','real estate provider','url']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for value in scraped_data:
            for row in  value:
                writer.writerow(row)
