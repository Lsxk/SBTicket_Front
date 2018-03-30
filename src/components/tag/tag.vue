<template>
  <div>
    <el-tag
      :key="tag"
      v-for="tag in studentNums"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="$event.target.blur"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">新增乘客（输入学号）</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        studentNums: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose (tag) {
        this.studentNums.splice(this.studentNums.indexOf(tag), 1)
        // 向父组件传出乘客学号
        this.$emit('listenStudent', this.studentNums)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        var trueNums = inputValue && isTrueNum(inputValue)
        if (trueNums) {
          if (this.studentNums.indexOf(inputValue) !== -1) {
            this.$message('该乘客已经添加')
          } else {
            this.studentNums.push(inputValue)
            // 向父组件传出乘客学号
            this.$emit('listenStudent', this.studentNums)
          }
        } else {
          this.$message('请输入13位乘客学号')
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
  // 正则表达式判断数字数据是否为13为数字
  function isTrueNum (inputValue) {
    var reg = /^\d{13}$/
    if (!reg.test(inputValue)) {
      return false
    }
    return true
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-tag + .el-tag
    margin-left 10px
  .button-new-tag
    margin-left 10px
    height 32px
    line-height 30px
    padding-top 0
    padding-bottom: 0
  .input-new-tag
    width 90px;
    margin-left 10px
    vertical-align bottom
</style>
