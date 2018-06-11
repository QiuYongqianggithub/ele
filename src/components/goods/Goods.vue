<template>
  <div>
   <div class="goods">
     <div class="menu-wapper" ref="menu">
       <ul>
         <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)" :key="index">
           <span class="text border-1px">
             <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
           </span>
         </li>
       </ul>
     </div>
     <div class="foods-wapper" ref="foods">
       <ul>
         <li v-for="item in goods" class="food-list food-list-hook">
           <h1 class="title">{{item.name}}</h1>
           <ul>
             <li v-for="(food,index) in item.foods" class="food-item border-1px" @click="selectedFood(food,$event)">
               <div class="icon">
                 <img width="57" height="57" :src="food.icon" />
               </div>
               <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}份</span>
                   <span>好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="now">￥{{food.price}}</span>
                   <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
                 <div class="cartcontrol-wrapper">
                   <Cartcontrol :food="food" @cartAdd="cartAdd2"></Cartcontrol>
                 </div>
               </div>
             </li>
           </ul>
         </li>
       </ul>
     </div>
     <Shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
   </div>
    <Food :food="selectFood" ref="food" @add="cartAdd2"></Food>
  </div>
</template>
<script type="text/ecmascript-6">
 import Shopcart from '../../components/shopcart/Shopcart'
 import Cartcontrol from '../../components/cartcontrol/Cartcontrol'
 import Food from '../../components/food/Food'
 import BScroll from 'better-scroll'
 const ERR_OK = 0
 export default {
   props:{
       seller:{
           type:Object
       }
   },
   data() {
     return {
         goods:[],
         listHeight:[],
         scrollY: 0,
         selectFood:{}
     }
   },
   computed:{
     currentIndex() {
         for(let i = 0; i < this.listHeight.length; i++) {
             let height1 = this.listHeight[i]
             let height2 = this.listHeight[i+1]
           if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                 return i
           }
         }
         return 0
     },
     selectFoods() {
         let foods = []
         this.goods.forEach((good) => {
             good.foods.forEach((food) => {
                if(food.count) {
                    foods.push(food)
                }
             })
         })
        return foods
     }
   },
   created(){
       this.$http.get('/api/goods').then((response) => {
           response = response.body
           if(response.errno === ERR_OK) {
              this.goods = response.data
              this.$nextTick(() => {
                this.initScroll()
                this.calculateHeight()
              })
           }
       })
       this.classMap = ['decrease','discount','special','invoice','guarantee']
   },
   methods:{
       initScroll() {
         this.foodsScroll = new BScroll(this.$refs.foods,{
           probeType: 3,
           click:true
         })
         this.menuScroll = new BScroll(this.$refs.menu,{
             click:true
         })
          this.foodsScroll.on('scroll',(pos) => {
              this.scrollY = Math.abs(Math.round(pos.y))
          })
       },
       calculateHeight() {
         let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
         let height = 0
         this.listHeight.push(height)
         for(let i = 0;i < foodList.length; i++) {
             let item = foodList[i]
             height += item.clientHeight
             this.listHeight.push(height)
         }
       },
       selectMenu(index,event) {
         if(index <= 0) {
               index = 0
         }
         if(!event._constructed) {
             return false
         }
         let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
         let el = foodList[index]
         this.foodsScroll.scrollToElement(el,300)
       },
      _drop(target) {
         this.$nextTick(() => { //避免两个动画同时运行带来的性能问题
           this.$refs.shopcart.drop(target)//在vue2中，访问子组件和DOM都用$refs
         })
      },
     cartAdd2(target) {
           this._drop(target)
     },
      selectedFood(food,event) {
           if (!event._constructed) {
               return
           }
           this.selectFood = food
           this.$refs.food.show()
      }
   },
   components: {
      Shopcart,
      Cartcontrol,
      Food
   }
 }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .goods
   display:flex
   position:absolute
   top: 174px
   bottom: 46px
   overflow:hidden
   width:100%
   .menu-wapper
    //理解flex的三个参数
    flex:0 0 80px
    width: 80px
    background:#f3f5f7
    .menu-item
     display:table
     height: 60px
     width: 56px
     line-height:14px
     padding:0 12px
     &.current
      position: relative
      z-index: 10
      margin-top: -1px
      background: #fff
      font-weight: 700
      .text
       border-none()
     .text
      display:table-cell
      width: 56px
      font-size:12px
      vertical-align:middle
      border-1px(rgba(7,17,27,0.1))
      .icon
       display:inline-block
       width:12px
       height:12px
       margin-right:2px
       vertical-align:top
       background-size:12px 12px
       background-repeat:no-repeat
       &.decrease
         bg-image('decrease_3')
       &.discount
         bg-image('discount_3')
       &.guarantee
         bg-image('guarantee_3')
       &.special
         bg-image('special_3')
       &.invoice
         bg-image('invoice_3')

   .foods-wapper
    flex:1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147,153,159)
      background: #f3f5f7
    .food-item
      display:flex
      margin: 18px
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
       border-none
       margin-bottom:0
      .icon
         flex: 0 0 57px
         margin-right: 10px
      .content
         flex:1
         .name
           margin: 2px 0 8px 0
           height: 14px
           font-size: 14px
           line-height: 14px
           color:rgb(7,17,27)
         .desc, .extra
           line-height: 10px
           font-size: 10px
           color:rgb(147,153,159)
         .desc
           margin-bottom: 8px
         .extra
           line-height: 10px
           &.count
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
            position:absolute
            right:0
            bottom:12px
            font-size: 0
</style>
