# SlideBar
- https://www.w3schools.com/howto/howto_js_rangeslider.asp
- How to add slide bar and how to read the bar number from javascript

# Crime
- City of NY https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i
  - crime type： felony, misdemeanor, violation
  - victims age group： <18, 18-24, 25-44, 45-64, 65+。

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
- https://desktop.arcgis.com/en/arcmap/latest/extensions/network-analyst/exercise-1-creating-a-network-dataset.htm
- https://blog.csdn.net/qq_36091581/article/details/76944053
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
- calendar
Provides details about booking for the next year by listing. Four attributes in total including listing_id (discrete), date(datetime), available (categorical) and price (continuous).
- Cleansing steps (houses from Zillow) 
    1. compile street, city, zip into location
    2. delete houses without location
    3. set data header and formulate strings 
    4. delete duplicate rows
    5. order by price
    6. save to csv file

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
