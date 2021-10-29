<template>
  <div class="box2">
    <h3 class="title">{{ movieId }}</h3>
    <b-button
      size="sm"
      v-for="m in movies"
      :key="m"
      :class="className(m.id)"
      @click="chooseMovie(m.id)"
      variant="primary"
      id="button_round"
      >{{ m.id }}</b-button
    >
  </div>
</template>
<script>
import { movies } from "../other/movie.json";

console.log(movies);
export default {
  name: "round",
  props: [" movieId "],
  data() {
    return {
      movies,
    };
  },
  methods: {
    chooseMovie(movieId) {
      this.$emit("chooseMovie", movieId);
    },
    className(movieId) {
      return ["column", "pointer", { chosen: this.movieId === movieId }];
    },
  },
  mounted() {
    this.chooseMovie(movies[0].id);
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
}
.chosen {
  border-style: solid;
}
#time {
  border-style: solid;
  color: black;
  border-width: 7px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.box2 {
  position: block;
}

#button_round {
  margin-right: 20px;
  margin-bottom: 40px;
}
</style>
