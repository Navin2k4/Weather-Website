//API Key For weather Website 72d5acd9a409b970697976aea796cc6d
//https://api.openweathermap.org/data/2.5/forecast?q=Madurai&appid=72d5acd9a409b970697976aea796cc6d
function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Delhi";
  GetInfo();
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const data = new Date();
const m = months[data.getMonth()]
document.getElementById("Date").innerHTML = data.getUTCDate() + " - " + m + " - " + data.getFullYear();
document.getElementById("Time").innerHTML = data.getHours() + " : " + data.getMinutes() + " : " + data.getSeconds();



function GetInfo(){


  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "Weather Condition of - " + newName.value
  var min_T = [];
  var max_T = [];
  var humidity = [];

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=72d5acd9a409b970697976aea796cc6d')
 .then(response => response.json())
 .then(data => {

  for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1) + "min").innerHTML = "Min Temp : " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + " °"
    document.getElementById("day" + (i + 1) + "max").innerHTML = "Max Temp : " + Number(data.list[i].main.temp_max - 273.15).toFixed(1) + " °"
    document.getElementById("description" + (i + 1)).innerHTML = "It's look like : " + data.list[i].weather[0].description;
    document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    document.getElementById("humidity" + (i + 1)).innerHTML = "Humidity : " + Number(data.list[i].main.humidity).toFixed(1)
    document.getElementById("wind" + (i + 1)).innerHTML = "Wind : " + Number(data.list[i].wind.speed).toFixed(1) + " Knots"
    max_T.push(Number(data.list[i].main.temp_max - 273.15).toFixed(1))
    min_T.push(Number(data.list[i].main.temp_min - 273.15).toFixed(1))
    humidity.push(Number(data.list[i].main.humidity).toFixed(1))

  }

  var xValues = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'];
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: " Minimum Temperature",
        data: min_T,
        borderColor: "red",
        pointRadius: 5,
        pointBackgroundColor	:"red",
        pointHoverBackgroundColor	:"white",
        fill: false
      }, 
      {
        label: " Maximum Temperature",
        data: max_T,
        borderColor: "green",
        pointRadius: 5,
        pointBackgroundColor: "green",
        pointHoverBackgroundColor: "white",
        fill: false
      },
      {
        label: " Humidity",
        data: humidity,
        borderColor: "White",
        pointRadius	:5,
        pointBackgroundColor: "white",
        pointHoverBackgroundColor: "white",
        fill: false
      }]
    },
    options: {
      legend: { display: true },
      title: { display: true, text: "TEMPERATURE ALONG 5 DAYS IN "+ newName.value }
    }
  });

//To change background of the Website
   if (data.list[0].weather[0].description ==  'scattered clouds' ){
     document.body.style.backgroundImage = "url('darkclouds.jpg')";
   }
   else if (data.list[0].weather[0].description == 'broken clouds' ) {
     document.body.style.backgroundImage = "url('darkclouds.jpg')";
   }
   else if (data.list[0].weather[0].description == 'thunderstorm') {
     document.body.style.backgroundImage = "url('thunderstorm.jpg')";
   }
   else if (data.list[0].weather[0].description == 'rain') {
     document.body.style.backgroundImage = "url('rain.jpg')";
   }
   else if (data.list[0].weather[0].description == 'light rain') {
     document.body.style.backgroundImage = "url('rain.jpg')";
   }
   else if (data.list[0].weather[0].description =='shower rain') {
     document.body.style.backgroundImage = "url('sky.jpg')";
   }
   else if (data.list[0].weather[0].description == 'few clouds') {
     document.body.style.backgroundImage = "url('darkclouds.jpg')";
   }
   else if (data.list[0].weather[0].description == 'mist') {
     document.body.style.backgroundImage = "url('mist.jpg')";
   }
   else if (data.list[0].weather[0].description == 'light snow') {
     document.body.style.backgroundImage = "url('snow.jpg')";
   }
   else if (data.list[0].weather[0].description == 'snow') {
     document.body.style.backgroundImage = "url('snow.jpg')";
   }
   else{
     document.body.style.backgroundImage = "url('shower.jpg')";
   }
   console.log(min_T)
   console.log(max_T)
   console.log(data)
})

.catch(err => alert("Something went Wrong ! \nWait or Check your Internet Connection "))

}



const d= new Date();
const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function CheckDay(day){
  if(day + d.getDay() > 6 ){
    return day + d.getDay()-7;
  }
  else{
    return day + d.getDay();
  }
}

for(i=0;i<5;i++){
  document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)]
}
