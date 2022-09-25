# 笔记

## ref属性
```
    1.被用来给元素或子组件注册引用信息(id的替代者)
    2.应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（vc）
    3.使用方式：
        打标识：<h1 ref="xxx">.....</h1> 或 <School ref="xxx"></School>
        获取：this.$refs.xxx
```


## 配置项props
```
    功能：让组件接收外部传过来的数据
     (1).传递数据：
            <Demo name="xxx"/>
     (2).接收数据：
            第一种方式（只接收）：
                props:['name']
    
            第二种方式（限制类型）
                props:{
                    name:String
                }
    
            第三种方式（限制类型、限制必要性、指定默认值）：
                props:{
                    name:String, // 类型
                    required:true, // 必要性
                    default:'老王', // 默认值
                }
        
        备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，
              若业务需求确实需要修改，那么请复制props的内容到data中一份然后去修改data中的数据。
```


## mixin(混入)
```
    功能：可以把多个组件公用的配置提成一个混入对象
    使用方式：
        第一步定义混合，例如：
            {
                data(){...},
                methods:{....},
                ....
            }
        第二步使用混入，例如：
            (1).全局混入：Vue.mixin(xxx)
            (2).局部混入：mixins:['xxx']
```

## 插件
```
    功能：增强Vue
    本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者的传递的数据。
    定义插件：
        对象.install = function (Vue,options) {
            // 1.添加全局过滤器
            Vue.filter(....)
    
            // 2.添加全局指令
            Vue.directive(....)
    
            // 3.配置全局混入(合)
            Vue.mixin(....)
    
            // 4.添加实例方法
            Vue.prototype.$myMethod = function () {...}
            Vue.prototype.$myProperty = xxxx
        }
    使用插件：Vue.use()
```


## scoped样式
```
    作用：让样式在局部生效，防止冲突。
    写法：<style scoped>
```

## 总结TodoList案例
```
    1.组件化编码流程：
        (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
        (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是多个组件在用，还是一些组件在用:
            1).一个组件在用：放在组件自身即可。
            2).一些组件在用：放在他们共同的父组件上(状态提升)。
    
    2.props适用于：
        (1).父组件 ==> 子组件 通信
        (2).子组件 ==> 父组件他 通信 (要求父先给子一个函数)
    
    3.使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可修改的！
    
    4.props传过来的若是对象类型的值，修改对象中的属性不会报错，但不推荐这样做
```

## webStorage
```
    1.存储内容大小一般都支持5MB左右(不同浏览器可能不一样)
    2.浏览器通过Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
    3.相关API:
        1.xxxxxStorage.setItem('key','value');
            该方法接收一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
        2.xxxxxStorage.getItem('person');
            该方法接收一个键名作为参数，返回键名对应的值。
        3.xxxxxStorage.removeItem('key');
            该方法接收一个键名作为参数，并把该键名从存储中删除。
        4.xxxxxStorage.clear();
            该方法会清空存储中的所有数据。
    4.备注：
        1.SessionStorage存储的内容会随着浏览器窗口关闭而消失。
        2.LocalStorage存储的内容，需要手动清除才会消失。
        3.xxxxxStorage.getItem(xxx);如果xxx对应的value值获取不到，那么getItem的返回值是null。
        4.JSON.parse(null)结果仍是null。
```

## 组件的自定义事件
```
    1.一种组件间通信的方式，适用于： 子组件 ===> 父组件
    2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件(事件的回调在A中)。
    3.绑定自定义事件：
        1.第一种方式，在父组件中：<Demo @atguigu="test"/> 或 <Demo v-on:atguigu="test">
        2.第二种方式，在父组件中：
            <Demo ref="demo"/>
            .....
            mounted(){
                this.$refs.$on('atguigu',this.test)
            }
        3.若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。
    4.触发自定义事件：this.$emit('atguigu',数据)
    5.解绑自定义事件this.$off('atguigu')
    6.组件上也可以绑定原生的Dom事件，需要使用native修饰符。
    7.注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！！
```

## 全局事件总线(GlobalEventBus)
```
    1.一种组件间的通信方式，适用于任意组件间通信。
    2.安装全局事件总线：
        new Vue({
            ....
            beforeCreate() {
                Vue.prototype.$bus = this // 安装全局事件总线,$bus就是当前应用的vm
            },
            ....
        })
    3.使用事件总线：
        1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。
            methods:{
                demo(data){....}
            },
            ....
            mounted() {
                this.$bus.$on('xxxx',this.demo)
            }
        2.提供数据：this.$bus.$emit('xxxx',数据)
    4.最好在beforeDestroy钩子中，用$off去解除当前组件所用到的事件。
```


