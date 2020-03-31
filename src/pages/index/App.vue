<template>
  <div id="index-page-container">index page</div>
</template>

<script>
import axios from '@/axios'
export default {
  name: 'Index',
  data() {
    return {}
  },
  created() {
    console.log('当前页面：index')
    axios
      .post('https://test-api.dacallapp.com/open/flow/share', {
        id: 'xxx'
      })
      .then(res => {
        console.log(res)
      })

    axios.post('/mock-api/test/getInfo', {}).then(res => {
      console.log(res, '================')
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
