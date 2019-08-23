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
        <v-form>
          <img :src=" `${imgPath}`" />
          <v-text-field
            v-model="title"
            label="제목"   
          />
          <v-btn
            @click="submitText"
            color="white"
          >
            올리기
          </v-btn>
          
        </v-form>
        <v-form>
          <v-btn
            @click="onClickImgInput"
            type="button"
            color="blue">
            사진 +
            <input ref="imgInput" type="file" hidden accept="image/*" @change="submitImg"/>
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
          rules: {
              required: value => !! value || '글을 입력해주세요!',
          }
        }
    },
    computed: {
      imgPath: function(){
        return process.env.VUE_APP_FILE_URL + this.$store.state.content.imgPath
      }
    },
    methods: {
        submitText(){
            const form = new FormData()
            form.append('title', this.title)
            this.axios({
                method: 'post',
                url : '/list/content/write',
                data: form,
            })
        },
        submitImg(e){
          const imgForm = new FormData()
          imgForm.append('img',e.target.files[0])
          this.$store.dispatch('content/imgSubmit',imgForm)
        },
        onClickImgInput(){
          this.$refs.imgInput.click()
        }
    },
}
</script>

<style>

</style>