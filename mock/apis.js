module.exports = [
  {
    url: '/test/getInfo',
    type: 'post',
    answer: _ => {
      return {
        status: 200,
        data: {
          msg: 'success from /test/getInfo'
        }
      }
    }
  }
]