/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '02d0be9d9cb5f0d6719c4a68eb19c53d';
const country = ',GB&appid=';
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const feelings = document.getElementById('feelings');
const generate = document.querySelector("#generate");
let d = new Date();
let newDate = d.toDateString();

/*Link to OpenWeatherApp API */
const getWeather = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
  catch (error) {
    console.log("error", error);
  }
};

/*Define data entry object items*/
const projectData = async (data) => {
  try {
    const entry = {
      date: newDate,
      temp: data.main.temp,
      content: feelings.value,
    };
    return entry;

  } catch (error) {
    console.log("error", error);
  }
};

/* Async POST */
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error)
  }
}

/*Retrieve data sent to the server*/
const retrieveData = async (url) => {
  const response = await fetch(url);
  try{
      const result = await response.json();
      return result;
  }catch (error) {
      console.error("error", error);
  }
};

/*Update UI */
const updateUI = async (url) => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    date.innerHTML = allData.newDate;
    temp.innerHTML = allData.temp;
    content.innerHTML = allData.content;
  } catch (error) {
    console.log("error", error)
  }
}

/*Function that runs when Generate Button is clicked */
generate.addEventListener("click", (e)=>{
  e.preventDefault();
  let postCode = document.getElementById('zip').value;
  const url = baseURL + postCode + country + apiKey;
  getWeather(url)
  .then(function (data) {
      projectData(data);
    })
  .then(function (entry) {
      postData("/add", entry);
    })
  .then(function (data) {
    retrieveData("/all");
    })
  .then(function (data) {
    updateUI(url);
  });
});