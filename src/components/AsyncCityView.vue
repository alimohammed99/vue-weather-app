<template>
    <div>

    </div>
</template>

<script setup>

import axios from 'axios';

import { useRoute } from 'vue-router';
// This is to get access to the route ( url parameter ) coz I need some data from it.

const route = useRoute();
// Initializing the route.

const getWeatherData = async () => {

    try {
        // const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=f1dbcc4cff472ccd01050ed08b93b12f&units=imperial`);
        // The value for lat and lng were gotten from the route parameters

        const weatherData = await axios.get(`  https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=b53a82a45e2198296db8632bc9fc0b80&units=imperial`);


      


        // calculating current date & time
        // Because of the difference Eastern Timezone and the Pacific Timezone.
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;

        // calculating hourly weather offset
        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * weatherData.data.timezone_offset;
        });

        return weatherData.data;
    } catch (err) {
        console.log(err);
    }
};

// Invoking our function
const weatherData = await getWeatherData();
// So I can use this "weatherData" in the markup and have access to a lot of data.

console.log(weatherData);
</script>
