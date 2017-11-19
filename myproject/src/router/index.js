import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import contentList from '@/components/contentList'
import welcome from '@/components/welcome'
import loading from '@/components/loading'
import detail from '@/components/common/detail'
import contentDetail from '@/components/common/contentDetail'
import oneDetail from '@/components/common/oneDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      redirect:"/contentList",
      children:[
        {
          path:"loading",
          name:"loading",
          component:loading
        },
        {
          path:"contentList",
          name:"contentList",
          component:contentList
        },
        {
          path:"welcome",
          name:"welcome",
          component:welcome
        },
        {
          path:"oneDetail",
          name:"oneDetail",
          component:oneDetail
        },
        {
          path:"detail",
          name:"detail",
          component:detail,
        },
        {
          path:"contentDetail",
          name:"contentDetail",
          component:contentDetail
        }
        
      ]
    },
    
  ]
})
