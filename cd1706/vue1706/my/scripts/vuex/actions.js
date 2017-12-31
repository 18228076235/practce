import axios from "axios";
axios.defaults.baseURL="http://101.132.180.228:8000"
export default{
    changm({commit},inx){
        var url="/mantt"
            axios.get(url,{params:{typeid:inx}})
            .then(res=>{
                return res.data
            })
            .then(json=>{
                commit("changm",json)
            })    
    },
    gettdata({commit},url){
        axios.get(url)
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            commit("gettdata",json)
        })
    },
    banner({commit},url){
        axios.get(url)
        .then(res=>{
            return res.data
        })
        .then(json=>{
            commit("banner",json)
        })
    },
    findchange({commit},url){
        axios.get(url)
        .then(res=>{
            return res.data
        })
        .then(json=>{
            commit("findchange",json)
        })
    },
    changebanner({commit},url){
        axios.get(url)
        .then(res=>{
            return res.data
        })
        .then(json=>{
            commit("changebanner",json)
        })
    },
    detilcg({commit},que){
        var url="/detil"
        axios.get(url,{params:{id:que}})
        .then(res=>{
            return res.data
        })
        .then(json=>{
            commit("detilcg",json)
        })
    },
    changcomment({commit},que){
        var url="/getcom"
        axios.get(url,{params:{id:que}})
        .then(res=>{
            return res.data;
        })
        .then(json=>{
            commit("changcomment",json)
        })
    },
    changmgz({commit}){
        var url="/hqx"
        axios.get(url)
            .then(res=>{
                return res.data;
            })
            .then(json=>{
                commit("changmgz",json)
            })
    },
    userlike({commit},data){
        var url="/user"
        axios.post(url,{id:data.id,username:data.username})
            .then(res=>{
                return res.data;
            })
    },
    collection({commit},name){   
        var url="/mylike"
        axios.get(url,{params:{username:name}})
            .then(res=>{
                return res.data
            })
            .then(json=>{
                commit("collection",json)
            })
    },
    closelike({commit},stat){
        commit('closelike',stat)
    }

}