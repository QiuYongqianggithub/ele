<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCart" >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart" ></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
      props: {
          food:{
              type:Object
          }
      },
      methods:{
          addCart(event) {
              if(!event._constructed) {
                  return
              }
              if(!this.food.count) {
                  Vue.set(this.food,'count',1)
              }else {
                 this.food.count++
              }
              this.$emit('cartAdd',event.target)//派发cartAdd事件
          },
          decreaseCart(event) {
            if(!event._constructed) {
              return
            }
            if(this.food.count) {
                this.food.count--
            }
          }
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .cartcontrol
    .cart-decrease,.cart-add
       display:inline-block
       padding: 2px
       &.move-enter
         opacity: 0
         transform:translate3D(24px,0,0)
         .inner
           display:inline-block
           font-size: 24px
           line-height: 24px
           color:rgb(0,160,220)
           transform: rotate(180deg)
       &.move-enter-active
         transition:all 0.4s linear
         .inner
           transition: all 0.4s linear
       &.move-enter-to
         opacity: 1
         transform:translate3D(0,0,0)
         .inner
           display:inline-block
           font-size: 24px
           line-height: 24px
           color:rgb(0,160,220)
           transform: rotate(0)
       &.move-leave
         opacity: 1
         transform:translate3D(0,0,0)
         .inner
           display:inline-block
           font-size: 24px
           line-height: 24px
           color:rgb(0,160,220)
           transform: rotate(0)
       &.move-leave-active
         transition:all 0.4s linear
         .inner
           transition: all 0.4s linear
       &.move-leave-to
         opacity: 0
         transform:translate3D(24px,0,0)
         .inner
           display:inline-block
           font-size: 24px
           line-height: 24px
           color:rgb(0,160,220)
           transform: rotate(180deg)
      .inner
        display:inline-block
        font-size: 24px
        line-height: 24px
        color:rgb(0,160,220)
   .cart-count
       display:inline-block
       vertical-align:top
       width: 12px
       padding-top: 2px
       line-height: 24px
       text-align: center
       font-size: 10px
       color:rgb(147,153,159)
    .cart-add
        display:inline-block
        padding: 2px
        font-size: 24px
        line-height: 24px
        color:rgb(0,160,220)
</style>
