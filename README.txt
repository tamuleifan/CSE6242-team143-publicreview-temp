# 	Interactive Map for House Rental

CSE 6242 course project assisting office workers and students to find rentals with safety and commuting comfort in mind

By Yuting Lu; Lei Fan; Mingting Lu; Dun Li; Chenxi Yu

## Descriptions
- Our app provides filtering options for rent seekers based on commute time and informing crime rates severity via data footprint size in the Google map 


## Required Dependencies

- Please install Numpy, Pandas and geopy libraries in order to use our application via the following command:
pip install numpy pandas geopy

## Installation

- You can choose to download the entire zip file for this repository to your system or use terminal:

```
git clone https://github.com/Morek999/CSE6242team143.git
```

- Scrape the properties-New-York-NY.csv dataset by running the following command and ensure the dataset in the main directory of the repository's folder and run the following command to clean the data yielding cleaned_zillow_data.csv at the FrontEnd folder:
```
python zillow.py
python zillow_clean.py

```

- Open terminal inside the cse6242-project folder. Run the following command line in a python 3.6 default commond line prompt:
```
python -m http.server
```
- The next step hosts a port for running your interative APP:
```
* Running on http://localhost:8000/ (Press CTRL+C to quit)
```
- Open a web browser and type in http://localhost:8000/ at your search bar

## Experimenting

- First,after the above steps,you can click on the "Explore" Botton at our welcoming page.

- Second, this page will provide instructions and a search map, a slide bar and a search bar and a event option controler.

- The destination search bar allows you to fill in your destination and the commute time slide bar option enables you to show avalible options meeting the commute time requirement.

- When you are done with your selections and information filling, you could interact with the map via dragging or hovering over to a desired location for relevant information

If you catch errors with our implementation, please feel free to give pull requests on our Github page. If you want to build-upon our work, fork us (and star us if you appreciate our work!).

## Environment Compatibility

- Our project is built upon Python 3+ environment and not yet supporting python 3 below version environment built, though we suggest Python 3.6 is the best compatible.Our Web browser compatible is either Chrome or FireFox.
