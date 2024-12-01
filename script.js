let menu = document.querySelector("#menu")
let inputValue;
let inputDiv;
let inputLat;
let inputLong;
let cityHeading = document.querySelector("#cityHeading")
let submit = document.querySelector("#getbtn");
let advSearch = document.querySelector("#btn2");
let hidden1 = document.querySelector("#s2");
let hidden2 = document.querySelector("#center");
let submit2 = document.querySelector("#submit2");
let latinput;
let longinput;
let temp = document.querySelector("#temp")
let feelslike = document.querySelector("#feelslike")
let humi = document.querySelector("#humi")
let ozo = document.querySelector("#ozo")
let atmospressure = document.querySelector("#atmospressure")
let sum = document.querySelector("#sum")
let lt = document.querySelector("#lt")
let lg = document.querySelector("#lg")
let ws = document.querySelector("#ws")
let wa = document.querySelector("#wa")
let wc = document.querySelector("#wc")
let selectedTime = document.querySelector("#date");
selectedTime.classList.add("hidden");
let timeValue = selectedTime.value;


let displaymessage = document.querySelector("#displaymessage");
let exit = document.querySelector("#exit")
let date = new Date().toISOString().split('T')[0];
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c7feac0d33msh83a1d7a8e2b9d7cp162fe7jsn58540d1a6381',
		'x-rapidapi-host': 'ai-weather-by-meteosource.p.rapidapi.com'
	}
};

