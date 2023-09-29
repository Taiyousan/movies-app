<script setup>
// Imports
import { onMounted, ref } from "vue";
import axios from "axios";

let data = ref("");

onMounted(async () => {
  const response = await axios.get("src/curl/countries.json");
  data.value = response.data;
});
</script>

<template>
  <header class="header-home">
    <h1>ACCUEIL</h1>
  </header>
</template>

<style scoped lang="scss">
.header-home {
  background-color: #252525;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fff;
  }
}
</style>
