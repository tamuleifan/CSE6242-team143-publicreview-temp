# Crime

# Map
- OpenStreetMap shapefile http://download.geofabrik.de/north-america/us/new-york.html
- City of NY: Street Centerline https://data.cityofnewyork.us/City-Government/NYC-Street-Centerline-CSCL-/exjm-f27b
- Map house python project https://github.com/DIVIBEAR/pythonDemo/tree/master/demo/mapHouse

# Commute
- https://gis.ny.gov/gisdata/inventories/results.cfm?SWIS=&sectorIDs=&themeIDs=24
- 方法一：用以上为开源数据库
- 方法二：也可以用esri Arcgis 建好的network dataset ， esri 提供21天免费试用，可以先在arcgis 里设置好network dataset 再导出，教程如下https://desktop.arcgis.com/en/arcmap/latest/extensions/network-analyst/exercise-1-creating-a-network-dataset.htm
- 方法三：用Google map的数据 参考：https://blog.csdn.net/qq_36091581/article/details/76944053

# Rental
- Airbnb Data(search for New York City)
  http://insideairbnb.com/get-the-data.html
- listings:
Detailed listings data showing 96 attributes for each of the llistings. Some of the attributes used in the analysis are price(continuous), longitude (continuous), latitude (continuous), listing_type (categorical), is_superhost (categorical), neighbourhood (categorical), ratings (continuous) among others.
- reviews:
Detailed reviews given by the guests with 6 attributes. Key attributes include date (datetime), listing_id (discrete), reviewer_id (discrete) and comment (textual).
--calendar
Provides details about booking for the next year by listing. Four attributes in total including listing_id (discrete), date(datetime), available (categorical) and price (continuous).
-通过爬zillow 网页可以获取相应的房源数据 包括（面积，bed num,bath num, address) 价格，但能够爬取的数据量不是很大，网页上显示有1万+条，但网页上能够显示的只有20个page。目前通过两个特性进行排序（newest, rent from low to high),两个特性显示的页面都分别是20个page， 两个特性出来的数据有一定的互补性，大概加总的数据为1000+。如果需要更大的数据量，可以根据其他的特性再进行爬取，估计数据量能够达到3000左右。



# Other
- City of NY https://opendata.cityofnewyork.us/data/
