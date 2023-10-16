<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

let data = ref("");
let page = ref(1);
let nextPageUrl = ref("");

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  const response = await axios.get(
    `http://localhost/s5/symfony-s5/public/index.php/api/movies?page=${page.value}`,
    {
      headers: {
        Accept: "application/ld+json",
      },
    }
  );
  data.value = response.data["hydra:member"];
  nextPageUrl.value =
    "http://localhost" + response.data["hydra:view"]["hydra:next"];
}

async function nextPage() {
  const response = await axios.get(nextPageUrl.value, {
    headers: {
      Accept: "application/ld+json",
    },
  });
  data.value = response.data["hydra:member"];
  nextPageUrl.value =
    "http://localhost" + response.data["hydra:view"]["hydra:next"];
  page.value = page.value + 1;
}

function changePage(pageNumber) {
  console.log(pageNumber);
  page.value = pageNumber;
  fetchData();
}
</script>

<template>
  <div class="titre"><h1>FILMS</h1></div>
  <div class="pagination">
    <!-- <div class="prev page" v-if="prevPageUrl" @click="prevPage">prev</div> -->

    <div
      class="page page1"
      @click="changePage(1)"
      :style="
        page === 1
          ? 'background-color: #ffffff;color: #252525;outline: 2px solid #252525;'
          : ''
      "
    >
      1
    </div>
    <div
      class="page page2"
      @click="changePage(2)"
      :style="
        page === 2
          ? 'background-color: #ffffff;color: #252525;outline: 2px solid #252525;'
          : ''
      "
    >
      2
    </div>
    <div
      class="page page3"
      @click="changePage(3)"
      :style="
        page === 3
          ? 'background-color: #ffffff;color: #252525;outline: 2px solid #252525;'
          : ''
      "
    >
      3
    </div>
    <div class="next page" v-if="nextPageUrl" @click="nextPage">NEXT</div>
  </div>
  <div class="gallery">
    <MovieCard v-for="movie in data" :key="movie.id" :movie="movie" />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;
}

.page {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #252525;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.page:active {
  background-color: #1b1b1b;
}

.page:hover {
  background-color: #ffffff;
  color: #252525;
  outline: 2px solid #252525;
}
</style>
