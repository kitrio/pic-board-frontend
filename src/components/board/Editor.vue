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
          <v-textarea
            
          />
          <v-btn
            @click="sumbitText"
            color="white"
          >
            올리기
          </v-btn>
          
        </v-form>
        <v-form>
          <v-btn
            type="button"
            @click="submitImg"
            color="blue">
            사진 올리기
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
            rules: {
                required: value => !! value || '글을 입력해주세요!',
            }
        }
    },
    methods: {
        submitText(){
            let form = new FormData()
            form.append('memberid', this.userid)
            form.append('password',this.password)
            this.axios({
                method: 'post',
                url : '/list/write',
                data: form,
            })
        }
    },
}
</script>

<style>

</style>