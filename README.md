# Timeline
-  4/16 (Tue.): Compelete evaluation survey (5 responses for each member) 
-  **4/19 (Fri.) : Next Meeting**
-  4/19 (Fri.): Finish all the requirements, inclduing final report, poster, code, and README.txt
-  4/21 (Sun.): Recording poster presentation ([**_requirements_**](https://docs.google.com/document/d/e/2PACX-1vTc_2yqk8QfK-SkdDPxJVJcM31kogiVFsZKOuJ2qHHnRn5aaA4r74u-gErMTsE8jGVoYeVB83MtjFTN/pub#h.l9wzpzeec46p)) and uplaod assignment
-  **4/22 (Mon.) 20:00 : Deadline for everything**

# Meeying Note 2019/04/12
- 晨曦: 撰寫README.txt
- 樊磊: 4/16收集完evaluation之後，處理問卷數據並在4/19前將分析結果放入final report (圖片、文字)
- 李盾: 周末產出conclusion草稿
- Mingting, Yuting, 李盾: 4/19前完成final report
  - 4/16前修改proposed method的部分
  - 4/19潤稿

# Meeting Note 2019/04/08
- Mingting: Refine final report from progress report
- Yuting: Cleansing 房源資訊，移除location中(undisclosed Address)的部分。clean後csv增加兩個欄位：由地址轉換出的經度、緯度
- 晨曦: 撰寫README.txt。注意[Project Description](https://docs.google.com/document/d/e/2PACX-1vTc_2yqk8QfK-SkdDPxJVJcM31kogiVFsZKOuJ2qHHnRn5aaA4r74u-gErMTsE8jGVoYeVB83MtjFTN/pub#h.9rebwbttjkfm)的要求，可參考[過去組別](https://github.com/Morek999/CSE6242team143/blob/master/Data%20Collection.md#reference-of-past-project)撰寫的結構
-  李盾: 幫忙起草poster(架構、需要哪些內容，可先試著填寫)
-  樊磊: 增加前端功能，marker按下去之後
    -  顯示clicked marker to destination的通勤路線(ex: 以藍色標出)
    -  顯示info window或在右方HTML顯示房源資訊，for example:
       -  Price: 400.0/month
       -  Bed: 1
       -  Bath: 1
       -  Size(sqft): 1,600.0
       -  Commute Time: 22min by driving/walking/transit
       -  [Zillow Link](https://www.zillow.com/homedetails/Main-St-Staten-Island-NY-10307/2088886871_zpid/)

# To-do 2019/03/29
1. Zillow 數據有點少，空值欄位有點多；爬取時能否帶回URL作為tooltips的info (可以讓user連結回zillow看準確的房屋訊息跟圖片) 
2. Zillow房源數據轉經緯度的方法
3. Crime rate heatmap 怎麼繪製 (JS的function)
4. 前端加layer (房源、crime rate heatmap)
5. 用戶輸入filter怎麼實現

---
---
# 	Interactive Map for House Rental

CSE 6242 course project assisting office workers and students to find rentals with safety and commuting comfort in mind

By Yuting Lu; Lei Fan; Mingting Lu; Dun Li; Chenxi Yu

## Descriptions
- Our app provides filtering options for rental seekers based on commute time and informing crime rates severity via data footprint heatmap in the Google map 
- Besides, as soon as rental seekers click on the location and landmarks pointers at the map, related location information will appear within a tooltip.
- After determining the starting and the destination, an optimal path will appear in the map in shallow blue color.
- Three commute options are available:Walking,Driving and Transit.


## Required Dependencies

- Please install Numpy, Pandas and geopy libraries in order to use our application via the following command:
pip install numpy pandas geopy

## Installation

- You can choose to download the entire zip file for this repository to your system or use terminal:

```
git clone https://github.com/Morek999/CSE6242team143.git
```

- Scrape the properties-New-York-NY.csv dataset by running the following command and ensure the dataset in the main directory of the repository's folder and run the following command in sequential to clean the data yielding cleaned_zillow_data.csv at the FrontEnd folder:
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

- When you are done with your selections and information filling, you could interact with the map via dragging or clicking a desired location for relevant information

- The Crime Rate Heatmap option visualizes historical crime rates locations via heatmap.

- After determining the starting and the destination, an optimal path will appear in the map in shallow blue color with 3 commute modes available: walking, driving and transiting(a combination of walking and using public transit tools)

If you catch errors with our implementation, please feel free to give pull requests on our Github page. If you want to build-upon our work, fork us (and star us if you appreciate our work!).

## Environment Compatibility

- Our project is built upon Python 3+ environment and not yet supporting python 3 below version environment built, though we suggest Python 3.6 is the best compatible.Our Web browser compatible is either Chrome or FireFox.
## Potential Errors:
- Not supporting all the locations users fill into the search bar
