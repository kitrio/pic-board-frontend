<template>
  <v-app id="board-list">
    <v-card-title>이번주 Top 20</v-card-title>
    <post-list :post-props="bestPosts" />
    <v-card-title>새로운 사진</v-card-title>
    <post-list :post-props="mainPosts" />
    <input
        class="moreContentbutton"
        type="button"
        value="더보기"
        @click="moreContent"
      >
  </v-app>
</template>

<script>
import PostList from '@/components/board/PostList.vue'
export default {
  name: 'BoardList',
  components: {
    PostList
  },
  data () {
    return {
      bestPosts: [],
      mainPosts: [],
      startOffset: 0,
      lastOffset: 10,
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
        .catch(e => { console.log(e) })
    },
    loadContent () {
      this.$axios({
        methods: 'get',
        headers: {
          Accept: 'application/json'
        },
        url: `/list/contents?firstpage=${this.startOffset}&lastpage=${this.lastOffset}`
      })
        .then(response => {
          this.mainPosts.push(...response.data)
        })
        .catch(e => console.log(e))
    },
    moreContent () {
      this.startOffset += 11
      this.lastOffset += 10
      this.loadContent()
    }
  }
}
</script>

<style>
  .moreContentbutton {
      display: flex;
      background-color: rgb(0, 127, 212);
      color:whitesmoke;
      height: 30px;
      width: 280px;
      margin: 30px auto;
      align-content: center;
      border-radius: 1em;
  }
</style>
