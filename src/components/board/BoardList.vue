<template>
  <v-app id="board-list">
    <v-card-title>이번주 추천</v-card-title>
    <v-container
      fluid
      grid-list-md
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(item, index) in posts"
          :key="index"
          xs12
          sm6
          md4
          lg2
          x2
        >
          <v-hover
            v-slot:default="{ hover }"
            open-delay="180"
          >
            <v-card
              :elevation="hover ? 12 : 2"
            >
              <router-link :to="{ name: 'Contents', params: { num: item.boardNum}}">
                <v-img
                  :src="`${imgPath}`+`${item.fileAltName}`"
                  max-width="400px"
                  aspect-ratio="1.4"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                >
                  <v-card-text>{{ item.title }}</v-card-text>
                </v-img>
              </router-link>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'BoardList',
  data () {
    return {
      index: 5,
      posts: [],
      imgPath: process.env.VUE_APP_FILE_URL + 'thumb_'
    }
  },
  mounted () {
    this.listBoard()
  },
  methods: {
    listBoard: function () {
      this.$axios({
        methods: 'post',
        headers: {
          Accept: 'application/json'
        },
        url: `/list/best?date=${this.moment(new Date()).format('YYYY-MM-DD')}`
      })
        .then(response => {
          this.posts = response.data
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>
