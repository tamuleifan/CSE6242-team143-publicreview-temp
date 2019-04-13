# SlideBar
- https://www.w3schools.com/howto/howto_js_rangeslider.asp
- How to add slide bar and how to read the bar number from javascript

# Crime
- City of NY https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i
  - 从06年到17年，6M行数据，1.9G的csv文件，有犯罪发生地点的经纬度（有六位小数点，相当于0.1米）。犯罪类型:  分为三种： felony, misdemeanor, violation
  - 受害者年龄: 分为五类： <18, 18-24, 25-44, 45-64, 65+。
  - 交互界面可以考虑让用户输入年龄段和性别，根据不同用户给出不同的犯罪率数据，也可以作为我们的一个创新点。不同的犯罪类型可以给不同的权重，（怎么量化？我再找找看）。

# Map
- OpenStreetMap shapefile http://download.geofabrik.de/north-america/us/new-york.html
- City of NY: Street Centerline https://data.cityofnewyork.us/City-Government/NYC-Street-Centerline-CSCL-/exjm-f27b
- Map house python project https://github.com/DIVIBEAR/pythonDemo/tree/master/demo/mapHouse
- Google Map 
  - Custom Layer https://developers.google.com/maps/documentation/javascript/datalayer
  - Get Bounds of Window https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds

# Google Map API
- geocoding API
  - Convert address to geo lat and lng
  - https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
- Directions API
  - Draw routes
  - basic parameters: orgin, destination, key, mode, avoid, arrival_time, departure_time, traffic_model
- Distance Matrix API
  - calculate the distance between two locations
- Earthquake
  - could be helpful for visulizing crime area
  - https://developers.google.com/maps/documentation/javascript/earthquakes
- Heatmap Layer https://developers.google.com/maps/documentation/javascript/heatmaplayer
- Event listener https://developers.google.com/maps/documentation/javascript/events
- add Marker on map https://developers.google.com/maps/documentation/javascript/examples/marker-labels
- Info Window https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple

# Commute
- https://www.walkscore.com/professional/travel-time-js-api.php
- https://gis.ny.gov/gisdata/inventories/results.cfm?SWIS=&sectorIDs=&themeIDs=24
- 方法一：用以上为开源数据库
- 方法二：也可以用esri Arcgis 建好的network dataset ， esri 提供21天免费试用，可以先在arcgis 里设置好network dataset 再导出，教程如下https://desktop.arcgis.com/en/arcmap/latest/extensions/network-analyst/exercise-1-creating-a-network-dataset.htm
- 方法三：用Google map的数据 参考：https://blog.csdn.net/qq_36091581/article/details/76944053
- Google Distance Matrix API: https://developers.google.com/maps/documentation/javascript/distancematrix
  - traffic_model = best_guess (default), pessimistic, optimistic
  - mode (for travel mode) = driving (default), walking, bicycling, transit \[bus, subway, train, tram, rail]

# Rental
- Airbnb Data(search for New York City)
  http://insideairbnb.com/get-the-data.html
- listings:
Detailed listings data showing 96 attributes for each of the llistings. Some of the attributes used in the analysis are price(continuous), longitude (continuous), latitude (continuous), listing_type (categorical), is_superhost (categorical), neighbourhood (categorical), ratings (continuous) among others.
- reviews:
Detailed reviews given by the guests with 6 attributes. Key attributes include date (datetime), listing_id (discrete), reviewer_id (discrete) and comment (textual).
--calendar
Provides details about booking for the next year by listing. Four attributes in total including listing_id (discrete), date(datetime), available (categorical) and price (continuous).

  -通过爬zillow 网页可以获取相应的房源数据 包括（面积，bed num,bath num,价格 address) ，但能够爬取的数据量不是很大，网页上显示有1万+条，网页上每个排序的特性能够显示的只有20个page。目前通过特性进行排序（newest, rent from low to high,rent from high to low, bedrooms, bathrooms,squarefeet,year built, lot size),根据这些特性出来的数据有一定的互补性，大概加总的数据为3000+。详细的数据看properties-New-York-NY.csv(数据还没有经过清洗，下一步进行清洗）
 
 -zillow 房源数据清洗： 通过对爬取的3000多跳数据进行清洗 清晰步骤： 
      1. 合并相关的street, city, zip 为location
      1. 删除没有location的房源，
      2. data header分为（location, price_per_month, bed_num,bath_num,sqft_), 同时对str数据进行正则化操作，取出需要的数字,去除多余的不必要字   符。例如price, bed number, bath num and sqft. 
      3.去掉重复的房源
      4. 按price 进行排序
      5. save to csv file
      

# Other
- City of NY https://opendata.cityofnewyork.us/data/
- Free CSS Templates https://www.free-css.com/

# Some intros to git commands
- Branching and merging https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
- Basics https://www.youtube.com/watch?v=0fKg7e37bQE

## Reference of Past Project
- Interactive Document Clustering https://github.com/amirziai/cse6242-project
- Visual Analytics on Global Terrorism https://github.com/mxu007/cse6242-project
- Rental Recommendation for Commuters https://github.com/jionie/Rental-Recommendation-for-Commuters