## 消息的订阅与发布 (pubsub)
```
    1.一种组件间通信的方式，适用于任意组件间通信。
    2.使用步骤：
        1.安装pubsub：npm i pubsub-js
        2.引入 import pubsub from 'pubsub-js'
        3.接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件身边。
                methods:{
                    demo(msgName,data){....}
                },
                .....
                mounted(){
                    this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
                }
        4.提供数据：pubsub.publish('xxx',数据)
        5.最好在beforeCreate钩子中，用pubsub.unsubscribe(pid)去取消订阅
```

## nextTick
```
    1.语法：this.$nextTick('回调函数')
    2.作用：在下一次DOM更新结束后执行其指定的回调
    3.什么时候用：当改变数据后，要基于更新后的DOM进行某些操作时，要在nextTick所指定的回调函数中进行。
```

## Vue封装的过度与动画
```
    1.作用：在插入、更新、或移除DOM元素时，在合适的时候给元素添加样式类名
    2.图示：
                  Enter                              Leave
        Opacity:0 ---> Opacity:1            Opacity:1 ---> Opacity:0
            |               |                    |               |
         v-enter        v-enter-to             v-leave        v-leave-to
        |_________________________|           |_________________________|
                    |                                      |
            v-enter-active                          v-leave-active
    3.写法：
        1.准备好样式：
            元素进入的样式：
                1.v-enter:进入的起点
                2.v-enter-active:进入的过程中
                3.v-enter-to:进入的终点
            元素离开的样式：
                1.v-leave:离开的起点
                2.v-leave-active:离开的过程中
                3.v-leave-to:离开的终点
        2.使用<transition>包裹要过渡的元素，并配置name属性：
            <transition name="hello" appear> <!--  :appear="true" 等价于 appear -->
                <h1 v-show="isShow">你好啊</h1>
            </transition>
        3.备注：若有多个元素需要过渡，则需要使用<transition-group>，且每个元素都要指定key值。
```

## vue脚手架配置代理服务器
```
    方法一：
        在vue.config.js中添加如下配置：
        devServer: {
            proxy: 'http://localhost:5000'
        }
        说明：
            1.优点：配置简单，请求资源时直接发给前端(8080)即可。
            2.缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
            3.工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求不会转发给服务器(优先匹配前端资源)
    方法二：
        编写vue.config.js配置具体代理规则：
        devServer:{
            proxy:{
                '/api':{ // 匹配所有以'/api'开头的请求路径
                    target:'http://localhost:5000', // 代理目标的基础路径
                    pathRewrite:{'^/api':''},
                    // ws:true,    // 用于支持websocket
                    // changeOrigin: true // 用于控制请求头中的host值
                },
                '/demo':{ // 匹配所有以'/demo'开头的请求路径
                    target:'http://localhost:5001', // 代理目标的基础路径
                    pathRewrite:{'^/demo':''},
                    // ws:true,    // 用于支持websocket
                    // changeOrigin: true // 用于控制请求头中的host值
                }
            }
        }
        /*
            changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
            changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
            changeOrigin默认值为true
        */
        说明：
            1.优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
            2.缺点：配置略微繁琐，请求资源时必须加前缀。
```

## 插槽
```
    1.作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件 ===> 子组件
    2.分类：默认插槽、具名插槽、作用域插槽
    3.使用方式：
        1.默认插槽：
            父组件中：
            <Category title="游戏">
                <div>html结构</div>      
            </Category>
            子组件中：
            <template>
                <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
                <slot>我是一个默认值，当使用者没有传递具体结构时，我会出现1</slot>
            </template>
        2.具名插槽：
            父组件中：
            <Category title="游戏">
                <template slot="center">
                    <div>html结构1</div>  
                </template>  
                <template v-slot:footer>
                    <div>html结构2</div>  
                </template>  
            </Category>
            子组件中：
            <template>
                <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
                <slot name="center">我是一个默认值，当使用者没有传递具体结构时，我会出现1</slot>
                <slot name="footer">我是一个默认值，当使用者没有传递具体结构时，我会出现1</slot>
            </template>
        3.作用域插槽：
            1.理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用
              数据所遍历出来的结构由App组件来决定）
            2.具体编码：
                父组件中：
                <Category title="游戏">
                    <!-- 生成的是ul列表 -->
                    <template scope="scopeData">
                        <ul>
                            <li v-for="(g,index) in scopeData.games" :key="index">{{g}}</li>
                        </ul>
                    </template>  
                </Category>
                <Category title="游戏">
                    <!-- 生成的是h4标题   -->
                    <template slot-scope="{games}">
                        <h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
                    </template>
                </Category>
                子组件中：
                <template>
                    <div>
                        <slot :games="games"></slot>                        
                    </div>
                </template>
                <script>
                    export default {
                        name:'Category',
                        data() {
                            return {
                                games:['农药1','农药1','农药1','农药1'],
                            }
                    },
                    }
                </script>
```


