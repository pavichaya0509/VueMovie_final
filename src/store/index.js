import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movie: [],
  },
  mutations: {
    setMovie(state, payload) {

      state.movie = payload;
    },
  },
  actions: {
    fetchSetMovie(state) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie",
          { params: {
            api_key: "46d234cc6703473b204fdcae0ed69364",
            language: "en-US",
            sort_by: "popularity.desc",
            page: "1",
            year: "2021",
          } }
        )
        .then((res) => {
          state.commit("setMovie", res.data.results);
          console.log(res);
        });

    },
  },
  modules: {},
  getters: {
    getMovie: (state) => state.movie,
  },
});
