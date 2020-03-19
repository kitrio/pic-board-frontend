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
        @click="logOut"
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
      <v-row>
        <v-col
          col="12"
          md="2"
          sm="1"
        />
        <v-col
          col="12"
          md="8"
          sm="10"
        >
          <router-view />
        </v-col>
        <v-col
          col="12"
          md="2"
          sm="1"
        />
      </v-row>
    </v-content>
    <v-footer
      fixed
      class="font-weight-medium"
    >
      <v-col
        cols="12"
      >
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),
  computed: {
    memberInfo: {
      get () {
        return this.$store.state.member.myInfo
      },
      set () {

      }
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('member/logOut', null)
    }
  }

}
</script>
<style>
  a {
    text-decoration: none;
  }
</style>
