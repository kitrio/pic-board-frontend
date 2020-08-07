<template>
  <div id="notfound">
    <h1>404</h1>
    <p>page not found</p>
    페이지를 찾을 수 없습니다.
  </div>
</template>

<script>
export default {
  name: 'Notfound',
  mounted () {
    this.errorfunc()
  },
  methods: {
    errorfunc: () => {
      document.title = '404 Error'
    }
  }
}
</script>

<style>

</style>