## Vuex
```
    1.概念：
        在Vue中实现集中式状态（数据）管理的一个插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件
        间通信的方式，且适用于任意组件间通信。
        安装：npm i vuex@3
    2.何时使用?
        多个组件需要共享数据时
    3.搭建Vuex环境
        1.创建文件：src/store/index.js
            // 该文件用于创建Vuex中最为核心的store
            // 引入Vuex
            import Vue from 'vue'
            import Vuex from 'vuex'
            // 使用Vuex插件
            Vue.use(Vuex)
            // 准备actions——用于响应组件中的动作
            const actions = {} 
            // 准备mutations——用于操作数据中（state）
            const mutations = {} 
            // 准备state——用于存储数据
            const state = {} 
    
            //创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state
            })
        2.在main.js中创建vm时传入store配置项
            // 引入Vue
            import Vue from 'vue'
            // 引入App
            import App from './App.vue'
            //引入插件（网络请求，用法同axios）
            import vueResource from 'vue-resource'
            // 引入store
            import store from './store/index'
            // 关闭Vue的生产提示
            Vue.config.productionTip = false
            Vue.use(vueResource)
            // 创建vm
            new Vue({
                el:'#app',
                render: h => h(App),
                store,
                beforeCreate() {
                    Vue.prototype.$bus = this
                },
            })
    4.基本使用
        1.初始化数据，配置actions、配置mutations，操作文件store.js
            // 该文件用于创建Vuex中最为核心的store
            // 引入Vuex
            import Vue from 'vue'
            import Vuex from 'vuex'
            // 使用Vuex插件
            Vue.use(Vuex)
            // 准备actions——用于响应组件中的动作
            const actions = {
                // jia(context,value){
                //     context.commit('JIA',value)
                // },
                // jian(context,value){
                //     context.commit('JIAN',value)
                // },
                jiaOdd(context,value){
                    if(context.state.sum%2){
                        context.commit('JIA',value)
                    }   
                },
                jiaWait(context,value){
                    setTimeout(()=>{
                        context.commit('JIA',value)
                    },500)
                    
                },
            } 
            // 准备mutations——用于操作数据中（state）
            const mutations = {
                JIA(state,value){
                    // console.log("mutation中的jia",state,value)
                    state.sum += value
                },
                JIAN(state,value){
                    state.sum -= value
                },
            } 
            // 准备state——用于存储数据
            const state = {
                sum: 0, // 当前的和
            }
    
            const getters = {
                bigSum(state){
                    return state.sum*10
                }
            }
    
            //创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state,
                getters
            })
        2.组件读取vuex中的数据：$store.state.sum
        3.组件中修改vuex中的数据：$store.dispatch('actions中的方法名',数据)或$store.commit('mutations中的方法名',数据)
        备注:若没有网络请求或其他业务逻辑，组件中也可以直接越过actions，即不写dispatch，直接编写commit
    5.getters的使用
        1.概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。
        2.在store.js中追加getters配置
            .....
            const getters = {
                bigSum(state){
                    return state.sum*10
                }
            }
    
            //创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state,
                getters
            })
        3.组件中读取数据：$store.getters.bigSum
```

## 四个map方法的使用
```
    1.用于帮我们映射state中的数据为计算属性
        computed:{           
            // 借助mapState生成计算属性，从state中读取数据。（对象写法）
            ...mapState({he:'sum',xuexiao:'school',xueke:'subject'}),
            // 借助mapState生成计算属性，从state中读取数据。（数组写法）
            ...mapState(['sum','school','subject']),
        }
    2.用于帮我们映射getters中的数据为计算属性
        computed:{           
            // 借助mapGetters生成计算属性，从getters中读取数据。（对象写法）
            // ...mapGetters({bigSum:'bigSum'}),
            // 借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
            ...mapGetters(['bigSum'])
        }
    3.用于帮我们生成与actions对话的方法，即：包含$store.dispatch(xxx)的函数
        computed:{           
            // 借助mapActions生成计算属性，从actions中读取数据。（对象写法）
            ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
            // 借助mapActions生成计算属性，从actions中读取数据。（数组写法）
            // ...mapActions(['jiaOdd','jiaWait']),
        }
    4.用于帮我们生成与mutations对话的方法，即：包含$store.commit(xxx)的函数
        computed:{           
            // 借助mapMutations生成计算属性，从mutations中读取数据。（对象写法）
            ...mapMutations({increment:'JIA',decrement:'JIAN'}),
            // 借助mapMutations生成计算属性，从mutations中读取数据。（数组写法）
            // ...mapMutations(['JIA','JIAN']),
        }
```


