import React from 'react';
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Upload,
} from 'antd';

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
    }
  }
  componentWillMount(){
		console.log(localStorage);
		if(localStorage.style!=''&&localStorage.style != 'undefined'){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userId:localStorage.userid})
		}
	}
  render(){
    let showSeclist = seclist ?
     seclist.map((secCol,colindex)=>{
       let secCollist=[] ;
     for(let rowindex=0;rowindex<secCol.length;rowindex++){

       let showTextlist = textlist[colindex][rowindex] ?
         textlist[colindex][rowindex].map((text,tindex)=>(
           <div key={tindex} style={textStyle}/>
          ))
            :
            '';
        let showImagelist = imagelist[colindex][rowindex] ?
        imagelist[colindex][rowindex].map((image,index)=>(
          <div key={index} style={imageStyle}><img/></div>
         ))
           :
           '';
       let showVideolist = videolist[colindex][rowindex] ?
       videolist[colindex][rowindex].map((video,index)=>{
         return(
         <div key={index} style={{}}></div>
        )})
          :
          '';
       let secRow = (()=>(
         <section key={colindex*100+rowindex} class="secs" style={{transform:sectransform[colindex][rowindex][0],transition: 'all 2s ease-in-out',position:"absolute",height:sectransform[colindex][rowindex][2],width:sectransform[colindex][rowindex][1]}}>
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
 '';
    return(
      <div style={{position:'fixed',overflow:'scroll', left:300,width:"74%",height:"90%",margin: '0 16px',backgroundColor:"#ddd", padding: 0, minHeight: 280 }}>
          <div id="slides" style={{margin:'auto',backgroundColor:"#fff",margin:'10px auto',width:"98%",height:"98%",overflow:"visible",position:"relative"}}>
            {showSeclist}
          </div>
      </div>
    );
  }
}
