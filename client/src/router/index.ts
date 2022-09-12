    import { createRouter, createWebHashHistory } from 'vue-router'
    import Login from '../views/Login.vue'
    import Home from '../views/Home.vue'
    import User from '../views/User.vue'
    import Category from '../views/Category.vue'
    import City from '../views/City.vue'
    import Banner from '../views/Banner.vue'
    import Notice from '../views/Notice.vue'

    const routes = [
        { path: '/', redirect: '/home' },
        { path: '/home', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/user', name: 'user', component: User },
        { path: '/category', name: 'category', component: Category },
        { path: '/city', name: 'city', component: City },
        { path: '/notice', name: 'notice', component: Notice },
        { path: '/banner', name: 'banner', component: Banner },
    ]
  
  // 3. 创建路由实例并传递 `routes` 配置
  // 你可以在这里输入更多的配置，但我们在这里
  // 暂时保持简单
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

  export default router;