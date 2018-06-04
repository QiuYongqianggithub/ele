<template>
  <div id="app">
    <Header :seller="seller" />
    <nav class="tab border-1px">
      <div class="tab-item">
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/seller">商家</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

import Header from './components/header/Header'
const ERR_OK = 0
export default  {
  data() {
    return {
     seller:{}
    }
  },
  created() {
   this.$http.get('/api/seller').then((response) => {
    response = response.body
    if (response.errno === ERR_OK) {
      this.seller = response.data
    }
   })
  },
  components:{Header}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
.tab
  display:flex
  flex-direction:row
  width:100%
  height:40px
  line-height:40px
  //border-bottom: 1px solid rgba(7,17,27,0.1)
  border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex:1
    text-align:center
    & > a
     display:block
     font-size: 14px
     color:rgb(77,85,93)
     &.router-link-active
      color:rgb(240,20,20)


</style>
