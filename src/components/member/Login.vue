<template>
  <v-app id="Login">
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
        <v-form
          ref="form"
          method="post"
        >
          <v-text-field
            v-model="userid"
            label="ID"
            :rules="[rules.requiredID,rules.max]"
            counter
          />
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            :append-icon="showpasswd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpasswd ? 'text' : 'password'"
            label="비밀번호"
            counter
            @click:append="showpasswd = !showpasswd"
          />
          <v-btn
            @click="login"
          >
            로그인
          </v-btn>
        </v-form>
      </v-col>
      <v-col
        col="12"
        md="2"
        sm="1"
      />
    </v-row>
  </v-app>
</template>

<script>
export default {
    data(){
        return{
            userid: "",
            password: "",
            showpasswd: false,
            rules: {
              requiredID: value => !! value || '아이디를 입력 해주세요',  
              required: value => !! value || '비밀번호를 입력 해주세요',
              min: v => v.length >= 8 || '최소 8자 이상 입력 하세요',
              max: v => v.length <= 15 || '15자리 이하로 입력 해주세요'
            },
        }
    },
    methods: {
      login(){
        if(this.$refs.form.validate()){
          let form = new FormData()
          form.append('memberid', this.userid)
          form.append('password',this.password)
          this.axios({
              method: 'post',
              url : '/authlogin',
              data: form,
          })
          .then(response =>{
            if(response.status === 200){
              this.$store.dispatch('member/logIn', {
                memberid: this.userid
              })
              this.$router.push('/')
            }
          })
          .catch(error =>{
            if(error.response.status === 401){
              alert("아이디 또는 비밀번호가 맞지 않습니다.")
            }
          })
        }
      }
    },
}
</script>

<style>

</style>