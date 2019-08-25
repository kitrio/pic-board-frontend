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
        <!-- <v-img
            v-model="imgTag"
            :src="imgPath"
          >
            
          </v-img> -->
        <!-- <v-img
          :src="imgPathnpm"
        /> -->

        <v-img
          v-if="init"
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
        <v-btn
          color="white"
          @click="submitContent"
        >
          올리기
        </v-btn>
        <v-form>
          <v-btn
            type="button"
            color="blue"
            @click="onClickImgInput"
          >
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
          title: '',
          textContent: '',
          filePath: this.$store.state.content.imgPath,
          rules: {
              required: value => !! value || '글을 입력해주세요!',
          },
          init: null
        }
    },
    computed: {
      imgPath: function(){
        return process.env.VUE_APP_FILE_URL + this.$store.state.content.imgPath
      }
    },
    methods: {
        submitContent(){
            this.axios({
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'post',
              url : '/list/content/write',
              data: {'title': this.title, 'content': this.textContent, 'fileAltName': this.$store.state.content.imgPath}
          })
        },
        submitImg(e){
          const imgForm = new FormData()
          imgForm.append('img',e.target.files[0])
          this.$store.dispatch('content/imgSubmit',imgForm)
          this.init = true
        },
        onClickImgInput(){
          this.$refs.imgInput.click()
        }
    },
}
</script>

<style>

</style>