## 模块化+命名空间
```
    1.目的：让代码更好的维护，让多种数据分类更加明确。
    2.修改store.js
        const countAbout = {
            namespaced:true, //开启命名空间
            actions:{.....},
            mutations:{.....},
            state:{....},
            getters:{
                bigSum(state){
                    return state.sum*10
                }
            }
        }
        const personAbout = {
            namespaced:true, //开启命名空间
            actions:{.....},
            mutations:{.....},
            state:{....},
        }
        export default new Vuex.Store({
            // 模块化编程
            modules:{
                countAbout:countOptions,
                personAbout:personOptions
            }
        })
    3.开启命名空间后，组件中读取state数据
        //方式一，自己直接读取
        this.$store.state.personAbout.list
        //方式二，借助mapState读取，
        ...mapState('countAbout',['sum','school','subject']),
    4.开启命名空间后，组件中读取getters数据：
        //方式一，自己直接读取
        this.$store.getters['personAbout/firstPersonName']
        //方式二，借助mapState读取，
        ...mapGetters('countAbout',['bigSum']),
    5.开启命名空间后，组件中调用dispatch
        //方式一，自己直接dispatch
        this.$store.dispatch['personAbout/addPersonWang',person]
        //方式二，借助mapActions:
        ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
    6.开启命名空间后，组件中调用commit
        //方式一，自己直接commit
        this.$store.commit['personAbout/ADD_PERSON',person]
        //方式二，借助mapMutations:
        ...mapMutations('countAbout',{increment:'JIA',increment:'JIAN'}),
```


