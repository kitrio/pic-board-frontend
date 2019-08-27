<template>
  <v-app id="contents">
    <v-row>
      <v-col
        col="12"
        md="2"
        sm="2"
      />
      <v-col
        col="12"
        md="8"
        sm="8"
      >
        <v-container>
          <v-card>
            <v-card-title v-text="postOne.title" />
            <v-card-text>{{postOne.nickname}} | {{postOne.writeTime}}</v-card-text>
            <v-img
              :src="`${imgPath}${postOne.fileAltName}`"
              class="white--text align-end"
              max-width="800px"
            />
            <P class="text-content">
              {{ postOne.textContent }}
              <v-card-actions>
                <v-spacer />
                <v-label>
                  <v-icon>mdi-eye</v-icon>
                  {{postOne.readCount}}
                </v-label>

                <v-btn
                  @click="goodCounter"
                >
                  <v-icon>mdi-heart</v-icon>
                  <v-label>{{postOne.goodCount}}</v-label>                 
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="memberInfo">
                <v-btn
                  @click="modify"
                >
                  <v-label>수정</v-label>                 
                </v-btn>
                <v-btn
                  @click="deleteContent"
                >
                  <v-lable>삭제</v-lable>
                </v-btn>
              </v-card-actions>
            </P>
          </v-card>
        </v-container>
      </v-col>
      <v-col
        col="12"
        md="2"
        sm="2"
      />
    </v-row>
  </v-app>
</template>
<script>
export default {
    name: 'Contents',
    data() {
      return {
          imgPath: process.env.VUE_APP_FILE_URL,
          postOne: []
      }
    },
    created() {
        this.content()
    },
    computed: {
      memberInfo() {
        if(this.$store.state.member.myInfo == null){
          return false
        } else{
          if(this.$store.state.member.myInfo.memberid == this.postOne.memberId){
            return true
          }else{
            return false
          }
        }
      }
    },
    methods: {
        content() {
          this.$axios({
            methods: 'post',
            headers: {
              'Accept': 'application/json'
            },
            url: `/list/content/${this.$route.params.num}`,
          })
          .then(response => {
              this.postOne = response.data
              this.writerid = response.data.memberId
          })
          .catch(e => console.log('e'))
        },
        goodCounter() {
          this.$axios({
            methods: 'post',
            url: `/list/content/good${this.$route.params.num}`,
          })
          .then(response => {
            this.postOne.goodCount += 1;
          })
          .catch(error =>{
            
          })
      },
      deleteContent() {
        let isDelete = confirm('정말 삭제하겠습니까?')
        if(isDelete === true){
          this.$axios({
            methods: 'get',
            url: `/list/content/delete/${this.$route.params.num}`
          })
          .then(response => {
            alert('삭제 되었습니다.')
            this.$route.push('/')
          })
          .catch(error => {
            console.log(error)
          })
        }
      }
    },
    
}
</script>
<style scoped>
  .text-content {
    font-size: 1.1em;
    color: black;
    margin: 2em
  }
</style>
