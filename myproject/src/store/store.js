import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        navData:null,
        artData:null,
        state:false,
        // searchData:[],
        // broadcastData:[{title:"首页",router:"/contentList",id:null,type:null}]
    },
    // getters:{
    //     getTJData(state){
    //         console.log(state)
    //          return  state.artData.filter(function(i){
    //                 return i.recommend=="1"
    //             })
    //     },
    //     getClickTopData(state){
    //         if(state.artData==null){
    //             return null
    //         }else{
    //              return state.artData.sort((a,b)=>{
    //                 // console.log(new Date(a.TIME).getTime())
    //                 return a.visitors<b.visitors
    //             }).map((i)=>{
    //                 console.log(i)
    //                 i.TIME=i.TIME.substr(0,10)
    //                 i.article_name=i.article_name.substr(0,6)
    //                 return i
    //             })
    //         }
    //     },
    //     getNewTopData(state){
            
    //         if(state.artData==null){
    //             return null
    //         }else{
    //              return state.artData.sort((a,b)=>{
    //                 // console.log(new Date(a.TIME).getTime())
    //                 return new Date(a.TIME).getTime()<new Date(b.TIME).getTime()
    //             }).map((i)=>{
    //                 console.log(i)
    //                 i.TIME=i.TIME.substr(0,10)
    //                 i.article_name=i.article_name.substr(0,6)
    //                 return i
    //             })
    //         }
           
            
    //     }
       
    // },
    actions:{
        // getsearchData_A({commit},data){
        //     commit("getsearchData_M",data)
        // },
        // getTJData_A({commit}){
        //     commit("getTJData_M")
        // },
        // deleteBCData_A({commit},type){
        //         commit("deleteBCData_M",type)
        // },
        // changeBCData_A({commit},data){
        //         commit("changeBCData_M",data)
        // },
        getAllData({commit}){
            var getNav = function(){
                return new Promise((resolve,reject)=>{
                this.axios.get("/api/front_article/getNav").then((data)=>{
                    commit("navData_m",data.data.data)
                    resolve()
                })
            })}
            
            var getAllArt = function(){
                return new Promise((resolve,reject)=>{
                    this.axios.get("/api/front_article/getArticleAll").then((data)=>{
                        console.log(1111)
                        commit("artData_m",data.data.data)    
                        resolve()
                    })
            })}
            return {
                axios:this.axios,
                getNav,
                getAllArt
            }
        },
        defaultData({dispatch,commit},fn){
            commit("state_m","start")
            dispatch("getAllData").then((data)=>{
                Promise.all([data.getNav(),data.getAllArt()]).then(()=>{
                    commit("state_m","end")
                    fn()
                })
            }).then(()=>{
                commit("state_m",false)
            })
        }
    },
    mutations:{
        // getsearchData_M(state,data){
        //     state.searchData=state.artData.filter((i)=>{
        //         return i.article_name.indexOf(data)>-1
        //     })
        // },
        // deleteBCData_M(state,type){
        //     if(type=="one"){
        //         state.broadcastData.splice( 2)
        //     }else if(type=="two"){
        //         state.broadcastData.splice(3)
        //     }else if(type=="index"){
        //         state.broadcastData.splice(1)
        //     }else if(type=="search"){

        //     }
            
        // },
        // changeBCData_M(state,data){
        //     state.broadcastData=data
        // },
        navData_m(state,data){
            state.navData = data
        },
        artData_m(state,data){
            state.artData = data
        },
        state_m(state,data){
            state.state=data
            console.log(state)
        }
    }
})
export default store;