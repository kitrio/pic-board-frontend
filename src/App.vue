<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Board</span>
        <span class="font-weight-light">Pic</span>
      </v-toolbar-title>
      <v-app-bar-nav-icon />
      <v-spacer />
      <router-link
        v-if="memberInfo === null"
        :to="{name: 'Login'}"
      >
        <v-btn 
        text>
          로그인
        </v-btn>
      </router-link>
      <v-btn
        v-else
        @click="logOut"
        text
      >
        로그아웃
      </v-btn>
      <router-link :to="{name: 'SignUp'}">
        <v-btn 
        color="blue"
        text
        >
          회원가입
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      absolute
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
  name: "App",
  data: () => ({
     
  }),
  computed: {
    memberInfo() {
      return this.$store.state.member.myInfo
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch('member/logOut',null)
    }
  }

};
</script>
<style>
  a {
    text-decoration: none;
  }
</style>