<template>
  <el-container>
    <el-header height="auto">
      <h2>{{ticket.date}}</h2>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>出发{{ticket.time}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p>{{ticket.lasting}}分钟</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>预估{{foreTime}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{sourCampus}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p>------></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{distCampus}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{ticket.sourName}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <p></p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{ticket.distName}}</p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <v-tag v-on:listenStudent="setStudents"></v-tag>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <p>{{totalPrice}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" plain @click="payTicket">立即预定</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="支付方式" :visible.sync="dialogVisible">
        <el-button type="primary" plain @click="setPayType(1)">支付宝</el-button>
        <el-button type="primary" plain @click="setPayType(2)">微信</el-button>
      </el-dialog>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import Jquery from 'jquery'
  import tag from 'components/tag/tag'
  export default {
    components: {
      'v-tag': tag
    },
    methods: {
      setStudents (data) {
        this.studentNums = data
        var thisVue = this
        Jquery.ajax({
          url: '/api/trade/' + this.ticket.ticketId + '/' + this.studentNums.length + '/queryTotalPrice',
          type: 'GET',
          success: function (response) {
            if (response.success === true) {
              thisVue.totalPrice = response.data
            } else {
              thisVue.$message('查询总价错误')
            }
          }
        })
      },
      payTicket () {
        if (this.studentNums.length === 0) {
          this.$message('请添加乘客')
        } else {
          if (this.isType === 1 || this.isType === 2) {
            // 跳到付款组件
            this.$router.push({name: 'pay', params: {tickets: 0}})
          } else {
            this.dialogVisible = true
          }
        }
      },
      setPayType (type) {
        this.isType = type
        this.$router.push({name: 'pay', params: {tickets: 0}})
      }
    },
    data () {
      return {
        ticket: Object,
        foreTime: '',
        sourCampus: '',
        distCampus: '',
        studentNums: [],
        totalPrice: '',
        dialogVisible: false,
        isType: 0
      }
    },
    mounted () {
      this.ticket = this.$route.params.ticket
      var date = new Date(Date.parse(this.ticket.date + ' ' + this.ticket.time + ':00') + parseInt(this.ticket.lasting) * 60 * 1000)
      var hour = date.getHours()
      if (hour < 10) {
        this.foreTime = '0' + hour + ':' + date.getMinutes()
      } else {
        this.foreTime = hour + ':' + date.getMinutes()
      }
      var thisVue = this
      Jquery.ajax({
        url: '/api/site/' + this.ticket.sourName + '/' + this.ticket.distName + '/query',
        async: false, // 设置为同步方法
        type: 'GET',
        success: function (response) {
          thisVue.sourCampus = response.data.sourCampus
          thisVue.distCampus = response.data.distCampus
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
