<template>
   <transition name="move">
     <div v-show="showFlag" class="food" ref="food">
       <div class="food-content">
         <div class="image-header">
           <img :src="food.image">
           <div class="back" @click.stop.prevent="hide">
             <i class="icon-arrow_lift"></i>
           </div>
         </div>
         <div class="content">
           <h3 class="title">{{food.name}}</h3>
           <div class="detail">
             <span class="sell-count">月售{{food.sellCount}}份</span>
             <span class="rating" >好评率{{food.rating}}</span>
           </div>
           <div class="price">
             <span class="now">￥{{food.price}}</span>
             <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
           </div>
         </div>
         <div class="cartcontrol-wrapper">
           <Cartcontrol :food="food" @cartAdd="foodAdd"></Cartcontrol>
         </div>
         <transition name="fade">
           <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
         </transition>
       </div>
     </div>
   </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'Vue'
  import BScroll from 'better-scroll'
  import Cartcontrol from '../../components/cartcontrol/Cartcontrol'
   export default {
       props: {
           food: {
             type: Object
           }
       },
       data () {
           return {
               showFlag: false
           }
       },
       methods: {
           show() {
               this.showFlag = true
             //当页面展示的时候初始化bscroll,这也是shopchat组建中add按钮生效的条件之一
               this.$nextTick(() => {
                 if(!this.scroll) {
                     this.scroll = new BScroll(this.$refs.food,{
                         click:true
                     })
                 } else {
                     this.scroll.refresh()
                 }
             })
           },
           hide() {
               this.showFlag = false
           },
           addFirst(event) {
             if(!event._constructed) {
               return false
             }else {
               this.$emit('add', event.target)
               Vue.set(this.food,'count',1)
             }
           },
           foodAdd(el) {
             this.$emit('add', el)
           }
       },
     components:{
           Cartcontrol
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
  .food
     position: fixed
     left: 0
     top: 0
     bottom: 48px
     z-index: 8
     width: 100%
     background: #fff
     &.move-enter,&.move-leave-to
       transform:translate3d(100%,0,0)
     &.move-enter-active,&.move-leave-to
       transition: all 0.2s linear
     &.move-enter-to,&.move-leave
       transform:translate3d(0,0,0)
     .image-header
        position: relative
        width: 100%
        padding-top: 100%
        height: 0
        img
          position:absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
             display: block
             padding: 10px
             font-size: 20px
             color: #fff
     .content
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          line-height; 10px
          height: 10px
          font-size: 0
          .sell-count,.rating
             font-size: 10px
             color: rgb(147,153,159)
          .sell-count
              margin-right: 12px
       .price
         font-weight: 700
         line-height: 24px
         .now
           margin-right: 8px
           font-size: 14px
           color:rgb(240,20,20)
         .old
           text-decoration:line-through
           font-size: 10px
           color: rgb(147,153,159)
     .cartcontrol-wrapper
        position: absolute
        right: 20px
        bottom: 18px
     .buy
        position:absolute
        right: 18px
        bottom: 18px
        z-index: 9
        padding: 0 12px
        line-height: 28px
        font-size: 10px
        height: 28px
        /*box-sizing: border-box*/
        border-radius: 12px
        color: #fff
        background:rgb(0,160,220)
        opacity: 1 //加入动画,一个是为了体验,另外一个是为了延迟触发隐藏,避免小球抛物线动画出现问题
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-to
          opacity: 0

</style>
