<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Board</span>
        <span class="font-weight-light">Pic</span>
      </v-toolbar-title>
      <v-spacer />
      <router-link :to="{name: 'Login'}">
        <v-btn color="white">로그인</v-btn>
      </router-link>
      <router-link :to="{name: 'SignUp'}">
        <v-btn color="blue">회원가입</v-btn>
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
      {{ new Date().getFullYear()}}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({})
};
</script>
