<template>
   <transition name="move">
     <div v-show="showFlag" class="food" >
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
               <span class="old" v-show="food.oldPrice">  ￥{{food.oldPrice}}</span>
             </div>
             <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food" @cartAdd="foodAdd"></Cartcontrol>
             </div>
             <transition name="fade">
               <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
             </transition>
           </div>
           <Split v-show="food.info" />
           <div class="info" v-show="food.info">
              <h3 class="title">商品信息</h3>
              <p class="text">{{food.info}}</p>
           </div>
           <Split/>
           <div class="rating">
              <h3 class="title">商品评价</h3>
              <Ratingselect @handle-selecttype="select" @handle-onlycontent="only" :selectType.sync="selectType" :onlyContent.sync="onlyContent" :desc="desc" :ratings="food.ratings"/>
           </div>
       </div>
     </div>
   </transition>
</template>
<script type="text/ecmascript-6">
  import Vue from 'Vue'
  import BScroll from 'better-scroll'
  import Cartcontrol from '../../components/cartcontrol/Cartcontrol'
  import Split from '../../components/split/Split'
  import Ratingselect from '../../components/ratingselect/Ratingselect'
    const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
   export default {
       props: {
           food: {
             type: Object
           }
       },
       data () {
           return {
               showFlag: false,
               selectType: ALL,
               onlyContent: true,
               desc: {
                 all: '全部',
                 positive: '推荐',
                 negative: '吐槽'
               }
           }
       },
       methods: {
           show() {
              this.showFlag = true
              this.selectType = ALL
              this.onlyContent = true
              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$el, {
                    click: true
                  })
                } else {
                  this.scroll.refresh();
                }
              });
            },
           hide() {
               this.showFlag = false
           },
           addFirst() {
             if(!event._constructed) {
               return false
             }else {
               this.$emit('add', event.target)
               this.$set(this.food,'count',1) //在实例创建之后添加新的属性到实例上，它不会触发视图更新,需要使用vm.set
             }
           },
           foodAdd(el) {
               this.$emit('add', el)
           },
           select(type) {
              this.selectType = type
           },
           only(value) {
             this.onlyContent = value
           }
       },
     components:{
           Cartcontrol,
           Split,
           Ratingselect
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
        position: relative
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
          box-sizing: border-box
          border-radius: 12px
          color: #fff
          background:rgb(0,160,220)
          opacity: 1 //加入动画,一个是为了体验,另外一个是为了延迟触发隐藏,避免小球抛物线动画出现问题
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s
          &.fade-enter, &.fade-leave-to
            opacity: 0
     .info
       padding: 18px
       .title
         line-height: 14px
         margin-bottom: 6px
         font-size: 14px
         color: rgb(7,17,27)
       .text
          line-height: 24px
          font-size: 12px
          color:rgb(77,85,92)
          padding: 0 8px
     .rating
         padding-top: 18px
         .title
           margin-left: 18px
           line-height: 14px
           font-size: 14px
           color: rgb(7,17,27)
</style>
