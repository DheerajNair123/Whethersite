const apiKey = 'c5af993ac411be7d36fcc9d90c5f1437';

// Function to fetch weather data by city name
const getWeatherData = async (city) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Function to display weather data on the web page
const displayWeatherData = async () => {
  const cityInput = document.getElementById('cityInput');
  const weatherDataElement = document.getElementById('weatherData');

  const city = cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const weatherData = await getWeatherData(city);

  if (weatherData) {
    const { main, weather, name } = weatherData;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherDataElement.innerHTML = `Current temperature in ${name}: ${temperature}°C with ${description}`;
  } else {
    weatherDataElement.innerHTML = 'Weather data not available';
  }
};

// Event listener for the button to fetch weather data
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', displayWeatherData);

function updatetime(){
  const now=new Date();

  let hours=now.getHours();
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const seconds= String(now.getSeconds()).padStart(2,'0');

  let ampm= hours>=12 ? 'PM' : 'AM';
  hours=hours%12;
  hours= hours ? hours: 12;
  

  const timeString=`${hours} : ${minutes} : ${seconds} ${ampm}`;


  const clockElement= document.getElementById('clock');
  if(clockElement){
    clockElement.textContent = timeString;
  }
  
}
updatetime();
setInterval(updatetime,1000)