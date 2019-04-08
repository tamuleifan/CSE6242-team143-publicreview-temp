# Meeting Note 2019/04/08
## To-do
- Mingting: Refine final report from progress report
- Yuting: Cleansing 房源資訊，移除location中(undisclosed Address)的部分。clean後csv增加兩個欄位：由地址轉換出的經度、緯度
- 晨曦: 撰寫README.txt。注意[Project Description](https://docs.google.com/document/d/e/2PACX-1vTc_2yqk8QfK-SkdDPxJVJcM31kogiVFsZKOuJ2qHHnRn5aaA4r74u-gErMTsE8jGVoYeVB83MtjFTN/pub#h.9rebwbttjkfm)的要求，可參考[過去組別](https://docs.google.com/document/d/e/2PACX-1vTc_2yqk8QfK-SkdDPxJVJcM31kogiVFsZKOuJ2qHHnRn5aaA4r74u-gErMTsE8jGVoYeVB83MtjFTN/pub#h.9rebwbttjkfm)撰寫的結構
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
## Timeline
-  **4/12 (Fri.): Next meeting**
-  4/14 (Sun.): Has to finish all the front-end development
-  4/18 (Thu.): Compelete evaluation survey (5 responses for each member)
-  4/20 (Sat.): Has to finish all the requirements, inclduing final report, poster, code, and README.txt
-  4/21 (Sun.): Recording poster presentation ([**_requirements_**](https://docs.google.com/document/d/e/2PACX-1vTc_2yqk8QfK-SkdDPxJVJcM31kogiVFsZKOuJ2qHHnRn5aaA4r74u-gErMTsE8jGVoYeVB83MtjFTN/pub#h.l9wzpzeec46p)) and uplaod assignment
-  **4/22 (Mon.): Deadline for everything**


# To-do 2019/03/29
1. Zillow 數據有點少，空值欄位有點多；爬取時能否帶回URL作為tooltips的info (可以讓user連結回zillow看準確的房屋訊息跟圖片) 
2. Zillow房源數據轉經緯度的方法
3. Crime rate heatmap 怎麼繪製 (JS的function)
4. 前端加layer (房源、crime rate heatmap)
5. 用戶輸入filter怎麼實現
