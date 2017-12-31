export default{
    changm(state,data){
        state.changdata=data;   
    },
    gettdata(state,data){
        state.toutiao=data;  
         
    },
    banner(state,data){
        state.bannerdata=data
    },
    findchange(state,data){
        state.finddata=data;
    },
    changebanner(state,data){
        state.findbanner=data;
    },
    detilcg(state,data){
        state.did=data;
    },
    changcomment(state,data){
        state.commentdata=data;
    },
    changmgz(state,data){
        state.mgzdata=data;
    },
    userlike(state,data){
       
    },
    collection(state,data){
        state.likedata=data 
        console.log(data)     
    },
    closelike(state,data){
        state.likeVisble=data
    }

}