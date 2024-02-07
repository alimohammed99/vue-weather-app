<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" type="text" placeholder="Search for a City/State"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-blue-900 focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
    </div>
  </main>
</template>


<script setup>
// I am using MapBox geo-coding API for making the fetch coz in this project, I wanna be fetcing data (weather) from different locations and the MapBox API is good for that.

import { ref } from "vue";
import axios from "axios";

const mapBoxAPIKey = "pk.eyJ1IjoiYWxpbW9oYW1tZWQ5OSIsImEiOiJjbHNib3o1M2gwZWV1MnFuc3gxcXlnZXJsIn0.2Uat_5S22Q4iMf28mJpKPQ";
// The above is the mapbox API key and it is being used in fetching the data in the axios function.

const searchQuery = ref("");
// This will hold the input data from the form.

const queryTimeOut = ref(null);
// This is needed to set some time out because I wanna make the API request few secs after User starts typing. I mean the request to the Mapbox geo-coding API.

const mapBoxSearchResults = ref(null);
// The above variable is where I'm gonna store the final results of my fetching.

// The below function is to target the "queryTimeOut" function to set some timeout for it.
// Now, after 300ms i.e 3secs, the request to the API should be made, and should be stored into the variable 'queryTimeOut'
const getSearchResults = () => {

  queryTimeOut.value = setTimeout(async () => {

    // Trying to check if the 'searchQuery' isn't empty before I make my API fetch coz of course I'm not gonna make any request if the input field is empty.
    if (searchQuery.value !== "") {

      const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}`);
      // The endpoint is gonna return a promise, that's why I used async-await.

      // Storing the main/final data we need in a variable.
      mapBoxSearchResults.value = result.data.features;

      return;
      // I needed to return....because even if our condition is true, it'll execute the task right, and also proceed to execute all other tasks that come after. And we don't want that.

    }

    // If the above condition is not true, our final variable should be null.
    mapBoxSearchResults.value = null;

  }, 300)

}

</script>