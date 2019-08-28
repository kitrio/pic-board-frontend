<template>
  <v-app id="editor">
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
        <v-card-title>
          오늘의 사진 하나
        </v-card-title>        
        <v-card-text> {{checkModify.nickname }} </v-card-text>
        <v-img
          :src=" `${imgPath}`"
          max-width="720px"
        />
        <v-text-field
          v-model="title"
          label="제목"
        />
        
        <v-textarea
          v-model="textContent"
          label="이야기"
        />
        <v-card-actions>
        <v-btn v-if="!checkModify"
          color="white"
          @click="submitContent"
        >
        <v-icon>mdi-plus</v-icon>
          올리기
        </v-btn>
        <v-btn v-else
          color="orange"
          @click="submitUpdate"
        >
          수정
        </v-btn>
        <v-form>
          <v-btn
            type="button"
            color="blue"
            @click="onClickImgInput"
          >
            <v-icon>mdi-image</v-icon>
            사진 +
            <input
              ref="imgInput"
              type="file"
              hidden
              accept="image/*"
              @change="submitImg"
            >
          </v-btn>
        </v-form>
        </v-card-actions>
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
          boardNum: 0,
          title: '',
          textContent: '',
          nickname: '',
          fileName: this.$store.state.contents.imgPath,
          rules: {
              required: value => !! value || '글을 입력해주세요!',
          },
          init: null
        }
    },
    computed: {
      imgPath: function() {
        return process.env.VUE_APP_FILE_URL + this.$store.state.contents.imgPath
      },
      checkModify() {
        if(this.$store.state.contents.content){
          return this.$store.state.contents.content
        }else {
          return false
        }
      }
    },
    mounted() {
      this.getModifyContent()
    },
    methods: {
        submitContent() {
          this.axios({
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'post',
            url: '/list/content/write',
            data: {'title': this.title, 'content': this.textContent, 'fileAltName': this.$store.state.contents.imgPath}
          })
        },
        submitImg(e) {
          const imgForm = new FormData()
          imgForm.append('img',e.target.files[0])
          this.$store.dispatch('contents/imgSubmit',imgForm)
        },
        onClickImgInput() {
          this.$refs.imgInput.click()
        },
        getModifyContent() {
           this.boardNum = this.checkModify.boardNum
           this.title = this.checkModify.title
           this.nickname = this.checkModify.nickname
           this.textContent = this.checkModify.content
           this.$store.state.contents.imgPath = this.checkModify.fileAltName
        },
        submitUpdate() {
          this.axios({
            methods: 'post',
            url: `/list/content/update/${boardNum}`,
            date: {'boardNum': this.boardNum,'title': this.title, 'content': this.textContent, 'fileAltName':this.fileName}
          })
          .then((response) =>{
            this.initDefault()
          })
          .catch((error) =>{
            console.log(error)
          })
        },
        initDefault() {
          this.$store.state.contents.content = null
        }
    },
}
</script>

<style>

</style>