<template>
  <v-app id="searchList">
    <v-container
      grid-list-md
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(item, idx) in posts"
          :key="idx"
          xs12
          sm6
          md4
          lg2
          x3
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
                  max-width="500px"
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
      <input
        class="moreContentbutton"
        type="button"
        value="더보기"
        @click="moreContent"
      >
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'SearchList',
  data () {
    return {
      posts: [],
      keyword: '',
      startOffset: 0,
      lastOffset: 10,
      imgPath: process.env.VUE_APP_FILE_URL + 'thumb_'
    }
  },
  mounted () {
    this.checkOption()
  },
  methods: {
    checkOption () {
      const searchKeyword = `${this.$route.params.keyword}`
      this.keyword = searchKeyword
      if (searchKeyword.indexOf('@', 0) === 0) {
        this.$router.push({ name: 'UserInfo', params: { nickname: this.keyword.split('@')[1] } })
      } else {
        this.search()
      }
    },
    search () {
      this.$axios({
        methods: 'get',
        url: `/list/search?keyword=${this.keyword}&startpage=${this.startOffset}&endpage=${this.lastOffset}`
      })
        .then(response => {
          this.posts.push(...response.data)
        })
        .catch(e => console.log(e))
    },
    moreContent () {
      this.startOffset += 11
      this.lastOffset += 10
      this.search()
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
