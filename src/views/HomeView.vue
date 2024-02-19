<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">

      <!-- The "@input" below means as soons as User starts typing. -->
      <input @input="getSearchResults" v-model="searchQuery" type="text" placeholder="Search for a City/State"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-blue-900 focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

        <ul v-if="mapBoxSearchResults !== null" class="absolute bg-blue-900 text-white w-full shadow-md py-2 px-1 top-[66px]">


          <!-- So incase there's an error with the fetching, the error will be displayed here -->
          <!-- Remember, the searchError is only TRUE in the catch-block. --> 
          <p v-if="searchError">
            Sorry, something went wrong. Please try again.
          </p>

          <!-- And this is another error handling. This is gonna output if the search function can't populate any result AND if there's no server error. If the error isn't server-related, then the error is from the search parameter most likely. -->
          <p v-if="!serverError && mapBoxSearchResults.length === 0">
            No results match your query! Try a different term.
          </p>


          <template v-else>
            <!-- I wanna run a function(previewCity) when User clicks on any place, I wanna redirect the route to an individual page to view the weather details for the clicked place. -->
            <!-- I passed our loop key/object in the bracket coz that's what User will be clicking -->
            <li v-for="item in mapBoxSearchResults" :key="item.id" class="py-2 cursor-pointer" @click="previewCity(item)">
            {{ item.place_name }}
            <!-- 'place_name' is an attribute gotten from the API. So the <li> will list places User types. -->
          </li>
          <!-- Since our search results come with an ID each, I can easily make the 'binding key' the IDs to maintain the uniqueness. -->
          </template>
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
import { useRouter } from "vue-router";

const mapBoxAPIKey = "pk.eyJ1IjoiYWxpbW9oYW1tZWQ5OSIsImEiOiJjbHNib3o1M2gwZWV1MnFuc3gxcXlnZXJsIn0.2Uat_5S22Q4iMf28mJpKPQ";
// The above is the mapbox API key and it is being used in fetching the data in the axios function.

const searchQuery = ref("");
// This will hold the input data from the form.

const queryTimeOut = ref(null);
// This is needed to set some time out because I wanna make the API request few secs after User starts typing. I mean the request to the Mapbox geo-coding API.

const mapBoxSearchResults = ref(null);
// The above variable is where I'm gonna store the final results of my fetching.

const searchError = ref(null);
// The above is needed to handle errors.

// The below function is to target the "queryTimeOut" function to set some timeout for it.
// Now, after 300ms i.e 3secs, the request to the API should be made, and should be stored into the variable 'queryTimeOut'
const getSearchResults = () => {

    clearTimeout(queryTimeOut.value);
  // I need to clear the timeOut each time the function is ran.

  //  The reason you need to place the clearTimeout() function before the setTimeout() call is because you want to ensure that if the getSearchResults() function is called multiple times within the timeout period, the previous timeout is canceled before setting a new one. This prevents the function from being executed multiple times if the user continues to type within the specified timeout period.

  queryTimeOut.value = setTimeout(async () => {

    // Trying to check if the 'searchQuery' isn't empty before I make my API fetch coz of course I'm not gonna make any request if the input field is empty.
    if (searchQuery.value !== "") {

      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}&types=place`);
      // The endpoint is gonna return a promise, that's why I used async-await.

      // Storing the main/final data we need in a variable.
        mapBoxSearchResults.value = result.data.features;
       // console.log(mapBoxSearchResults.value);
      } catch {
        searchError.value = true;
        // Anything that takes us to the catch-block, it means there's an error so therefore I am acknowledging the fact that there's an error.
    }

      return;
      // I needed to return....because even if our condition is true, it'll execute the task right, and also proceed to execute all other tasks that come after. And we don't want that.

    }

    // If the above condition is not true, our final variable should be null.
    mapBoxSearchResults.value = null;

  }, 300)



}

const router = useRouter();
// I need to initialize the router before using it. I've imported it above.


// Remember "item" is our loop key/object from up there. It was passed as a parameter alongside the function up there.
const previewCity = (item) => {
  console.log(item.place_name)


  // I need to do this coz the data that come with the "item" has a lot of info and I am interested in extracting only the City and State.
  // The data that come with the result looks like this: {{{place_name: "Ohio, Illinois, United States"}}}
  // So I need the City and the State alone.
// So what I'm saying is....City and State should be extracted from the data and the char(',') between them should be eradicated and turned to a normal space character.

  const [city, state] = item.place_name.split(",");

  // I want to from here push Users to another route which is gonn be for   a particular city.
// The params here are the params I passed from the router.
  router.push({
    name: "CityView",

    params: { state: state.replaceAll(" ", ""), city: city },
    // I discovered there are some spaces in the parameters. So I'm replacing these spaces with empty string.

    query: {
      lat: item.geometry.coordinates[1],
      lng: item.geometry.coordinates[0],
      preview: true,
    },

    // These properties I'm fetching are comming from the MapBox API.

    // We actually pass query while doing routes if we wanna filter/customize the data that's displayed on the new route we are going maybe based on User input or something, or if we wanna send some data/parameters along with the URL.
  });
};

</script>