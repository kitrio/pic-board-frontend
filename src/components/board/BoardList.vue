<template>
  <v-app id="board-list">
    <v-card-title>이번주 추천</v-card-title>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 x3
          v-for="(item, index) in posts"
            :key="index"
        >
            <v-card>
            <router-link :to="{ name: 'Contents', params: { num: item.boardNum}}">
              <v-img
                :src="`${imgPath}${item.fileAltName}`"
                max-width="400px"
                aspect-ratio="1.4"
              />
            </router-link>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "BoardList",
  data() {
    return {
      index: 5,
      posts: [],
      imgPath: process.env.VUE_APP_FILE_URL
    };
  },
  mounted() {
    this.listBoard();
  },
  methods: {
    listBoard: function() {
      this.$axios({
        methods: 'post',
          headers: {
            Accept: 'application/json'
          },
        url: `/list/best?date=2020-02-24`
        })
        .then(response => {
          this.posts = response.data;
          console.log(response);
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>

</style>
