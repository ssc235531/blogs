import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import addArtical from '@/components/pages/addArtical'
import articalList from '@/components/pages/articalList'
import addClassOne from '@/components/pages/addClassOne'
import addClassTwo from '@/components/pages/addClassTwo'
import classList from '@/components/pages/classList'
import addApi from '@/components/pages/addApi'
import apiListFont from '@/components/pages/apiListFont'
import apiListBack from '@/components/pages/apiListBack'
import resumeMsg from '@/components/pages/resumeMsg'
import blogMsg from '@/components/pages/blogMsg'
import amendOneClass from '@/components/pages/amendOneClass'
import amendTwoClass from '@/components/pages/amendTwoClass'
import apiAmend from '@/components/pages/apiAmend'
import welcome from '@/components/welcome'
import logIn from '@/components/logIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:"main",
      redirect:"/logIn"
    },
    {
      path:"/logIn",
      name:"logIn",
      component:logIn
    },
    {
      path: '/main',
      name: 'Home',
      component: Home,
      redirect:"/main/welcome",
      children:[
        {
          path:'add_artical',
          name:"addArtical",
          component:addArtical
        },
        {
          path:'article_list',
          name:"articalList",
          component:articalList
        },
        {
          path:'add_class_one',
          name:"addClassOne",
          component:addClassOne
        },
        {
          path:'add_class_two',
          name:"addClassTwo",
          component:addClassTwo
        },
        {
          path:'class_list',
          name:"classList",
          component:classList
        },
        {
          path:'add_api',
          name:"addApi",
          component:addApi
        },
        {
          path:'api_list_font',
          name:"apiListFont",
          component:apiListFont
        },
        {
          path:'api_list_back',
          name:"apiListBack",
          component:apiListBack
        },
        {
          path:'resume_msg',
          name:"resumeMsg",
          component:resumeMsg
        },
        {
          path:'blog_msg',
          name:"blogMsg",
          component:blogMsg
        },
        {
          path:'amend_one_class',
          name:"amendOneClass",
          component:amendOneClass
        },
        {
          path:'amend_two_class',
          name:"amendTwoClass",
          component:amendTwoClass
        },
        {
          path:'api_amend',
          name:"apiAmend",
          component:apiAmend
        },
        {
          path:'welcome',
          name:"welcome",
          component:welcome
        },
      ]
    }
  ]
})


