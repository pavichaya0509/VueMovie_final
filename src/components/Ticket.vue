<template>
  <div class="title2">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Prompt"
    />
    <br /><br /><br />
    <h4 class="title3">{{ movie.title }}</h4>
    <br />
    <img
      v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
      width="25%"
    /><br /><br />
    <h5 id="price">รอบหนังที่คุณเลือก : {{ movieId }}</h5>
    <movies @chooseMovie="handleChooseMovie" :movieId="movieId" />

    <ul class="showcase">
      <li>
        <div class="seat"></div>
        <small>ว่าง</small>
      </li>
      <li>
        <div class="seat occupied"></div>
        <small>ไม่ว่าง</small>
      </li>

      <li>
        <div class="seat selected"></div>
        <small>ที่นั่งของเรา</small>
      </li>
    </ul>

    <seat
      :movieId="movieId"
      @chooseSeat="handleChooseSeat"
      :selectSeats="selectSeats"
      :firebaseSeats="firebaseSeats"
    /><br /><br />

    <h5 id="price">
      จำนวนที่นั่ง : {{ status.count }}, ราคา : {{ status.price }}
    </h5>
    <br />
    <button class="buy" type="button" @click="alert">ซื้อตั๋ว</button>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/compat/database";
import _ from "lodash";
import { pushToArray } from "../other/lib";
import axios from "axios";

import movies from "../components/round.vue";
import Seat from "../components/Seat.vue";

const config = {
  apiKey: "AIzaSyBVfXw4INAhtwmYBJR5uWeqwrIJt9Rr0lI",
  authDomain: "vuemovie-f6662.firebaseapp.com",
  databaseURL: "https://vuemovie-f6662-default-rtdb.firebaseio.com",
  projectId: "vuemovie-f6662",
  storageBucket: "vuemovie-f6662.appspot.com",
  messagingSenderId: "877877671751",
  appId: "1:877877671751:web:4886a23b83ae78e38e7e62",
};

firebase.initializeApp(config);

const db = firebase.database();

export default {
  name: "Ticket",
  components: { movies, Seat },
  data() {
    return {
      movie: null,
      movieTH: null,
      movieId: "",
      selectSeats: [],
      firebaseSeats: [],
      status: { count: 0, price: 0 },
    };
  },
  computed: {},
  methods: {
    handleChooseMovie(movieId) {
      if (this.status.count) {
        if (confirm("Data will be lost???")) {
          this.status = { count: 0, price: 0 };
          this.selectSeats = [];
        } else {
          return false;
        }
      }
      this.movieId = movieId;

      const movieRef = db.ref(`${this.movie.id}`).child(this.movieId);
      movieRef.on("value", (snapshot) => {
        console.log(snapshot.val());
        const seats = snapshot.val();
        this.firebaseSeats = [];

        _.forOwn(seats, (s) => {
          pushToArray(s, this.firebaseSeats);
        });
      });
    },
    handleChooseSeat(seat) {
      pushToArray(seat, this.selectSeats);

      const movieRef = db.ref(`${this.movie.id}`).child(this.movieId);
      movieRef.push(seat);

      this.status = this.selectSeats.reduce(
        (summary, s) => {
          summary.count++;
          summary.price += s.price;
          return summary;
        },
        { count: 0, price: 0 }
      );

      console.log(this.selectSeat.length);
    },
    alert() {
      if (this.status.count > 0) {
        this.$swal(
          "คำสั่งซื้อสำเร็จ!",
          "จำนวนตั๋ว " +
            this.status.count +
            " รวมเป็นเงิน " +
            this.status.price,
          "success"
        ).then(function() {
          location.reload();
        });
      } else {
        this.$swal("กรุณาเลือกที่นั่ง", "", "warning");
      }
    },
  },
  mounted() {
    axios
      .get("https://api.themoviedb.org/3/movie/" + this.$route.params.id, {
        params: {
          api_key: "46d234cc6703473b204fdcae0ed69364",
          language: "en-US",
          sort_by: "popularity.desc",
          page: "1",
          year: "2021",
        },
      })
      .then((res) => {
        this.movie = res.data;
      });
  },
};
</script>
<style>
#price {
  font-size: 18px;
  color: white;
  font-family: "Prompt", sans-serif;
}
.buy {
  transition-duration: 0.4s;
  background-color: rgb(129, 162, 255);
  border: none;
  border-radius: 5px;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  height: 5%;
  width: 8%;
  display: inline-block;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 40px;
}
.buy:hover {
  background-color: lightgray;
  color: black;
}
.title2 {
  margin-top: 60px;
  font-family: "Prompt", sans-serif;
  background-color: black;
}

.title3 {
  color: white;
  font-family: "Prompt", sans-serif;
}

.seat {
  background-color: #ffffff;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.seat.selected {
  background-color: #2acf75;
}

.seat.occupied {
  background-color:#223388;
}

.showcase {
  list-style: none;
  background: rgba(41, 41, 41, 0.685);
  padding: 5px 10px;
  display: inline-flex;
  color: #777;
  border-radius: 5px;
}
.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
.showcase li small {
  margin-left: 2px;
}
.showcase.seat:not(.occupied):hover {
  cursor: default;
  transform: scale(1);
}
.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.swal2-html-container {
  background-color: white;
  font-size: 16px;
  font-family: "Prompt", sans-serif;
}
div.swal2-actions {
  background-color: white;
}

div.swal2-icon .swal2-success .swal2-icon-show {
  background-color: none;
}
</style>
