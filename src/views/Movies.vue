<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

let data = ref("");
let page = ref(1);
let nextPageUrl = ref("");
let pagesTotal = ref(0);
const token = localStorage.getItem("token");

onMounted(() => {
  fetchData();
});

async function fetchData(
  url = `http://127.0.0.1:8000/api/movies?page=${page.value}`
) {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = response.data["hydra:member"];
  nextPageUrl.value =
    "http://127.0.0.1:8000" + response.data["hydra:view"]["hydra:next"];
  pagesTotal.value = response.data["hydra:view"]["hydra:last"].split("=")[1];
}

function changePage(pageNumber) {
  page.value = pageNumber;
  fetchData();
}
</script>

<template>
  <div class="titre"><h1>FILMS</h1></div>
  <div class="pagination">
    <div class="prev page" @click="changePage(page - 1)" v-if="page !== 1">
      PREV
    </div>
    <div
      v-for="i in parseInt(pagesTotal)"
      :key="i"
      class="page"
      @click="changePage(i)"
      :class="{ 'active-page': i === page }"
    >
      {{ i }}
    </div>
    <div
      class="next page"
      v-if="nextPageUrl && page !== parseInt(pagesTotal)"
      @click="changePage(page + 1)"
    >
      NEXT
    </div>
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

  &:active {
    background-color: #1b1b1b;
  }

  &:hover,
  &.active-page {
    background-color: #ffffff;
    color: #252525;
    outline: 2px solid #252525;
  }
}
</style>
