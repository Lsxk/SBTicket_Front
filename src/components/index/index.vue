<template>
  <div class="index">
    <el-container>
      <el-header>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <v-site v-on:listenSiteId="setSourSiteId"></v-site>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              这里有一个转换箭头
            </div></el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <v-site v-on:listenSiteId="setDistSiteId"></v-site>
            </div>
          </el-col>
        </el-row>
        <el-date-picker v-model="date" type="date" @change="dateChange" placeholder="选择日期" :picker-options="pickerOptions"
                        format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" round :loading="loading" v-on:click="queryTicket">查询</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import site from 'components/site/site'
  import Jquery from 'jquery'
  export default {
    name: 'App',
    components: {
      'v-header': header,
      'v-site': site
    },
    data () {
      return {
        sourceSiteId: '',
        distSiteId: '',
        pickerOptions: {
          disabledDate (time) {
            // 减去24小时的毫秒数，当日可以选取
            return time.getTime() < (Date.now() - 86400000)
          }
        },
        date: '',
        loading: false
      }
    },
    methods: {
      queryTicket () {
        this.loading = true
        var thisVue = this
        console.log(this.sourceSiteId + ' ' + this.distSiteId + ' ' + this.date)
        // 访问后端，获取可售卖的票列表
        Jquery.ajax({
          url: '/api/ticket/' + this.date + '/' + this.sourceSiteId + '/' + this.distSiteId + '/query',
          async: false, // 设置为同步方法
          type: 'GET',
          success: function (response) {
            console.log(response)
            var tickets = response.data
            thisVue.$router.push({name: 'tickets', params: {tickets: tickets}})
          }
        })
      },
      setSourSiteId (data) {
        this.loading = false // 使得组件可以重新点击
        this.sourceSiteId = data
      },
      setDistSiteId (data) {
        this.loading = false
        this.distSiteId = data
      },
      dateChange (date) {
        this.loading = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
