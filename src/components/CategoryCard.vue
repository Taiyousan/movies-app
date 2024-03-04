<script setup>


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
        :to="{ name: 'movieDetails', params: { id: movie.id } }"  class="link">
        {{ movie.title }}
      </RouterLink>
    </div>
  </div>
</template>

// MovieCard.vue

<style scoped lang="scss">
/* CategoryCard.vue */

.category-card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;

  p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .link {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }
}

</style>

