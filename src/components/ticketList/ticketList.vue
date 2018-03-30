<template>
  <div>
    <div v-for="ticket in tickets" :key="ticket.ticketId" class="item">
      <router-link :to="{name: 'preOrder', params: {ticket: ticket}}">
        <el-card class="box-card">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p v-text="ticket.time"></p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <p>始：{{ticket.sourName}}</p>
                </el-row>
                <el-row>
                  <p>终：{{ticket.distName}}</p>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-row>
                  <p>¥{{ticket.price}}</p>
                </el-row>
                <el-row>
                  <p>{{ticket.balance}}张</p>
                </el-row>
                <el-row>
                  <p>约{{ticket.lasting}}分钟</p>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElRow from 'element-ui/packages/row/src/row'

  export default {
    components: {ElRow},
    data () {
      return {
        tickets: []
      }
    },
    mounted () {
      console.log(this.$route.params.tickets)
      this.tickets = this.$route.params.tickets
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .item
      font-size 14px
      padding 14px 0
      .box-card
        width 100%
</style>
