# Interactive Map for House Rental

This CSE 6242 course project aims to assist office workers and students to find safe rentals that are within the acceptable commute time.

By [Yuting Lu](ylu467@gatech.edu); [Lei Fan](lfan45@gatech.edu); [Mingting Lu](mlu305@gatech.edu); [Dun Li](dli424@gatech.edu); [Chenxi Yu](cyu321@gatech.edu)

## DESCRIPTION
- Our app provides filtering options for rental seekers based on commute time and informing crime rates severity via data footprint heatmap in the Google map.
- Besides, as soon as rental seekers click on the location and landmarks pointers at the map, related location information will appear within a tooltip.
- After determining the starting and the destination, an optimal path will appear in the map in shallow blue color.
- Three commute options are available: Walking, Driving and Transit.


## INSTALLATION

### Required Dependencies

- Our project is built upon Python 3+ environment and not yet supporting versions below python 3 environment, though we suggest Python 3.6 is the best compatible. Our Web browser compatible is either Chrome or FireFox.
- Please install Numpy, Pandas and geopy libraries in order to use our application via the following command:

```
pip install numpy pandas geopy
```
- You can choose to download the entire zip file of this repository to your system or use terminal:

### Installation Steps

```
cd CSE6242team143
```
- Make sure the command directory is at CSE6242team143 where includes "css","data","index.html"...etc
- Scrape the properties-New-York-NY.csv dataset by running the following command and ensure the dataset is in the main directory of the repository's folder. 
- Run the following command in sequential to clean the data, and the cleaned_zillow_data.csv will be generated in the src folder:
```
python src/zillow.py
python src/zillow_clean.py
```


## EXECUTION

- Open terminal and move to \CSE6242team143. Run the following command line in a python 3.6 or above default commond line prompt:
```
python -m http.server
```
- The next step hosts a port for running your interative APP, displaying:
```
* Running on http://localhost:8000/ (Press CTRL+C to quit)
or
* Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```
- Open a web browser (Chrome or FireFox are recommended) and type in http://localhost:8000/ at your search bar
## VIDEO DEMO 
```
 https://youtu.be/yL_cUxeNhVQ
```
## USER MANUAL

- Following the above steps, you can click on the "Explore" Botton at our welcoming page.

- The following page will provide instructions and a search map, a slide bar and a search bar and a event option controler.

- The destination search bar allows you to fill in your destination and the commute time slide bar option enables you to show available options meeting the commute time requirement.

- When you are done with your selections and information filling, you could interact with the map via dragging or clicking a desired location for relevant information

- The Crime Rate Heatmap option visualizes historical crime rates locations via heatmap.

- After determining the starting and the destination, an optimal path will appear in the map in shallow blue color with 3 commute modes available: walking, driving and transiting(a combination of walking and using public transit tools)

## POTENTIAL ERRORS
- Not supporting all the locations users fill into the search bar (limiting to New York City)
- A stable access to the Internet is needed. Otherwise,web scraping data from zillow may end up being interrupted therefore failing to render sufficient data for the app running in the front end.
- Marginal errors on commute time may occasionally occur due to data rounding and collections via the Google API. 

If you catch errors with our implementation, please feel free to give pull requests on our Github page. If you want to build-upon our work, fork us (and star us if you appreciate our work!).

## ONLINE DEPLOYMENT
[This application](https://cse6242-project-teamxyz.herokuapp.com/) is also deployed online. You can play with it!
