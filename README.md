# GeoRelations - Junction 2019

GeoRelations: As an interactive visualisation of geographical correlations in visitor traffic that goes beyond distance measures and people flows, our tool provides novel and creative insights and analytics opportunities for small businesses and local governments.

## Introduction
Nowadays, it is common for local businesses and public institutions to gather data about their own establishment. What is mostly missed, however, is the importance of relations to other facilities in the same city. Access to this data would open a whole new level of analytics and connectivity possibilities.

We present an interactive visual tool, based on proven statistical methods, which helps to explore this data space.

## Problem
Even when studies on relations between establishments are done, they are usually confined to places in close proximity or simple direct visitor flows between places.

We believe that this elementary information **alone** can only provide limited insight into how data of different areas and facilities of a city connects to each other, especially when they are geographically far apart.


### Better understanding
To local governments, city councils and businesses alike, understanding how points of interest (POIs) across the city are correlated with them and each other, can provide very valuable marketing, planning and investment advantages.

For example:
- Businesses would be able to target their marketing more accurately
- Cities can invest in places that are well-connected across a certain area
- Even curious citizens can discover a whole new dimension of how their city works


## Our approach
Thanks to our solution, these entities now have a tool for obtaining data on relations through an intuitive and easy-to-use user interface.

On top of relations (or, more mathematically speaking, correlations), we include visitor flow analysis into our product, aiming to give as broad and complete of an understanding of the interconnectivity of the city as possible.

## Our solution
In order to explore these connections:
- We used data gathered across 25 POIs in Helsinki about the nearby bluetooth devices (assumed to roughly resemble the number of people)
- We singled out four interesting times of a day:
     - Morning commute of residents (8am-9am)
     - Tourists exploring the city (2pm-3pm)
     - People going out in the evening (8pm-9pm)
     - Night time (12am-1am)
- We calculated how visitor counts in the POIs are correlated with each other, based on aggregated daily data for the time of interest over 60 consecutive days
- In order to achieve this, we downloaded almost 20GB of data
- We also created networks representing visitor flows based on device hashes that reappear in different parts of the city
- We built an interactive online visualization for the data based on Flask and React.JS

### Why correlations?
That's easy: Because they show how much visitor numbers in one place are related to visitor numbers in another place.

There is also a more mathematical interpretation, based on a statistical approach to visitor numbers as random variables. Using a linear regression approach, squared correlation explains how much of the variance in visitor numbers of one place is explained by those of another.

## Demo
https://dna-helsinki.netlify.com/

![img1](https://res.cloudinary.com/hackjunction/image/upload/c_fill,q_auto/v1/junctionapp/projects/junction-2019/qdtbkKaIV/eird2esz6b2jbwszwppa)

![img2](https://res.cloudinary.com/hackjunction/image/upload/c_fill,q_auto/v1/junctionapp/projects/junction-2019/qdtbkKaIV/cnactheceqbtazksgetc)

![img3](https://res.cloudinary.com/hackjunction/image/upload/c_fill,q_auto/v1/junctionapp/projects/junction-2019/qdtbkKaIV/fxt1vnbvd916znoeyahk)

![img4](https://res.cloudinary.com/hackjunction/image/upload/c_fill,q_auto/v1/junctionapp/projects/junction-2019/qdtbkKaIV/ce9nqtgc9trgpmeveaya)



------------------
Link to repository with the backend code:
https://github.com/BondarenkoStas/CrowdControl_Junction_backend
