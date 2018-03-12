<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="handleSelect"
  ></el-autocomplete>
</template>
<script>
  // 使用原生jquery只为了使用同步方式请求后台，此处特殊场景需要
  import Jquery from 'jquery'
  export default {
    data () {
      return {
        sites: [],
        state: '',
        siteId: '',
        timeout: null
      }
    },
    methods: {
      loadAll () {
        var list = [{}]
        Jquery.ajax({
          url: '/api/site/queryAll',
          async: false, // 设置为同步方法
          type: 'GET',
          success: function (response) {
            console.log(response)
            for (let i of response.data) {
              i.value = i.name
            }
            list = response.data
          }
        })
       return list
      },
      querySearchAsync (queryString, cb) {
        var sites = this.sites
        console.log(sites)
        var results = queryString ? sites.filter(this.createStateFilter(queryString)) : sites

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        this.siteId = item.siteId.toString()
        // 向父组件传出校车站id
        this.$emit('listenSiteId', this.siteId)
      }
    },
    mounted () {
      this.sites = this.loadAll()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
