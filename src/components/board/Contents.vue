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
            <v-card-title v-text="title" />
            <v-img
              :src="`${imgPath}${fileName}`"
              class="white--text align-end"
              max-width="800px"
            />
            <P class="text-content">
              {{ textContent }}
              <v-card-actions>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
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
          fileName: '',
          title: '',
          textContent: ''
      }
    },
    created() {
        this.content()
    },
    methods: {
        content: function() {
        this.$axios({
          methods: 'post',
          headers: {
            'Accept': 'application/json'
          },
          url: `/list/content/${this.$route.params.num}`,
        })
        .then(response => {
            this.title = response.data.title
            this.textContent = response.data.content
            this.fileName = response.data.fileAltName
        })
        .catch(e => console.log('e'))
        }
    }
}
</script>
<style scoped>
  .text-content {
    font-size: 1.1em;
    color: black;
    margin: 2em
  }
</style>
