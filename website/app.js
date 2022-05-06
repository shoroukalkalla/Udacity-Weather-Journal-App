/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "ebd7aeeb28d772deacdc167c12740bd4";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const zipInput = document.getElementById("zip").value;
  const feelingsInput = document.getElementById("feelings").value;
  getWeatherInfo(baseURL, zipInput, apiKey).then((data) => {
    postData("/addWeatherInfo", {
      date: newDate,
      temp: data.main.temp,
      content: feelingsInput,
    });

    updateUI();
  });
}

/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, zip, apiKey) => {
  const res = await fetch(`${baseURL}${zip}&APPID=${apiKey}&units=metric`);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();

    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      '<i class="fa-solid fa-smog me-3"></i>' + Math.round(allData.temp) + "℃";
    document.getElementById("content").innerHTML =
      '<i class="fa-solid fa-person-breastfeeding me-3"></i>' + allData.content;
    document.getElementById("date").innerHTML =
      '<i class="fa-solid fa-calendar-days me-3"></i>' + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
