<template>
  <v-app id="board-list">
    <v-card-title>이번주 Top 20</v-card-title>
    <post-list :post-props="bestPosts" />
    <v-card-title>메인</v-card-title>
    <post-list :post-props="mainPosts" />
  </v-app>
</template>

<script>
import PostList from './PostList.vue'
export default {
  name: 'BoardList',
  components: {
    PostList
  },
  data () {
    return {
      bestPosts: [],
      mainPosts: [],
      imgPath: process.env.VUE_APP_FILE_URL + 'thumb_'
    }
  },
  mounted () {
    this.loadwekklyBestContent()
    this.loadContent()
  },
  methods: {
    loadwekklyBestContent () {
      this.$axios({
        methods: 'get',
        headers: {
          Accept: 'application/json'
        },
        url: `/list/best?date=${this.moment(new Date()).format('YYYY-MM-DD')}`
      })
        .then(response => {
          this.bestPosts = response.data
        })
        .catch(e => console.log(e))
    },
    loadContent () {
      this.$axios({
        methods: 'get',
        headers: {
          Accept: 'application/json'
        },
        url: '/list/contents?firstpage=0&lastpage=10'
      })
        .then(response => {
          this.mainPosts = response.data
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>