## 路由
```
    1.基本使用
        1.安装vue-router命令：npm i vue-router@3
        2.应用插件：Vue.use(VueRouter)
        3.编写router配置项:
            //引入VueRouter
            import VueRouter from "vue-router";
            //引入路由组件
            import About from '../components/About.vue'
            import Home from '../components/Home.vue'
    
            //创建并暴露router实例对象，去管理一组一组的路由规则
            export default new VueRouter({
                routes:[
                    {
                        path:'/about',
                        component:About
                    },
                    {
                        path:'/home',
                        component:Home
                    }
                ]
            })
        4.实现切换（active-class可配置高亮样式）
            <!-- Vue中借助router-link标签实现路由的切换 -->
            <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
            <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        5.指定展示位置
            <router-view></router-view>    
    2.几个注意点
        1.路由组件通常存放在pages组件夹，一般组件通常存放在components文件夹。
        2.通过切换，"隐藏"了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
        3.每个组件都有自己的route属性，里面存储着自己的路由信息。
        3.整个应用只有一个router，可以通过组件的$router属性获取到。
    
    3.多级路由
        1.配置路由规则，使用children配置项：
        //创建并暴露一个路由器
        export default new VueRouter({
            routes:[
                {
                    path:'/about',
                    component:About
                },
                {
                    path:'/home',
                    component:Home,
                    children:[
                        {
                            path:'news',
                            component:News
                        },
                        {
                            path:'message',
                            component:Message
                        }
    
                    ]
                }
            ]
        })
        2.跳转（要写完整路径）：
            <router-link to="/home/news/">News</router-link>
    4.路由的query参数
    	（路由上显示，刷新后路径传递的参数清仍然可以使用）
        1.传递参数
        <li v-for="m in messageList" :key="m.id">
            <!-- 跳转路由并携带query参数、to的字符串写法 -->
            <!-- <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>&nbsp;&nbsp; -->
            <!-- 跳转路由并携带query参数、to的对象写法 -->
            <router-link :to="{
            path:'/home/message/detail',
            query:{
                id:666,
                title:'你好'
            }
            }">
            跳转
            </router-link>&nbsp;&nbsp;
        </li>
        2.接收参数：
            $route.query.id
            $route.query.title
    5.命名路由
        1.作用：可以简化路由的跳转。
        2.如何使用
            1.给路由命名：
                {
                    path:'/demo',
                    component:Demo,
                    children:[
                        {
                            path:'test',
                            component:Test
                            children:[
                                {
                                    name:'hello',
                                    path:'welcome',
                                    component:Hello,
                                } 
                            ]
                        },
                    ]
                }
        3.简化跳转：
        <!-- 简化前,需要写完整的路径 -->
        <router-link to="/demo/test/welcome">About</router-link>
        <!-- 简化后,直接通过名字跳转 -->
        <router-link :to="{name:'hello'}">About</router-link>
        <router-link :to="{
          name:'hello',
          query:{
            id:666,
            title:'你好'
          }
        }">
          跳转
        </router-link>
    6.路由的params参数
    	（路由上不显示，刷新后传递的参数清空）
        1.配置路由，声明接收params参数
            {
                path:'/home',
                component:Home,
                children:[
                    {
                        path:'news',
                        component:News
                    },
                    {
                        path:'message',
                        component:Message,
                        children:[
                            {
                                name:'xiangqing',
                                path:'detail/:id/:title',//使用占位符声明接收params参数
                                component:Detail
                            }
                        ]
                    }
    
                ]
            } 
        2.传递参数
               <!-- 跳转并携带params参数，to的字符串写法 -->
               <router-link :to="`/home/message/detail/666/你好啊`">跳转</router-link>
               <!-- 跳转路由并携带params参数、to的对象写法 -->
                <router-link :to="{
                name:'xiangqing',
                params:{
                    id:m.id,
                    title:m.title
                }
                }">
                跳转
                </router-link>
    7.路由组件的props配置
        作用：让路由组件更方便的收到参数
        {
            name:'xiangqing',
            path:'detail/:id/:title',
            component:Detail,
            //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件
            // props:{a:1,b:'hello'}
            //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的Detail组件
            // props:true
            //props的第三种写法，值为函数，该函数返回的对象中每一组key-value都会通过props传给Details组件
            props({query:{id,title}}){   // 参数里边是对$route的连续解构赋值
                return{
                    id:id,
                    title:title
                }
            }
        }
    8.<router-link>的replace属性：
        1.作用：控制路由跳转时操作浏览器历史记录的模式。
        2.浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转时候
          默认为push
        3.如何开启replace模式：<router-link replace .......>News</router-link>
    9.编程式路由导航
        1.作用：不借助<router-link>实现路由跳转，让路由跳转更加灵活
        2.具体编码：
            //$router的两个API
            pushShow(m){
                this.$router.push({
                name:'xiangqing',
                query:{
                    id:m.id,
                    title:m.title
                }
                })
            },
            replaceShow(m){
                this.$router.replace({
                name:'xiangqing',
                query:{
                    id:m.id,
                    title:m.title
                }
                })
            }
            this.$router.forward() //前进
            this.$router.back() //后退
            this.$router.go(3)  //可前进也可后退
    10.缓存路由组件
        1.作用：让不展示的路由组件保持挂载，不被销毁。
        2.具体编码：
        <keep-alive include="News">
            <router-view></router-view>
        </keep-alive>
    11.两个新的声明周期钩子
        1.作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
        2.具体名字：
            1.activated路由组件被激活时触发。
            2.deactivated路由组件失活时触发。
    12.路由守卫
        1.作用：对路由进行权限控制
        2.分类：全局守卫、独享守卫、组件内守卫
        3.全局守卫：
            // 全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
            router.beforeEach((to,from,next)=>{
                console.log('前置路由守卫',to,from)
                if(to.meta.isAuth){  //判断当前路由是否需要进行权限控制
                    if(localStorage.getItem('school')==='atguigu'){  //权限控制的具体规则
                        next() //放行
                    }else{
                        alert('无权限查看')
                    }
                }else{
                    next() //放行
                }
                
            })
            // 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
            router.afterEach((to,from)=>{
                console.log('后置路由守卫',to,from)
                document.title = to.meta.title || '硅谷系统' //修改网页的title
            })
        4.独享守卫：
            beforeEnter:(to,from,next)=>{
                if(to.meta.isAuth){  //判断当前路由是否需要进行权限控制
                    if(localStorage.getItem('school')==='atguigu'){  //权限控制的具体规则
                        next() //放行
                    }else{
                        alert('无权限查看')
                    }
                }else{
                    next() //放行
                    }
            }
        5.组件内守卫：
            //进入守卫，通过路由规则，进入该组件时被调用
            beforeRouteEnter(to, from, next) {
            },
    
            //离开守卫，通过路由规则，离开该组件时被调用
            beforeRouteLeave(to, from, next) {
            },
    13.路由器的两种工作模式
        1.对于一个url来说，什么是hash值？————#后面的内容就是hash值。
        2.hash值不会包含在Http请求中，即hash值不会带给服务器。
        3.hash模式：
            1.地址中永远带着#号，不美观。
            2.若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
            3.兼容性较好。
        4.history模式。
            1.地址干净，美观。
            2.兼容性和hash相比略差，
            3.应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。   
```
