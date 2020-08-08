<template>
  <v-app id="UserInfo">
    <v-card-title>{{ this.$route.params.nickname }}님의 사진</v-card-title>
    <v-card-subtitle>게시물 개수{{ Object.keys(posts).length }}</v-card-subtitle>
    <post-list :post-props="posts" />
  </v-app>
</template>

<script>
import PostList from '@/components/board/PostList.vue'
export default {
  name: 'UserInfo',
  components: {
    PostList
  },
  data () {
    return {
      posts: [],
      imgPath: process.env.VUE_APP_FILE_URL + 'thumb_'
    }
  },
  mounted () {
    this.listBoard()
  },
  methods: {
    listBoard () {
      this.$axios({
        method: 'get',
        headers: {
          Accept: 'application/json'
        },
        url: `/member/info/${this.$route.params.nickname}`
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
