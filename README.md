# Gene-Phenotype-Heatmap
An application built with React where users can Compare the knockout effect of a list of genes among different phenotyping systems

# How to run this project
- git clone the project, then ```yarn ``` after this ```yarn dev``` to start the project.
- Please note that this project uses Vite instead of Create React App because it is no longer mentioned, recomended or supported in the Recent documentation of React.

# Folder Structure
- There are four major folders that form the structure of this application, ``` api ``` houses the
- request to the endpoint, ```util ``` houses parseHeatmapData that helps in parsing the endpoint data to be 
- suitable for Nivo Heatmap library. ```pages ``` holds the two major pages in the application the Landing and Heatmap Page. Also there is the ```components ``` folder were Filters and Pagination are handled.


# Conceptual & Technical Decision Process
- The techical goal from the start was to use recommended tools suggested in the requirements or at worst use most.
- The tools that where used in the implementation of this application React with Typescript, Bootstrap, react-select (it comes with an out of box solution for multiple selections), Nivo Heatmap which was chosen over Visx at the last minute because it was more opinionated than Visx so a lot of things like labelling were already handled out of the box.
- For how the application was strucutured, the end goal was to build something that will be simple to review,
- no elaborate or complex abstractions.

# Things to improve on

- I'd like to explore the possibility of using React-Query as a data fetching library for this application. 
- This is simply because it comes with caching and pre-fetching abilities I believe can make the application faster especially when the dataset is very large
- More unit tests and an End to End test.

- it took me roughly four days to complete. I was spending few hours per day working on it. 










