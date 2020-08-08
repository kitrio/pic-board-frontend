<template>
  <v-app id="editor">
    <v-container>
      <v-card-title>
        오늘의 사진 하나
      </v-card-title>
      <v-card-text> {{ checkModify.nickname }} </v-card-text>
      <v-img
        v-if="isImgPreview"
        :src="`${imgPather}`"
        max-width="700px"
      />
      <v-text-field
        v-model="title"
        label="제목"
      />
      <v-textarea
        v-model="textContent"
        label="이야기"
      /><v-layout
        row
        wrap
      >
        <p>
          <v-card-actions>
            <v-btn
              v-if="!checkModify"
              color="white"
              @click="submitContent"
            >
              <v-icon>mdi-plus</v-icon>
              올리기
            </v-btn>
            <v-btn
              v-else
              color="orange"
              @click="submitUpdate"
            >
              수정완료
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
        </p>
      </v-layout>
      <p />
    </v-container>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      boardNum: '',
      title: '',
      textContent: '',
      nickname: '',
      fileName: this.imgPath,
      rules: {
        required: value => !!value || '글을 입력해주세요!'
      },
      isImgPreview: true,
      isSubmitSucees: false
    }
  },
  computed: {
    ...mapGetters({
      contents: (['contents/getContent']),
      imgPath: (['contents/getImgPath'])
    }),
    imgPather () {
      return process.env.VUE_APP_FILE_URL + this.imgPath
    },
    checkModify () {
      return (this.contents != null) ? this.contents : false
    }
  },
  mounted () {
    this.getModifyContent()
  },
  methods: {
    submitContent () {
      this.$axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: '/list/content/write',
        data: { title: this.title, content: this.textContent, fileAltName: this.imgPath }
      }).then((response) => {
        this.isSubmitSucees = true
        this.$router.push('/')
      })
        .catch(() => {
          alert('게시글 등록이 실패했습니다. 다시 시도해주세요')
        })
    },
    submitImg (e) {
      const imgForm = new FormData()
      imgForm.append('img', e.target.files[0])
      this.$store.dispatch('contents/imgSubmit', imgForm)
    },
    onClickImgInput () {
      this.$refs.imgInput.click()
      this.isImgPreview = true
    },
    getModifyContent () {
      this.boardNum = this.checkModify.boardNum
      this.title = this.checkModify.title
      this.nickname = this.checkModify.nickname
      this.textContent = this.checkModify.content
      this.fileName = this.checkModify.fileAltName
      this.$store.dispatch('contents/modifyImg', this.checkModify.fileAltName)
    },
    submitUpdate () {
      this.$axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'patch',
        url: '/list/content/update',
        data: { boardNum: this.boardNum, title: this.title, content: this.textContent, fileAltName: this.fileName }
      })
        .then((response) => {
          this.isSubmitSucees = true
          this.$router.push('/')
          this.initDefault()
        })
        .catch((error) => {
          alert('게시글 수정이 안되었습니다. 다시 시도해주세요.')
          console.log(error)
        })
    },
    initDefault () {
      this.$store.dispatch('contents/contentAction', null)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isSubmitSucees === false) {
      const isLeave = confirm('작성 중인 글이 있습니다. 나가시겠습니까?')
      if (isLeave) {
        this.initDefault()
        next()
      } else {
        next(false)
      }
    } else {
      this.initDefault()
      next()
    }
  }
}
</script>

<style>

</style>
