import p1 from "../../assets/img/01.jpg";
import p2 from "../../assets/img/02.jpg";
import p3 from "../../assets/img/03.jpg";
import p4 from "../../assets/img/04.jpg";

import m1 from "../../assets/img/m1.jpg";
import m2 from "../../assets/img/m2.jpg";
import m3 from "../../assets/img/m3.jpg";
import m4 from "../../assets/img/m4.jpg";


export default{
    guideImg:[
        {src:p1},
        {src:p2},
        {src:p3},
        {src:p4}
    ],
    footdata:[
        {name:"watch",txt:"看点",icon:"&#xe61d"},
        {name:"find",txt:"发现",icon:"&#xe606;"},
        {name:"mgz",txt:"杂志",icon:"&#xe646;"},
        {name:"my",txt:"我的",icon:"&#xe642;"}
    ],
    headlist:["头条","黑科技","型格","性情","座驾"],
    navindex:0,
    toutiao:[],
    bannerdata:[],
    faceindex:0, 
    mypic:m1,
    changdata:[],
    finddata:[],
    findbanner:[],
    did:null,
    time:new Date(),
    commentdata:null,
    mgzdata:null, 
    likedata:null,
    likeVisble:''
}