async function getWeatherData() {
    try {
        const url = `https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?lat=${inputLat}&lon=${inputLong}&date=${date}&units=auto`;
        const response = await fetch(url, options);
        const result = await response.json();
        const temperature = result.data[0].temperature;
        const humidity = result.data[0].humidity;
        const feelsLike = result.data[0].feels_like;
        const ozone = result.data[0].ozone;
        const pressure = result.data[0].pressure;
        const windChill = result.data[0].wind_chill;
        const windSpeed = result.data[0].wind.speed;
        const windAngle = result.data[0].wind.angle;
        const summary = result.data[0].summary;
        
        return { 
            temperature, 
            humidity, 
            feelsLike,
            ozone,
            pressure,
            windChill,
            windSpeed,
            windAngle,
            summary
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
async function getWeatherData2() {
    try {
        const url = `https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?lat=${latinput}&lon=${longinput}&date=${date}&units=auto`;
        const response = await fetch(url, options);
        const result = await response.json();
        const temperature = result.data[0].temperature;
        const humidity = result.data[0].humidity;
        const feelsLike = result.data[0].feels_like;
        const ozone = result.data[0].ozone;
        const pressure = result.data[0].pressure;
        const windChill = result.data[0].wind_chill;
        const windSpeed = result.data[0].wind.speed;
        const windAngle = result.data[0].wind.angle;
        const summary = result.data[0].summary;
        
        return { 
            temperature, 
            humidity, 
            feelsLike,
            ozone,
            pressure,
            windChill,
            windSpeed,
            windAngle,
            summary
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
let timeselect = document.querySelector(".time-select")
let timevalue;
let currentLat;
let currentLong;
async function getWeatherData3 (){
	try {
		if (!currentLat || !currentLong) {
			throw new Error('Coordinates not set');
		}
		const url = `https://ai-weather-by-meteosource.p.rapidapi.com/time_machine?lat=${currentLat}&lon=${currentLong}&date=${date}&units=auto`;
		const response = await fetch(url, options);
		const result = await response.json();
		const temperature = result.data[timevalue].temperature;
		const humidity = result.data[timevalue].humidity;
		const feelsLike = result.data[timevalue].feels_like;
		const ozone = result.data[timevalue].ozone;
		const pressure = result.data[timevalue].pressure;
		const windChill = result.data[timevalue].wind_chill;
		const windSpeed = result.data[timevalue].wind.speed;
		const windAngle = result.data[timevalue].wind.angle;
		const summary = result.data[timevalue].summary;
		
		return { 
			temperature, 
			humidity, 
			feelsLike,
			ozone,
			pressure,
			windChill,
			windSpeed,
			windAngle,
			summary
		};
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
}
timeselect.addEventListener("change", () => {
	timevalue = parseInt(timeselect.value);
	getWeatherData3()
		.then(weatherData => {
			selectedTime.classList.remove("hidden")
			temp.innerHTML = weatherData.temperature;
			humi.innerHTML = weatherData.humidity;
			feelslike.innerHTML = weatherData.feelsLike;
			ozo.innerHTML = weatherData.ozone;
			atmospressure.innerHTML = weatherData.pressure;
			wc.innerHTML = `Wind Chill : ${weatherData.windChill}`;
			ws.innerHTML = `Wind Speed : ${weatherData.windSpeed}`;
			wa.innerHTML = `Wind Speed : ${weatherData.windAngle}`;
			sum.innerHTML = weatherData.summary;
			lt.innerHTML = `Latitude : ${inputLat}`;
			lg.innerHTML = `Longitude : ${inputLong}`;
		})
		.catch(error => console.error(error));
});


const matched = (matchedCity) => {
	cityHeading.textContent = inputValue.toUpperCase();
	inputLat = Number(matchedCity.latitude.toFixed(4));
	inputLong = Number(matchedCity.longitude.toFixed(4));
	currentLat = inputLat;
	currentLong = inputLong;
	getWeatherData()
		.then(weatherData => {
			selectedTime.classList.remove("hidden")
			temp.innerHTML = weatherData.temperature;
			humi.innerHTML = weatherData.humidity;
			feelslike.innerHTML = weatherData.feelsLike;
			ozo.innerHTML = weatherData.ozone;
			atmospressure.innerHTML = weatherData.pressure;
			wc.innerHTML = `Wind Chill : ${weatherData.windChill}`;
			ws.innerHTML = `Wind Speed : ${weatherData.windSpeed}`;
			wa.innerHTML = `Wind Speed : ${weatherData.windAngle}`;
			sum.innerHTML = weatherData.summary;
			lt.innerHTML = `Latitude : ${inputLat}`;
			lg.innerHTML = `Longitude : ${inputLong}`;
		})
		.catch(error => console.error(error));
}
const empty = () => {
	cityHeading.textContent = "No city entered!";
}
const notMatched = () => {

}
const matchCity = () => {
	const matchedCity = cities.find(city =>
		inputValue.toUpperCase() === city.name.toUpperCase()
	);

	if (matchedCity) {
		matched(matchedCity);
	} else {
		notMatched();
	}
}
const footer = document.querySelector("footer")
menu.addEventListener("click", () => {
	footer.classList.toggle("active")
});

submit.addEventListener("click", () => {
	inputDiv = document.querySelector("#city")
	inputValue = document.querySelector("#city").value
	if (inputValue != "") {
		matchCity();
		inputDiv.value = "";
	}
	else {
		empty();
	}
});
advSearch.addEventListener("click", () => {
	hidden1.classList.remove("hidden")
	hidden2.classList.remove("hidden")
	selectedTime.classList.add("hidden")
})
submit2.addEventListener("click", () => {
	latinput = Number(document.querySelector("#lat").value).toFixed(4);
	longinput = Number(document.querySelector("#long").value).toFixed(4);
	const lat = Number(latinput);
	const long = Number(longinput);
	if (document.querySelector("#lat").value === "" || document.querySelector("#long").value === "") {
		displaymessage.textContent = "Please enter both latitude and longitude values";
		return;
	}
	if (latinput !== "" && longinput !== "" && 
		!isNaN(lat) && !isNaN(long) && 
		lat >= -90 && lat <= 90 && 
		long >= -180 && long <= 180) {
		currentLat = latinput;
		currentLong = longinput;
		hidden1.classList.add("hidden");
		hidden2.classList.add("hidden");
		displaymessage.textContent = "";
		getWeatherData2()
		.then(weatherData => {
			selectedTime.classList.remove("hidden")
			temp.innerHTML = weatherData.temperature;
			humi.innerHTML = weatherData.humidity;
			feelslike.innerHTML = weatherData.feelsLike;
			ozo.innerHTML = weatherData.ozone;
			atmospressure.innerHTML = weatherData.pressure;
			wc.innerHTML = `Wind Chill : ${weatherData.windChill}`;
			ws.innerHTML = `Wind Speed : ${weatherData.windSpeed}`;
			wa.innerHTML = `Wind Speed : ${weatherData.windAngle}`;
			sum.innerHTML = weatherData.summary;
			lt.innerHTML = `Latitude : ${latinput}`;
			lg.innerHTML = `Longitude : ${longinput}`;
			cityHeading.innerHTML = `Lat:${latinput} , Long${longinput}`;
		})
		.catch(error => console.error(error));
	} else {
		displaymessage.textContent = "Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)";
	}
});
exit.addEventListener("click",()=>{
	hidden1.classList.add("hidden");
	hidden2.classList.add("hidden");
	selectedTime.classList.remove("hidden")
})