<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'BoardList'}">
          <span>Board</span>
          <span class="font-weight-light">Pic</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <input
        id="searchBox"
        v-model="keywords"
        placeholder="제목검색, @닉네임"
        @keydown.enter="search"
      >
      <v-btn
        @click="search"
      >
        검색
      </v-btn>

      <v-spacer />
      <router-link
        v-if="memberInfo !=null"
        :to="{name: 'Editor'}"
      >
        <v-btn
          mdi-pencli
        >
          글쓰기
        </v-btn>
      </router-link>
      <router-link
        v-if="memberInfo === null"
        :to="{name: 'Login'}"
      >
        <v-btn
          text
        >
          로그인
        </v-btn>
      </router-link>
      <v-btn
        v-else
        text
        @click="logout"
      >
        로그아웃
      </v-btn>
      <router-link
        v-if="memberInfo === null"
        :to="{name: 'SignUp'}"
      >
        <v-btn
          color="blue"
          text
        >
          회원가입
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            lg="8"
            md="10"
            sm="10"
            xs="12"
          >
            <router-view
              :key="$route.fullPath"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <p>
      <br>
    </p>
    <v-footer
      fixed
      class="font-weight-medium"
    >
      <div id="footerbox">
        ©{{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => {
    return {
      keywords: ''
    }
  },
  computed: {
    ...mapGetters({
      memberInfo: (['member/getMemberId'])
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('member/logout', null)
      this.$router.push({ name: 'BoardList'})
    },
    search () {
      this.$router.push({ name: 'SearchList', params: { keyword: this.keywords } })
    }
  }

}
</script>
<style>
  a {
    text-decoration: none;
  }
  v-content {
    width: 100%;
  }
  v-footer {
    font: font-weight-medium
  }
  #footerbox {
    margin: 0 auto;
  }
  #searchBox {
    background-color: #eeeeee;
    border: #aaaaaa 1px solid;
    border-radius: 15px;
    margin: 10px;
    min-width: 30%;
    padding:5px;
  }
</style>
