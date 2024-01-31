<script setup>
import MovieCard from "../components/MovieCard.vue";


defineProps({
  category: Object,
});
</script>

<template>
  <div class="category-card">
    <p>{{ category.name }}</p>
    <div class="movies">
      <!-- <MovieCard v-for="movie in category.movies" :key="movie.id" :movie="movie" /> -->
      <!-- <p v-for="movie in category.movies">{{ movie }}</p> -->
      <RouterLink v-for="movie in category.movies" :key="movie.id"
        :to="{ name: 'movieDetails', params: { id: movie.id } }" v-if="!detailsPage" class="link">
        {{ movie.title }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-card {}
</style>
