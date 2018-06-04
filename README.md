# ele

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

###关于css的问题
1. 在入口文件中引入css或其方言，之后就可以在所有组件中使用该css了，
2. 也可以在组件内的style标签中定义css或引入css，这样的样式表只在当前组件中有效
3. 如node报`* ./fonts/myicon.eot?419bxy in ./node_modules/_css-loader@0.28.11@css-loader??ref--11-1!./node_modules/postcss-loader/lib??ref--11-2!./node_modules/_stylus-loader@3.0.2@stylus-loader??ref--11-3!./src/common/stylus/index.styl` 则表示在XXX中的字体文件（* ./fonts/myicon.eot?419bxy）路径错误

###data
组件配置中的data项应当为一个函数如data () {},因为组件会被复用，如果定义成对象，那么当修改一个组件时会影响另外一个组件，
###vueResource
当在入口文件中引入，并注册了vue-resource后，就相当于给所有的vue实例进行了扩展，可以使每个vue实例使用vue-resource提供的api
###数据传递
在根组件App中的script标签中的数据，可以v-bind到App组件中某个子组件，然后再在子组件的script标签中使用props属性接收，最后应用到子组件中