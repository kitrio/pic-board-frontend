<template>
  <div id="notfound">
    <H1>404</H1>
    <p>page not found</p>
    페이지를 찾을 수 없습니다.
  </div>
</template>

<script>
export default {
  name: 'Notfound',
  mounted() {
    this.errorfunc()
  }, // 컴포넌트 이름
  methods: {
    errorfunc: () => {
      document.title = '404 Error'
    }
  }
}
</script>

<style>

</style>
