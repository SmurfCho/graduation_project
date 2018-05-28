import React from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Upload,
} from "antd";

export default class PCPlayer extends React.Component{
  constructor(){
		super();
    this.state = {
      textlist:[[[]]],/*文本框队列,保存文字内容*/
      imagelist:[[[]]],/*图片框队列，保存图片url*/
      videolist:[[[]]],/*视频框队列，保存视频URL*/
      textarea:[[[]]],//文本样式队列
      imagearea:[[[]]],//图片样式队列
      videoarea:[[[]]],//视频样式队列
      imageObjectList: [],//图片list
      videoObjectList:[],
      seclist:[[[]]],//幻灯片队列
      curSecRow:0,
      curSecCol:0,
      sectransform:[[[]]],
      slidesIndex:0,
    }
  }
  
  componentWillMount(){
    /*var myFetchOptions = {
      method: "GET"
    };
    fetch( ,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({});
    });
    fetch( ,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({});
    });*/

    let userid = localStorage.userid;
    let slideslistStr = localStorage.getItem(userid);
    let slidesIndex = this.props.match.params.slidesIndex;
    let slideslist = JSON.parse(slideslistStr);
    console.log("slideslist",slideslist);
    let slides = slideslist[slidesIndex];
    this.setState({slideslist:slideslist,userid:userid,slidesIndex:this.props.match.params.slidesIndex,seclist:slides.seclist,
    textlist:slides.textlist,imagelist:slides.imagelist,videolist:slides.videolist,
    textarea:slides.textarea,imagearea:slides.imagearea,videoarea:slides.videoarea,transform:slides.transform,sectransform:slides.sectransform,slidesName:slides.curslidesName});
  };
  navigatorDre(e){
    let {seclist,sectransform,curSecCol,curSecRow} = this.state;
    switch(e.target.id)
    {
    case "navigator-up":
      if(seclist[curSecCol][curSecRow+1]=="y"){
        sectransform[curSecCol][curSecRow][0]="translate(0,-1000px)";
        sectransform[curSecCol][curSecRow+1][0]="translate(0,0)";
        this.setState({sectransform:sectransform,curSecRow:curSecRow+1});
      }else{
        let col = curSecCol+1,row = curSecRow+1;
        alert("已经是最后一行了！目前在"+col+"列"+row+"行")
      }
      break;
    case "navigator-down":
      if(seclist[curSecCol][curSecRow-1]=="y"){
      sectransform[curSecCol][curSecRow-1][0]="translate(0,0)";
      sectransform[curSecCol][curSecRow][0]="translate(0,1000px)";
      this.setState({sectransform:sectransform,curSecRow:curSecRow-1});
      }else{
        let col = curSecCol+1,row = curSecRow+1;
        alert("已经是第一行了！目前在"+col+"列"+row+"行")
      }
      break;
    case "navigator-left":
      if(seclist[curSecCol+1] && seclist[curSecCol+1][curSecRow]=="y"){
      sectransform[curSecCol][curSecRow]=["translate(-2000px,0)",0,"100%"];
      sectransform[curSecCol+1][curSecRow]=["translate(0,0)","100%","100%"];
      this.setState({sectransform:sectransform,curSecCol:curSecCol+1});
    }else{
      let col = curSecCol+1,row = curSecRow+1;
      alert("已经是最后一列了！目前在"+col+"列"+row+"行")
    }
      break;
    case "navigator-right":
      if(seclist[curSecCol-1] && seclist[curSecCol-1][curSecRow]=="y"){
      sectransform[curSecCol][curSecRow]=["translate(2000px,0)",0,"100%"];
      sectransform[curSecCol-1][curSecRow]=["translate(0,0)","100%","100%"];
      this.setState({sectransform:sectransform,curSecCol:curSecCol-1});
    }else{
      let col = curSecCol+1,row = curSecRow+1;
      alert("已经是第一列了！目前在"+col+"列"+row+"行")
    }
      break;
    }
  };
  render(){
    let {slideslist,slidesIndex,seclist,textlist,imagelist,videolist,textarea,imagearea,videoarea,transform,
    curSecRow,curSecCol,sectransform,slidesName} = this.state;
    let slide = slideslist[slidesIndex];
    let showSlideslist = seclist ?
     seclist.map((secCol,colindex)=>{
       let secCollist=[] ;
     for(let rowindex=0;rowindex<secCol.length;rowindex++){

       let showTextlist = textlist[colindex][rowindex] ?
         textlist[colindex][rowindex].map((text,index)=>(
           <div key={index} style={{
             margin:0,
             position:"absolute",
             height:textarea[colindex][rowindex][index][13],
             width:textarea[colindex][rowindex][index][14],
             padding:textarea[colindex][rowindex][index][11],
             textAlign:textarea[colindex][rowindex][index][0],
             fontSize:textarea[colindex][rowindex][index][1],
             lineHeight:textarea[colindex][rowindex][index][2],
             letterSpacing:textarea[colindex][rowindex][index][3]*0.1,
             color:textarea[colindex][rowindex][index][4],
             backgroundColor:textarea[colindex][rowindex][index][5],
             borderWidth:textarea[colindex][rowindex][index][7],
             borderStyle:textarea[colindex][rowindex][index][9],
             borderRadius:textarea[colindex][rowindex][index][8],
             borderColor:textarea[colindex][rowindex][index][10],
             transform:textarea[colindex][rowindex][index][12]+" rotate("+textarea[colindex][rowindex][index][6]+"deg)",
           }}>{text}</div>
          ))
            :
            "";
        let showImagelist = imagelist[colindex][rowindex] ?
        imagelist[colindex][rowindex].map((image,index)=>(
          <img key={index}
            style={{
            margin:0,
            position:"absolute",
            height:imagearea[colindex][rowindex][index][7],
            width:imagearea[colindex][rowindex][index][8],
            display:"block",
            background: "#f0f0f0",
            borderWidth:imagearea[colindex][rowindex][index][2],
            borderStyle:imagearea[colindex][rowindex][index][4],
            borderRadius:imagearea[colindex][rowindex][index][3],
            borderColor:imagearea[colindex][rowindex][index][5],
            opacity:imagearea[colindex][rowindex][index][1]*0.1,
            borderRadius:imagearea[colindex][rowindex][index][3],
            transform:imagearea[colindex][rowindex][index][6]+" rotate("+imagearea[colindex][rowindex][index][0]+"deg)",
          }}
           autoFocus="autofocus" src="/src/images/timg.jpg"/>
         ))
           :
           "";
       let showVideolist = videolist[colindex][rowindex] ?
       videolist[colindex][rowindex].map((video,index)=>{
         return(
           <video key={index} controls="controls"
           style={{
           margin:0,
           position:"absolute",
           height:videoarea[colindex][rowindex][index][7],
           width:videoarea[colindex][rowindex][index][8],
           display:"block",
           background: "#f0f0f0",
           borderWidth:videoarea[colindex][rowindex][index][2],
           borderStyle:videoarea[colindex][rowindex][index][4],
           borderRadius:videoarea[colindex][rowindex][index][3],
           borderColor:videoarea[colindex][rowindex][index][5],
           opacity:videoarea[colindex][rowindex][index][1]*0.1,
           borderRadius:videoarea[colindex][rowindex][index][3],
           transform:videoarea[colindex][rowindex][index][6]+" rotate("+videoarea[colindex][rowindex][index][0]+"deg)",
         }}>
           <source src="/src/images/test.mp4"  type="video/mp4"/>
           <source src="/src/images/test.mp4"  type="video/ogg"/>
           <source src="/src/images/test.mp4"  type="video/webm"/>
           </video>
        )})
          :
          "";
       let secRow = (()=>(
         <section key={colindex*100+rowindex} class="secs" style={{transform:sectransform[colindex][rowindex][0],transition: "all 2s ease-in-out",position:"absolute",height:sectransform[colindex][rowindex][2],width:sectransform[colindex][rowindex][1]}}>
           {showTextlist}
           {showImagelist}
           {showVideolist}
         </section>)
       )();

        secCollist.push(secRow);
        }
    return secCollist;
    })
    :
    "";

    return(
      <div id="viewer" style={{position:"absolute",overflow:"hidden",margin:0,padding:0,top:0,left:0,right:0,bottom:0,background:"#a0a0a0",display:this.state.viewerDispaly}}>
        <div id="slides" style={{margin:"auto",overflow:"hidden",backgroundColor:"#fff",margin:"30px auto",width:"72%",height:"90%",position:"relative"}}>
          {showSlideslist}
        </div>
        <aside class="control" style={{position:"absolute",right:0,bottom:0}}>
          <Button id="navigator-up" htmlType="button"  onClick={this.navigatorDre.bind(this)}><Icon type="up" /></Button>
          <Button id="navigator-down" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="down" /></Button>
          <Button id="navigator-left" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="left" /></Button>
          <Button id="navigator-right" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="right" /></Button>
        </aside>
      </div>
    );
  }
}
