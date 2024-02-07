<template>
  <div class="flex flex-col font-Roboto bg-blue-700">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SIteNavigation.vue";
</script>

<style lang="scss" scoped>

</style>