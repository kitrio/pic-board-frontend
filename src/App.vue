<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Board</span>
        <span class="font-weight-light">Pic</span>
      </v-toolbar-title>
      <v-spacer />
      <v-container v-if='memberInfo === null'>
        <router-link :to="{name: 'Login'}">
          <v-btn color="white">
            로그인
          </v-btn>
        </router-link>
      </v-container>
      <v-container v-else>
        <v-btn @click="logOut">
          로그아웃
        </v-btn>
      </v-container>
      <router-link :to="{name: 'SignUp'}">
        <v-btn color="blue">
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
