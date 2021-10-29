<template>
  <div class="space">
    <button
      v-for="s in seats"
      :class="className(s)"
      :key="s"
      id="seat"
      :disabled="s.seated"
      @click="chooseSeat(s)"
    >
      {{ s.id }} {{ s.price }}
    </button>
    <!-- > {{s.id}} {{s.price}}  </button>  -->
  </div>
  <!-- <span> {{selectSeats}} </span> -->
</template>
<script>
import movie from "../other/movie.json";
export default {
  props: ["movieId", "selectSeats", "firebaseSeats"],
  methods: {
    className(seat) {
      const ids = this.selectSeats.map((s) => s.id);
      const idx = ids.indexOf(seat.id);

      const firebaseIds = this.firebaseSeats.map((s) => s.id);
      const firebaseIdx = firebaseIds.indexOf(seat.id);

      return [
        "button",
        {
          dark: seat.seated,
          "is-success": idx != -1,
          "is-link btn disabled": firebaseIdx != -1 && idx === -1,
        },
      ];
    },
    chooseSeat(seat) {
      this.$emit("chooseSeat", seat);
    },
  },
  computed: {
    seats() {
      return movie[this.movieId];
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #242323;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
#movie-container {
  margin: 20px 0;
}
#movie-container select {
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px 15px 5px 15px;
  appearance: none;
}
#seat {
  /* text-indent: -9999px;  */
  border-style: ridge;
  height: 50px;
  width: 75px;
  margin: 3px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

#row {
  display: flex;
}
/* #seat#selected{
    background-color:greenyellow;
}
#seat#occupied{
    background-color:red;
} */
/* #seat:nth-of-type(2){
    margin-right: 18px;
}
#seat:nth-last-of-type(2){
    margin-left: 18px;
} */
.box {
  background-color: rgb(0, 0, 0);
}
.space {
  padding-left: 300px;
  padding-right: 300px;
}

.is-link:active {
  pointer-events: none !important;
}
.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  cursor: not-allowed !important;
}
</style>
