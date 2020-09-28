<template>
    <div>
      <h1 v-for="(item,index) in data" :key="index">{{item.correct}}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    var parsedobj = JSON.parse(JSON.stringify(this.$route.params.history))
    this.data = parsedobj
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>
