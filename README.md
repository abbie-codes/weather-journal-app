# Weather Journal App

A weather journal app created for Udacity Front End Development Nanodegree.

My website is deployed [here](https://weather-journal-app-4vfhs.ondigitalocean.app/). I used [Digital Ocean](https://www.digitalocean.com/) to deploy the site as they host Node.js servers.

For this project I created a node.js server to store data from a combination of sources:

1. User input on a web page
2. The date generated in app.js
3. The current temperature (in Farenheit) which was generated using an [API from OpenWeatherMap](https://openweathermap.org/), for this I needed to pass in a postcode entered by the user. 

This web project showcases asyncronous fetch, get and post functions, and the use of an external API.

# Installation 

For this project I used the following dependencies: 

```bash
npm i express
npm i body-parser
npm i cors
```
