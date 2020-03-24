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
          v-for="(item, index) in posts"
          :key="index"
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
      <button
        id="moreContentbutton"
        @click="moreContent"
      >
        더보기
      </button>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'SearchList',
  data () {
    return {
      index: 5,
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
          this.posts = response.data
        })
        .catch(e => console.log(e))
    },
    moreContent () {
      this.lastOffset += 10
      this.search()
    }
  }
}
</script>

<style>
  #moreContentbutton {
    background-color: gray;
    height: 5em;
    width: 80%;
    margin: 5em
  }
</style>
