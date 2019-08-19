<template>
  <v-app id="signup">
    <v-row
      :style="{display:'flex', alignItems:'center'}"
    >
      <v-col
        cols="12"
        sm="4"
        xs="2"
      />
      <v-col
        cols="12"
        sm="4"
        xs="8"
      >
        <v-subheader>회원가입</v-subheader>
        <v-form>
          <v-text-field
            v-model="idField"
            autofocus
            label="id"
            required
          />
          <v-text-field
            v-model="passwordField"
            :rules="[rules.required, rules.min]"
            :append-icon="showpasswd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpasswd ? 'text' : 'password'"
            label="비밀번호"
            counter
            @click:append="showpasswd = !showpasswd"
          />
          <v-text-field
            v-model="nicknameField"
            label="닉네임"
            required
          />
          <v-btn
            color="success"
            class="mr-4"
            @click="onSubmitSignUp"
          >
            회원가입
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            모두 지우기
          </v-btn>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        xs="2"
      />
    </v-row>
  </v-app>
</template>

<script>
export default {
    data() {
      return {
       showpasswd: false,
       idField: '',
       passwordField: '',
       nicknameField:'',
       rules: {
         required: value => !! value || '비밀번호를 입력해주세요',
         min: v => v.length >= 8 || '최소 8자 이상 입력하세요'
       }
      }
    },
    methods: {
      onSubmitSignUp() {
        
        // const CSRF_TOKEN
        // if (document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1] == null){
        //   CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]
        // }
        //console.log("CCC" + CSRF_TOKEN)
        //this.axios.defaults.headers.common['X-CSRF-TOKEN'] = CSRF_TOKEN
        // let form = new FormData()
        // form.append('userid', this.userid)
        // form.append('passwd',this.password)
        // form.append('userNick',"testnick")
        // form.append('regdate','20190905')
        // form.append('X-CSRF-TOKEN',CSRF_TOKEN)
        this.axios({
          method: 'post',
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json',
          },
          url: '/member/signup',
          data: {"memberId":this.idField , "password":this.passwordField,"nickname":this.nicknameField},
          withCredentials: true
        })
        .then(res => {
            if(res.status == 200){
              alert('회원가입 되었습니다.')
              this.$router.push('/')
            }
          }).catch( error =>{
            console.log(error)
            if(error.response.status == 409){
              alert('아이디가 중복되었습니다.')
            }
          })
      },
      reset() {
        this.idField = ''
        this.passwordField = ''
      }
    },
}
</script>