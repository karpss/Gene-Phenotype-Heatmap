# Gene-Phenotype-Heatmap
An application built with React where users can Compare the knockout effect of a list of genes among different phenotyping systems

# How to run this project
- git clone the project, then ```yarn ``` after this ```yarn dev``` to start the project.
- Please note that this project uses Vite instead of Create React App because it is no longer mentioned, recomended or supported in the Recent documentation of React.

# Folder Structure
- There are four major folders that form the structure of this application, ``` api ``` houses the
- request to the endpoint, ```util ``` houses parseHeatmapData that helps in parsing the endpoint data to be 
- suitable for Nivo Heatmap library. ```pages ``` holds the  major page in the application Heatmap Page. Also there is the ```components ``` folder were Filters and Pagination are handled.




# Things to improve on

- I'd like to explore the possibility of using React-Query as a data fetching library for this application. 
- This is simply because it comes with caching and pre-fetching abilities I believe can make the application faster especially when the dataset is very large
- More unit tests and an End to End test.











