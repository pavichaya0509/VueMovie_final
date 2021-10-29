<template lang="">
  <div class="bg">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Prompt"
    />
    <br /><br />

    <div>
      <p class="text">
        WELCOME
        <vue-typer
          :text="['MAJOR CINEPLEX']"
          :repeat="Infinity"
          :shuffle="false"
          initial-action="typing"
          :pre-type-delay="70"
          :type-delay="250"
          :pre-erase-delay="2000"
          :erase-delay="250"
          erase-style="clear"
          :erase-on-complete="false"
          caret-animation="phase"
        ></vue-typer
      ></p>
    </div>

    <div class="go">
      <form @submit="addMovie">
        <b-card
          bg-variant="danger"
          text-variant="white"
          id="listMovie"
          v-for="item in movieData"
          v-bind:key="item.id"
          v-bind:img-src="'https://image.tmdb.org/t/p/w500/' + item.poster_path"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 260px; margin:10px boder:none;"
          class="mb-2 border-0"
        >
          <b-button
            type="submit"
            variant="danger"
            v-bind:href="'/ticket/' + item.id"
            class="buttongo"
            >จองตั๋ว</b-button
          >
        </b-card>
      </form>
    </div>
  </div>
</template>
<script>
import Router from "vue-router";
const router = new Router({
  mode: "history",
});
export default {
  name: "movie",
  computed: {
    movieData() {
      return this.$store.getters.getMovie;
    },
  },
  mounted() {
    this.$store.dispatch("fetchSetMovie");
  },
  methods: {
    addMovie() {
      router.push("/ticket/:id");
      router.go();
    },
  },
};
</script>
<style>
#listMovie {
  display: inline-block;
}
h1 {
  color: white;
  font-size: 30px;
  font-family: "Prompt", sans-serif;
}
div {
  font-family: "Prompt", sans-serif;
}
.vue-typer {
  font-family: monospace;
}
.vue-typer .custom.char {
  color: #ffffff;
  font-size: 30px;
  font-family: "Prompt", sans-serif;
}
.vue-typer .custom.char.selected {
  background-color: #ffffff;
}
.vue-typer .custom.caret {
  color: #ffffff;
}
.text {
  color: white;
  font-size: 30px;
  font-family: "Prompt", sans-serif;
}

.go {
  margin-bottom: -1250px;
}

.card-image {
  display: block;
  min-height: 20rem;
  background: #fff center center no-repeat;
  background-size: cover;
  filter: blur(3px);
}

.card-image > img {
  display: block;
  width: 100%;
  opacity: 0;
}

.card-image.is-loaded {
  filter: none;
  transition: filter 1s;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 16px;
  font-family: sans-serif;
}

.card-list {
  display: block;
  margin: 1rem auto;
  padding: 0;
  font-size: 0;
  text-align: center;
  list-style: none;
}

.card {
  display: inline-block;
  width: 90%;
  max-width: 20rem;
  margin: 1rem;
  font-size: 1rem;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
  transition: transform 0.1s ease-in-out, box-shadow 0.1s;
}

.card:hover {
  transform: translateY(-0.5rem) scale(1.0125);
  box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
}

.card-description {
  display: block;
  padding: 1em 0.5em;
  color: #515151;
  text-decoration: none;
}

.card-description > h2 {
  margin: 0 0 0.5em;
}

.card-description > p {
  margin: 0;
}
.buttongo {
  width: 100%;
  height: 100%;
}

.card-body {
  background-color: rgba(255, 255, 255, 0);
}

.bg {
  background-color: black;
}

</style>
