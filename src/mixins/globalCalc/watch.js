export default {
  user (value) {
    if (value !== null && value !== undefined) {
      this.$router.push('/')
    }
  }
}
