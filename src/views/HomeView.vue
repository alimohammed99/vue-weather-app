<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input @input="getSearchResults" v-model="searchQuery" type="text" placeholder="Search for a City/State"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-blue-900 focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

        <ul v-if="mapBoxSearchResults !== null" class="absolute bg-blue-900 text-white w-full shadow-md py-2 px-1 top-[66px]">
          <li v-for="item in mapBoxSearchResults" :key="item.id" class="py-2 cursor-pointer">
            {{ item.place_name }}
          </li>
          <!-- Since our search results come with an ID each, I can easily make the 'binding key' the IDs to maintain the uniqueness. -->
        </ul>
    </div>
  </main>
</template>
<!-- This searching of location is done using the lazy search approach. -->

<!-- So "@input" means the moment User starts typing. -->


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

    clearTimeout(queryTimeOut.value);
  // I need to clear the timeOut each time the function is ran.

  //  The reason you need to place the clearTimeout() function before the setTimeout() call is because you want to ensure that if the getSearchResults() function is called multiple times within the timeout period, the previous timeout is canceled before setting a new one. This prevents the function from being executed multiple times if the user continues to type within the specified timeout period.

  queryTimeOut.value = setTimeout(async () => {

    // Trying to check if the 'searchQuery' isn't empty before I make my API fetch coz of course I'm not gonna make any request if the input field is empty.
    if (searchQuery.value !== "") {

      const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}&types=place`);
      // The endpoint is gonna return a promise, that's why I used async-await.

      // Storing the main/final data we need in a variable.
      mapBoxSearchResults.value = result.data.features;

      console.log(mapBoxSearchResults.value);

      return;
      // I needed to return....because even if our condition is true, it'll execute the task right, and also proceed to execute all other tasks that come after. And we don't want that.

    }

    // If the above condition is not true, our final variable should be null.
    mapBoxSearchResults.value = null;

  }, 300)



}

</script>