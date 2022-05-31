/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',GB&appid=02d0be9d9cb5f0d6719c4a68eb19c53d&units=imperial';
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const feelings = document.getElementById('feelings');
const generate = document.querySelector("#generate");
let d = new Date();
let newDate = d.toDateString();

/*Function that runs when Generate Button is clicked */
generate.addEventListener("click", (e)=>{
  e.preventDefault();
  let postCode = document.getElementById('zip').value.toUpperCase(); //To uppercase for letters so that API can find UK postcode
  let url = baseURL + postCode + apiKey;
  getWeather(url)
  .then((data) => {
      getProjectData(data)
  .then((data) => {
    getServerData("/all")
  .then(data=>{
      updateUI(data);
  });
  });
  });
});

/*Link to OpenWeatherApp API */
let getWeather = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  }
  catch (error) {
    console.log("error", error);
  }
};

/*Define data entry object items*/
let getProjectData = async (data) => {
  try {
    const entry = {
      date: newDate,
      temp: data.main.temp,
      content: feelings.value
    };
    postData("/add", entry);
  } catch (error) {
    console.log("error", error);
  }
};

/* Async POST */
let postData = async (url = "", data = {}) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)// body data type must match "Content-Type" header        
    });
    return response;
  } catch (error) {
    console.log("error", error)
  }
};

/*Retrieve data sent to the server */
const getServerData = async (url) => {
  let response = await fetch(url);
  try{
      let result = await response.json();
      return result
  }catch (error) {
      console.error("error", error);
  }
};

/*Update UI*/
const updateUI = async (data) => {
  try {
    date.innerHTML = "Date: " + "<br>" + data.date;
    temp.innerHTML = "Temperature:" + "<br>" + data.temp + "°F";
    content.innerHTML = "Feelings:" + "<br>" + data.content;
  } catch (error) {
    console.log("error", error);
  }
}

