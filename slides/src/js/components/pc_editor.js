import React from "react";
import {Link} from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Upload,
  Modal,
} from "antd";
require(`../../css/pc_editor.css`);
const { Footer,Content,Sider } = Layout;
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import PCEditorTextsidebar from "./pc_editor_textsidebar";
import PCEditorImagesidebar from "./pc_editor_imagesidebar";
import PCEditorVideosidebar from "./pc_editor_videosidebar";
import PCEditorTextarea from "./pc_editor_textarea";
import PCEditorImagearea from "./pc_editor_imagearea";
import PCEditorVideoarea from "./pc_editor_videoarea";
import PCPlayer from "./pc_player";
import AV from "leancloud-storage";
// 存储服务
var { Query, User} = AV;



export default class PCEditor extends React.Component{
  constructor(){
		super();
		this.state = {
      originSider: "block",/*选择添加类型菜单条*/
      originSiderop:1,
      textSider: "none",/*文本编辑工具条*/
      textSiderop:0,
      imagesSider: "none",/*图片编辑工具条*/
      imagesSiderop:0,
      videoSider: "none",/*视频编辑工具条*/
      videoSiderop:0,
      count:0,/*文本框数*/
      textlist:[[[]]],/*文本框队列,保存文字内容*/
      imageCount:0,
      imagelist:[[[]]],/*图片框队列，保存图片url*/
      videoCount:0,
      videolist:[[[]]],/*视频框队列，保存视频URL*/
      /*textAlign:[],//以下是文本框编辑参数 fontSize:[],lineHeight:[],letterSpacing:3,textColor:4,backgroundColor:5,  rotation:6,borderWidth:7,borderRadius:8,borderStyle:9,borderColor:10,textpadding:11,*/
      textareaKey:0,//section中被点击的textarea的key
      textarea:[[[]]],//文本样式队列
      imageareaKey:0,
      imagearea:[[[]]],//图片样式队列
      videoareaKey:0,
      videoarea:[[[]]],//视频样式队列
      imageObjectList: [],//图片list
      videoObjectList:[],
      seclist:[["y"]],//幻灯片队列
      secNum:0,
      curSecRow:0,
      curSecCol:0,
      sectransform:[[["translate(0,0)","block"]]],
      viewerDispaly: "none",
      contentEditable:"true",
      secId:0,
      slideslist:[],
      slidesIndex:0,
      nextslidesIndex:0,
      curslidesName:"",
    };
	};
  componentDidMount(){}
  componentWillMount(){
    let {seclist,textlist,imagelist,videolist,textarea,imagearea,videoarea,transform,sectransform,curslidesName,curSecRow,curSecCol}=this.state;

    let userid = localStorage.userid;
    let slidesIndex = this.props.match.params.curslidesIndex;
    let slideslistStr = localStorage.getItem(userid);
    let slideslist = slideslistStr?JSON.parse(slideslistStr):[];
    if(slideslist != [] && slideslist[slidesIndex] != null){
      let slides = slideslist[slidesIndex];
      this.setState({slideslist:slideslist,userid:userid,slidesIndex:this.props.match.params.slidesIndex,seclist:slides.seclist,
      textlist:slides.textlist,imagelist:slides.imagelist,videolist:slides.videolist,
      textarea:slides.textarea,imagearea:slides.imagearea,videoarea:slides.videoarea,transform:slides.transform,sectransform:slides.sectransform,slidesName:slides.curslidesName});
    }
    this.setState({slideslist:slideslist,userid:userid,slidesIndex:this.props.match.params.curslidesIndex});
  }
  /*展示工具条o*/
  showOriginSider(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      originSider:"block",
      originSiderop:1,
      textSider: "none",/*文本编辑工具条*/
      textSiderop:0,
      imagesSider: "none",/*图片编辑工具条*/
      imagesSiderop:0,
      videoSider: "none",/*视频编辑工具条*/
      videoSiderop:0,
    });
  }

  showTextSider(e){
    this.setState({
      textSider:"block",
      textSiderop:1,
      originSider: "none",
      originSiderop:0,
      imagesSider: "none",
      imagesSiderop:0,
      videoSider: "none",
      videoSiderop:0,
    });
  }
  showImageSider(e){
    this.setState({
      imagesSider:"block",
      imagesSiderop:1,
      originSider: "none",
      originSiderop:0,
      textSider: "none",
      textSiderop:0,
      videoSider: "none",
      videoSiderop:0,
    });
  }
  showVideoSider(e){
    this.setState({
      videoSider:"block",
      videoSiderop:1,
      originSider: "none",
      originSiderop:0,
      textSider: "none",
      textSiderop:0,
      imagesSider: "none",
      imagesSiderop:0,
    });
  }
/************************************************************************/
/*文本编辑*/

  /*新建文本框o*/
  addTextarea(e){
     let {textlist,count,textarea,curSecCol,curSecRow} = this.state;
     let style = ["left",16,1,2,"#000","#fff",0,1,0,"solid","#000",4,"translate(0,0)",200,200];
     textarea[curSecCol][curSecRow].push(style);
     textlist[curSecCol][curSecRow].push("");
     this.setState({textlist:textlist,count:count+1,textarea:textarea});
     }
   /*新增文本框并显示文本编辑工具条*/
 showtext(e){
/*   this.showTextSider(e);
*/   this.addTextarea(e);
 }

 /*新增图片*/
 addImage(e){
   let {curSecCol,curSecRow}=this.state;
    let count = this.state.imageCount;
    let imagearea = this.state.imagearea;
    let style = [0,10,0,0,"solid","#000","translate(0,0)",200,200];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    imagearea[curSecCol][curSecRow].push(style);
    this.setState({imageCount:count+1,imagearea:imagearea});
    }
    /*image upload*/
    uploadImage(e){
      e.preventDefault();
      let {curSecCol,curSecRow}=this.state;
      let imagelist = this.state.imagelist;
      var fileUploadControl = e.target;
      if (fileUploadControl.files.length > 0) {
       var localFile = fileUploadControl.files[0];
       var name = localFile.name;
       var file = new AV.File(name, localFile);
       file.save().then(function(file) {
         imagelist[curSecCol][curSecRow].push(file.url());
         return 1;
       }).then((x)=>{x=1?this.setState({imagelist:imagelist}):''})
       .catch(function(error) {
         console.error(error);
       });
     }
  }

  showimage(e){
   this.showImageSider(e);
   this.addImage(e);
 }
 /*新增视频*/
 addVideo(e){
    let {curSecCol,curSecRow}=this.state;
    let count = this.state.videoCount;
    let videoarea = this.state.videoarea;
    let style = [0,10,0,0,"solid","#000","translate(0,0)",200,200];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    videoarea[curSecCol][curSecRow].push(style);
    this.setState({videoCount:count+1,videoarea:videoarea});
    }
  uploadVideo(e){
    e.preventDefault();
    let {curSecCol,curSecRow}=this.state;
    let videolist = this.state.videolist;
    var fileUploadControl = e.target;
    if (fileUploadControl.files.length > 0) {
     var localFile = fileUploadControl.files[0];
     var name = localFile.name;
     var file = new AV.File(name, localFile);
     file.save().then(function(file) {
       videolist[curSecCol][curSecRow].push(file.url());
       return 1;
     }).then((x)=>{x=1?this.setState({videolist:videolist}):''})
     .catch(function(error) {
       console.error(error);
     });
   }
  }
 showvideo(e){
   this.showVideoSider(e);
   this.addVideo(e);
 }
/*获得鼠标选中的文本*/
  getSelectedText(e){
   //IE下获取选择文本
   if (document.selection) {
    return document.selection.createRange().text;
   }
   //firefox下获取选择文本
   else
    if (window.getSelection().toString()) {
     return window.getSelection().toString();
    }
    //firefox下获取input或textArea域的选择文本
    else
     if (e.selectionStart != undefined && e.selectionEnd != undefined) {
      var start = e.selectionStart;
      var end = e.selectionEnd;
      return e.value.substring(start, end);
     }
  }

  /*获得当前焦点所在文本框的key*/
  getTextareaKey(e){
    let key = parseInt(e.target.id);
    let textareaKey = this.state.textareaKey;
    textareaKey != key ?
    this.setState({textareaKey:key})
    :
    "";
  }
  /*编辑文本alighment0*/
  getTextAlignKey(e){
    let {curSecCol,curSecRow}=this.state;
    let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
    switch(e.target.value)
    {
    case "left":
      textarea[curSecCol][curSecRow][textareaKey][0] = "left";
      this.setState({textarea:textarea});
      break;
    case "right":
      textarea[curSecCol][curSecRow][textareaKey][0] = "right";
      this.setState({textarea:textarea});
      break;
    case "center":
      textarea[curSecCol][curSecRow][textareaKey][0] = "center";
      this.setState({textarea:textarea});
      break;
    case "justify":
      textarea[curSecCol][curSecRow][textareaKey][0] = "justify";
      this.setState({textarea:textarea});
      break;
    };
  };
    textOnChange(e){
      let {curSecCol,curSecRow,textlist} = this.state
    }
    /*文字大小*/
    fontSizeChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea=this.state.textarea,textareaKey = this.state.textareaKey;
      if(textarea[curSecCol][curSecRow][textareaKey]){
      textarea[curSecCol][curSecRow][textareaKey][1]=e;
      this.setState({textarea:textarea});}

    }
    /*行高*/
    lineheightChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][2]=e;
      this.setState({textarea:textarea});
    }
    /*letterSpacing*/
    letterSpacingChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][3]=e;
      this.setState({textarea:textarea});
    }
    /*旋转*/
    rotationChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][6]=e;
      this.setState({textarea:textarea});
    }
    /*边框宽度*/
    borderWidthChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][7]=e;
      this.setState({textarea:textarea});
    }
    /*边框角圆*/
    borderRadiusChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][8]=e;
      this.setState({textarea:textarea});
    }
    borderStyleChange(e){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][9]=e;
      this.setState({textarea:textarea});
    }
    textColorChange(color){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][4]=color.hex;
      this.setState({textarea:textarea});
    };
    backgroundColorChange(color){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][5]=color.hex;
      this.setState({textarea:textarea});
    };
    borderColorChange(color){
      let {curSecCol,curSecRow}=this.state;
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[curSecCol][curSecRow][textareaKey][10]=color.hex;
      this.setState({textarea:textarea});
    };
    /*图片样式*/
    /*获得当前焦点*/
    getImageareaKey(e){
      let {curSecCol,curSecRow}=this.state;
      let key = parseInt(e.target.id);
      this.setState({imageareaKey:key});
    }
    /*旋转*/
    irotationChange(e){
      let {curSecCol,curSecRow}=this.state;
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[curSecCol][curSecRow][imageareaKey][0]=e;
      this.setState({imagearea:imagearea});
    }
    /*透明度*/
    iopacityChange(e){
      let {curSecCol,curSecRow}=this.state;
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[curSecCol][curSecRow][imageareaKey][1]=e;
      this.setState({imagearea:imagearea});
    }
    /*边框宽度*/
    iborderWidthChange(e){
      let {curSecCol,curSecRow}=this.state;
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[curSecCol][curSecRow][imageareaKey][2]=e;
      this.setState({imagearea:imagearea});
    }
    /*边框角圆*/
    iborderRadiusChange(e){
      let {curSecCol,curSecRow}=this.state;
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[curSecCol][curSecRow][imageareaKey][3]=e;
      this.setState({imagearea:imagearea});
    }
    iborderColorChange(color){
      let {curSecCol,curSecRow}=this.state;
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[curSecCol][curSecRow][imageareaKey][5]=color.hex;
      this.setState({imagearea:imagearea});
    };
    /*视频样式*/
    /*获得当前焦点*/
    getVideoareaKey(e){
      let key = parseInt(e.target.id);
      this.setState({videoareaKey:key});
    }
    /*旋转*/
    vrotationChange(e){
      let {curSecCol,curSecRow}=this.state;
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[curSecCol][curSecRow][videoareaKey][0]=e;
      this.setState({videoarea:videoarea});
    }
    /*透明度*/
    vopacityChange(e){
      let {curSecCol,curSecRow}=this.state;
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[curSecCol][curSecRow][videoareaKey][1]=e;
      this.setState({videoarea:videoarea});
    }
    /*边框宽度*/
    vborderWidthChange(e){
      let {curSecCol,curSecRow}=this.state;
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[curSecCol][curSecRow][videoareaKey][2]=e;
      this.setState({videoarea:videoarea});
    }
    /*边框角圆*/
    vborderRadiusChange(e){
      let {curSecCol,curSecRow}=this.state;
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[curSecCol][curSecRow][videoareaKey][3]=e;
      this.setState({videoarea:videoarea});
    }
    vborderColorChange(color){
      let {curSecCol,curSecRow}=this.state;
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[curSecCol][curSecRow][videoareaKey][5]=color.hex;
      this.setState({videoarea:videoarea});
    };
    /*获得当前焦点所在文本框的key*/
    getTextareaKey(e){
      let key = parseInt(e.target.id);
      let textareaKey = this.state.textareaKey;
      textareaKey != key ?
      this.setState({textareaKey:key})
      :
      "";
    }
    /*新建幻灯片*/
    addRightSlides(){
      let{seclist,secNum,currentSecindex,sectransform,curSecRow,curSecCol,textlist,imagelist,videolist,textarea,imagearea,videoarea} = this.state;
      let row = curSecRow;
      sectransform[curSecCol][curSecRow][0]="translate(-2000px,0)";/*使当前幻灯片向左滑动*/
      if(!seclist[curSecCol+1]){
        seclist.splice([curSecCol+1],0,[]);
        sectransform.splice([curSecCol+1],0,[]);
        textlist.splice([curSecCol+1],0,[]);
        imagelist.splice([curSecCol+1],0,[]);
        videolist.splice([curSecCol+1],0,[]);
        textarea.splice([curSecCol+1],0,[]);
        imagearea.splice([curSecCol+1],0,[]);
        videoarea.splice([curSecCol+1],0,[]);
      }
      seclist[curSecCol+1].splice([curSecRow],0,"y");
      sectransform[curSecCol+1].splice([curSecRow],0,["translate(0,0)","100%","100%","block"]);
      textlist[curSecCol+1].splice([curSecRow],0,[]);
      imagelist[curSecCol+1].splice([curSecRow],0,[]);
      videolist[curSecCol+1].splice([curSecRow],0,[]);
      textarea[curSecCol+1].splice([curSecRow],0,[]);
      imagearea[curSecCol+1].splice([curSecRow],0,[]);
      videoarea[curSecCol+1].splice([curSecRow],0,[]);
      this.setState({seclist:seclist,secNum:secNum+1,sectransform:sectransform,curSecCol:curSecCol+1,curSecRow:0,
      textlist:textlist,imagelist:imagelist,videolist:videolist,textarea:textarea,imagearea:imagearea,videoarea:videoarea});
      console.log("seclist",seclist);
    };
    addDownSlides(){
      let{seclist,secNum,currentSecindex,sectransform,curSecCol,curSecRow,textlist,imagelist,videolist,textarea,imagearea,videoarea} = this.state;
      sectransform[curSecCol][curSecRow][0]="translate(0,-1000px)";/*使当前幻灯片向上滑动*/
      /*sectransform[curSecCol][curSecRow][2]=0;*//*使当前幻灯片高度为0*/
      seclist[curSecCol].splice([curSecRow+1],0,"y");
      sectransform[curSecCol].splice([curSecRow+1],0,["translate(0,0)","100%","100%","block"]);
      textlist[curSecCol].splice([curSecRow+1],0,[]);
      imagelist[curSecCol].splice([curSecRow+1],0,[]);
      videolist[curSecCol].splice([curSecRow+1],0,[]);
      textarea[curSecCol].splice([curSecRow+1],0,[]);
      imagearea[curSecCol].splice([curSecRow+1],0,[]);
      videoarea[curSecCol].splice([curSecRow+1],0,[]);
      this.setState({seclist:seclist,secNum:secNum+1,sectransform:sectransform,curSecRow:curSecRow+1,
      textlist:textlist,imagelist:imagelist,videolist:videolist,textarea:textarea,imagearea:imagearea,videoarea:videoarea});
      console.log("seclist",seclist);


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
          const modal = Modal.success({
            title: "已经是最后一行了！目前在"+col+"列"+row+"行"});
          setTimeout(() => modal.destroy(), 1500);
        }
        break;
      case "navigator-down":
        if(seclist[curSecCol][curSecRow-1]=="y"){
        sectransform[curSecCol][curSecRow-1][0]="translate(0,0)";
        sectransform[curSecCol][curSecRow][0]="translate(0,1000px)";
        this.setState({sectransform:sectransform,curSecRow:curSecRow-1});
        }else{
          let col = curSecCol+1,row = curSecRow+1;
          const modal = Modal.success({
            title: "已经是第一行了！目前在"+col+"列"+row+"行",});
          setTimeout(() => modal.destroy(), 1500);
        }
        break;
      case "navigator-left":
        if(seclist[curSecCol+1] && seclist[curSecCol+1][curSecRow]=="y"){
        sectransform[curSecCol][curSecRow]=["translate(-2000px,0)",0,"100%"];
        sectransform[curSecCol+1][curSecRow]=["translate(0,0)","100%","100%"];
        this.setState({sectransform:sectransform,curSecCol:curSecCol+1});
      }else{
        let col = curSecCol+1,row = curSecRow+1;
        const modal = Modal.success({
          title: "已经是最后一列了！目前在"+col+"列"+row+"行"});
        setTimeout(() => modal.destroy(), 1500);
      }
        break;
      case "navigator-right":
        if(seclist[curSecCol-1] && seclist[curSecCol-1][curSecRow]=="y"){
        sectransform[curSecCol][curSecRow]=["translate(2000px,0)",0,"100%"];
        sectransform[curSecCol-1][curSecRow]=["translate(0,0)","100%","100%"];
        this.setState({sectransform:sectransform,curSecCol:curSecCol-1});
      }else{
        let col = curSecCol+1,row = curSecRow+1;
        const modal = Modal.success({
          title: "已经是第一列了！目前在"+col+"列"+row+"行"});
        setTimeout(() => modal.destroy(), 1500);
      }
        break;
      }
    }
    /*储存到本地*/
    storageSlides(){
      let {secId,slideslist,slidesIndex,sectransform,seclist,curSecRow,curSecCol} = this.state;
      let userid = localStorage.userid;
      if(curSecCol != 0 && curSecRow != 0 && seclist[curSecCol][curSecRow-1]=="y"){
        sectransform[curSecCol][curSecRow]=["translate(0,-1000px)","100%",0];
        sectransform[0][0]=["translate(0,0)","100%","100%"];
      }else if(curSecCol != 0 && curSecRow != 0 && seclist[curSecCol-1][curSecRow]=="y"){
        sectransform[curSecCol][curSecRow]=["translate(-2000px,0)",0,"100%"];
        sectransform[0][0]=["translate(0,0)","100%","100%"];
      }
      if(slideslist.length >   slidesIndex){
        let slidesJSON = {
          "seclist":this.state.seclist,
          "textlist":this.state.textlist,
          "imagelist":this.state.imagelist,
          "videolist":this.state.videolist,
          "textarea":this.state.textarea,
          "imagearea":this.state.imagearea,
          "videoarea":this.state.videoarea,
          "transform":this.state.transform,
          "sectransform":sectransform,
          "slidesName":this.state.curslidesName
        };
        slideslist[slidesIndex]=slidesJSON;
      }else if(slideslist.length==slidesIndex){
        let slidesName=prompt("请输入幻灯片的名字","Slides_01");
        let slidesJSON = {
          "seclist":this.state.seclist,
          "textlist":this.state.textlist,
          "imagelist":this.state.imagelist,
          "videolist":this.state.videolist,
          "textarea":this.state.textarea,
          "imagearea":this.state.imagearea,
          "videoarea":this.state.videoarea,
          "transform":this.state.transform,
          "sectransform":sectransform,
          "slidesName":slidesName
        };
        slideslist.push(slidesJSON);
        this.setState({curslidesName:slidesName});
      };
      let slideslistStr = JSON.stringify(slideslist);
      localStorage.setItem(userid,slideslistStr);
      this.setState({slideslist:slideslist});
      /*以下是用于测试的内容*/
      let localInfo = localStorage.getItem(userid);
      let jsonlocalInfo = JSON.parse(localInfo);

      var Slides = AV.Object.extend('Slides');
      var slides = new Slides();

      slides.set('userid', localStorage.userid);
      slides.set('slides', slideslistStr);
      slides.save().then(function (slides) {
        // 成功保存之后，执行其他逻辑.
      }, function (error) {
        // 异常处理
      });
        }
    showviwer(){
      this.setState({viewerDispaly:"block",contentEditable:"false"});
    }
    closeviwer(){
      this.setState({viewerDispaly:"none",contentEditable:"true"});
    }
    getTextContent(e){
        let {curSecCol,curSecRow,textlist,textareaKey}=this.state;
        textlist[curSecCol][curSecRow][textareaKey] = e.target.textContent;
        this.setState({textlist:textlist});
    }
    getTextareaPosition(e){
      let {curSecCol,curSecRow,textarea,textareaKey}=this.state;
      textarea[curSecCol][curSecRow][textareaKey][12] = e.target.parentNode.parentNode.style.transform;
      this.setState({textarea:textarea});
    }
    getTextareaSize(e){
      let {curSecCol,curSecRow,textarea,textareaKey}=this.state;
      textarea[curSecCol][curSecRow][textareaKey][13] = e.target.offsetHeight;
      textarea[curSecCol][curSecRow][textareaKey][14] = e.target.offsetWidth;
      this.setState({textarea:textarea});
    }
    getImageContent(e){
        let {curSecCol,curSecRow,imagelist,imageareaKey}=this.state;
        imagelist[curSecCol][curSecRow][imageareaKey] = e.target.src;
        this.setState({imagelist:imagelist});
    }
    getImagePosition(e){
      let {curSecCol,curSecRow,imagearea,imageareaKey}=this.state;
      imagearea[curSecCol][curSecRow][imageareaKey][6] = e.target.parentNode.parentNode.style.transform;
      this.setState({imagearea:imagearea});
    }
    getImageSize(e){
      let {curSecCol,curSecRow,imagearea,imageareaKey}=this.state;
      imagearea[curSecCol][curSecRow][imageareaKey][7] = e.target.offsetHeight;
      imagearea[curSecCol][curSecRow][imageareaKey][8] = e.target.offsetWidth;
      this.setState({imagearea:imagearea});
    }
    getVideoContent(e){
        let {curSecCol,curSecRow,videolist,videoareaKey}=this.state;
        videolist[curSecCol][curSecRow][videoareaKey] = e.target.src;
        this.setState({videolist:videolist});
    }
    getVideoPosition(e){
      let {curSecCol,curSecRow,videoarea,videoareaKey}=this.state;
      videoarea[curSecCol][curSecRow][videoareaKey][6] = e.target.parentNode.parentNode.style.transform;
      this.setState({videoarea:videoarea});
    }
    getVideoSize(e){
      let {curSecCol,curSecRow,videoarea,videoareaKey}=this.state;
      videoarea[curSecCol][curSecRow][videoareaKey][7] = e.target.offsetHeight;
      videoarea[curSecCol][curSecRow][videoareaKey][8] = e.target.offsetWidth;
      this.setState({videoarea:videoarea});
    }
    deleteText(e){
      let{textarea,textareaKey,textlist,curSecRow,curSecCol} = this.state;
      textlist[curSecCol][curSecRow].splice([textareaKey],1);
      textarea[curSecCol][curSecRow].splice([textareaKey],1);
      this.setState({textlist:textlist,textarea:textarea});
    }
    deleteSlides(e){
      let{seclist,secNum,currentSecindex,sectransform,curSecCol,curSecRow,textlist,imagelist,videolist,textarea,imagearea,videoarea} = this.state;

       if(seclist.length > 1 && seclist[curSecCol].length<=1){/*当前列只有一张幻灯片，删除当前幻灯片即删除当前列*/
        seclist.splice([curSecCol],1);
        sectransform.splice([curSecCol],1);
        textlist.splice([curSecCol],1);
        imagelist.splice([curSecCol],1);
        videolist.splice([curSecCol],1);
        textarea.splice([curSecCol],1);
        imagearea.splice([curSecCol],1);
        videoarea.splice([curSecCol],1);
        if(seclist.length>curSecCol&&seclist[curSecCol][curSecRow] == "y"){/*列数大于1,且总列数大于当前页码，则向后一列移动*/
          sectransform[curSecCol][curSecRow][0]="translate(0,0)";
        }else if(seclist[curSecCol-1][curSecRow] && seclist[curSecCol-1][curSecRow] == "y"){
          sectransform[curSecCol-1][curSecRow][0]="translate(0,0)";
          curSecCol=curSecCol-1;
        }
      }else if(seclist.length >= 1 && seclist[curSecCol].length > 1){
        seclist[curSecCol].splice([curSecRow],1);
        sectransform[curSecCol].splice([curSecRow],1);
        textlist[curSecCol].splice([curSecRow],1);
        imagelist[curSecCol].splice([curSecRow],1);
        videolist[curSecCol].splice([curSecRow],1);
        textarea[curSecCol].splice([curSecRow],1);
        imagearea[curSecCol].splice([curSecRow],1);
        videoarea[curSecCol].splice([curSecRow],1);
        if(seclist[curSecCol][curSecRow] == "y"){
          sectransform[curSecCol][curSecRow][0]="translate(0,0)";
        }else if(seclist[curSecCol][curSecRow-1] == "y"){
          sectransform[curSecCol][curSecRow-1][0]="translate(0,0)";
          curSecRow=curSecRow-1;
        }
      }else if(seclist.length == 1 && seclist[curSecCol].length == 1){/*当前只有一张幻灯片，删除后则为空白*/
        seclist[curSecCol].splice([curSecRow],1,"y");
        sectransform[curSecCol].splice([curSecRow],["translate(0,0)","100%","100%","block"]);
        textlist[curSecCol].splice([curSecRow],1,[]);
        imagelist[curSecCol].splice([curSecRow],1,[]);
        videolist[curSecCol].splice([curSecRow],1,[]);
        textarea[curSecCol].splice([curSecRow],1,[]);
        imagearea[curSecCol].splice([curSecRow],1,[]);
        videoarea[curSecCol].splice([curSecRow],1,[]);
      }
      console.log("seclist",seclist);

      this.setState({seclist:seclist,secNum:secNum+1,sectransform:sectransform,curSecRow:curSecRow,curSecCol:curSecCol,
      textlist:textlist,imagelist:imagelist,videolist:videolist,textarea:textarea,imagearea:imagearea,videoarea:videoarea});
    }
    clearslides(){
      let {slidesIndex} = this.state;
      this.setState({count:0,textlist:[[[]]],imageCount:0,imagelist:[[[]]],videoCount:0,videolist:[[[]]],textareaKey:0,
      textarea:[[[]]],imageareaKey:0,imagearea:[[[]]],videoareaKey:0,videoarea:[[[]]],imageObjectList:[],
      videoObjectList:[],seclist:[["y"]],secNum:0,curSecRow:0,curSecCol:0,
      sectransform:[[["translate(0,0)","100%","100%","block"]],],slidesIndex:slidesIndex+1});
    }
    deleteAllSlides(){
      let {slideslist,slidesIndex} = this.state;
      let del=confirm("确定要删除该幻灯片吗？");
      if(del == true){
        this.clearslides();
        slideslist[slidesIndex]?slideslist.splice(slidesIndex,1):"";
        this.setState({slideslist:slideslist});
        this.storageSlides();
      }
    };
    newSlides(){
      let {slideslist,slidesIndex,nextslidesIndex} = this.state;
    /*  let storage = confirm("是否需要保存当前幻灯片？");
      if(storage == false){*/
        /*this.clearslides();
       slideslist[slidesIndex]?slideslist.splice(slidesIndex,1):"";
        if(slideslist.length == slidesIndex + 1){
          nextslidesIndex = parseInt(slidesIndex) + 1;
        }else if(slideslist.length == slidesIndex){
          nextslidesIndex = parseInt(slidesIndex);
        }
        this.setState({slideslist:slideslist});
      }else if(storage == true){*/
        this.storageSlides();
        nextslidesIndex = parseInt(slidesIndex)+1;/*
        this.clearslides();
        this.setState({slidesIndex:slidesIndex+1});*/
      /*}*/
      this.setState({nextslidesIndex:nextslidesIndex});
    }
render(){
   let {imagearea,imageareaKey,imagelist} = this.state;
   let {videoarea,videoareaKey,videolist} = this.state;
   let {textarea,textareaKey,textlist}=this.state;
   let {curSecCol,curSecRow}=this.state;
   let {sectransform,seclist,slidesIndex} = this.state;

   let showSeclist = seclist ?
    seclist.map((secCol,colindex)=>{
      let secCollist=[] ;
    for(let rowindex=0;rowindex<secCol.length;rowindex++){

      let showTextlist = textlist[colindex][rowindex] ?
        textlist[colindex][rowindex].map((text,tindex)=>(
          <PCEditorTextarea key={tindex} textkey={tindex}
          contentEditable={this.state.contentEditable}
          getTextareaKey = {this.getTextareaKey.bind(this)}
          getTextContent = {this.getTextContent.bind(this)}
          getTextareaPosition={this.getTextareaPosition.bind(this)}
          getTextareaSize={this.getTextareaSize.bind(this)}
          textarea={textarea[colindex][rowindex][tindex]} count = {tindex} text={text}
          showTextSider={this.showTextSider.bind(this)}/>
         ))
           :
           "";
       let showImagelist = imagelist[colindex][rowindex] ?
       imagelist[colindex][rowindex].map((image,index)=>(
         <PCEditorImagearea key={index} imagekey={index}
         image = {image}
         getImageContent = {this.getImageContent.bind(this)}
         getImagePosition={this.getImagePosition.bind(this)}
         getImageSize={this.getImageSize.bind(this)}
         getImageareaKey = {this.getImageareaKey.bind(this)}
         imagearea={imagearea[colindex][rowindex][index]}
         count = {index}
         showImageSider={this.showImageSider.bind(this)}/>
        ))
          :
          "";
      let showVideolist = videolist[colindex][rowindex] ?
      videolist[colindex][rowindex].map((video,index)=>{
        return(
        <PCEditorVideoarea key={index} videokey={index}
        video = {video}
        getVideoContent = {this.getVideoContent.bind(this)}
        getVideoPosition={this.getVideoPosition.bind(this)}
        getVideoSize={this.getVideoSize.bind(this)}
        getVideoareaKey = {this.getVideoareaKey.bind(this)}
        videoarea={videoarea[colindex][rowindex][index]} count = {index}
        showVideoSider={this.showVideoSider.bind(this)}/>
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
       autoFocus="autofocus" src={image}/>
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
       <source src={video}  type="video/mp4"/>
       <source src={video}  type="video/ogg"/>
       <source src={video}  type="video/webm"/>
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
    return (
        <div>
        <PCHeader/>
            <Layout>
              <Sider class="sider" width="80" style={{ overflow: "scroll", height: "90vh", position:"fixed", left: 0 }}>
                    <Button htmlType="button" id="tool-btn1" title="预览" onClick={this.showviwer.bind(this)}>
                      <Icon class="tool-icon" type="scan" />
                    </Button>
                    {/*<Button htmlType="button" id="tool-btn2" title="撤销">
                      <Icon class="tool-icon" type="rollback" />
                    </Button>*/}
                    <Button htmlType="button" id="tool-btn5" title="删除" onClick={this.deleteAllSlides.bind(this)}>
                      <Icon class="tool-icon" type="delete" />
                    </Button>
                    <Link target="_self" to={`/editor/${this.state.nextslidesIndex}`}>
                    <Button htmlType="button" id="tool-btn6" title="新建幻灯片" onClick={this.newSlides.bind(this)}>
                      <Icon class="tool-icon" type="plus" />
                    </Button>
              			</Link>
                    {/*<Button htmlType="button" id="tool-btn7" title="设置">
                      <Icon class="tool-icon" type="setting" />
                    </Button>*/}
                    <Link target="_blank" to={`/player/${this.state.curslidesIndex}`}>
                    <Button htmlType="button" id="tool-btn4" title="播放">
                      <Icon class="tool-icon" type="caret-right" />
                    </Button>
                    </Link>
                    <Button htmlType="button" id="tool-btn3" title="保存" onClick={this.storageSlides.bind(this)}>
                      <Icon class="tool-icon" type="save" />
                    </Button>
              </Sider>
              <Sider class="sider" id="func-menu" width="210" style={{ display:this.state.originSider,opacity:this.state.originSiderop, overflow: "scroll", height: "90vh", position: "fixed", left: 80,transition: "opacity 0.5s linear"}}>
                <Button htmlType="button" id="text" title="添加文本"  onClick={this.showtext.bind(this)}>
                  <Icon class="tool-icon" type="file-text" />
                </Button>

                <form>
                  <input id="image" type="file" accept="image/png,image/jpeg,image/gif,image/jpg"
                  onClick={this.showimage.bind(this)} onChange={this.uploadImage.bind(this)}/>
                  <input id="video" type="file" accept="video/mp4,video/ogg,video/webm" onClick={this.showvideo.bind(this)} onChange={this.uploadVideo.bind(this)}/>
                </form>
                <Button htmlType="button" id="deleteSlide" title="删除当前幻灯片"  onClick={this.deleteSlides.bind(this)}>
                  <Icon class="tool-icon" type="delete" />
                </Button>
              </Sider>
              <Sider class="sider" id="text-menu" width="210" style={{display:this.state.textSider,opacity:this.state.textSiderop, overflow: "scroll", height: "90vh", position: "fixed", left: 80,transition:"opacity 0.5s linear", }}>
                  <PCEditorTextsidebar
                  showOriginSider={this.showOriginSider.bind(this)}
                  getTextAlignKey={this.getTextAlignKey.bind(this)}
                  fontSizeChange={this.fontSizeChange.bind(this)}
                  lineheightChange={this.lineheightChange.bind(this)}
                  letterSpacingChange={this.letterSpacingChange.bind(this)}
                  rotationChange={this.rotationChange.bind(this)}
                  borderWidthChange={this.borderWidthChange.bind(this)}
                  borderRadiusChange={this.borderRadiusChange.bind(this)}
                  borderStyleChange={this.borderStyleChange.bind(this)}
                  textColorChange={this.textColorChange.bind(this)}
                  borderColorChange={this.borderColorChange.bind(this)}
                  backgroundColorChange={this.backgroundColorChange.bind(this)}
                  deleteText={this.deleteText.bind(this)}
                  />
              </Sider>
              <Sider class="sider" id="image-menu" width="200" style={{display:this.state.imagesSider,opacity:this.state.imagesSiderop, overflow: "scroll", height: "90vh", position: "fixed", left: 80 ,transition: "opacity 0.5s linear",}}>
                <PCEditorImagesidebar
                showOriginSider={this.showOriginSider.bind(this)}
                irotationChange={this.irotationChange.bind(this)}
                iopacityChange={this.iopacityChange.bind(this)}
                iborderWidthChange={this.iborderWidthChange.bind(this)}
                iborderRadiusChange={this.iborderRadiusChange.bind(this)}
                iborderColorChange={this.iborderColorChange.bind(this)}
                imageObjectList={this.state.imageObjectList}
                />
              </Sider>
              <Sider class="sider" id="video-menu" width="200" style={{display:this.state.videoSider,opacity:this.state.videoSiderop, overflow: "scroll", height: "90vh", position: "fixed", left: 80,transition:"opacity 0.5s linear", }}>
                <PCEditorVideosidebar
                showOriginSider={this.showOriginSider.bind(this)}
                vrotationChange={this.vrotationChange.bind(this)}
                vopacityChange={this.vopacityChange.bind(this)}
                vborderWidthChange={this.vborderWidthChange.bind(this)}
                vborderRadiusChange={this.vborderRadiusChange.bind(this)}
                vborderColorChange={this.vborderColorChange.bind(this)}/>
              </Sider>
              <Content style={{position:"fixed",overflow:"hidden", left:300,width:"74%",height:"90%",margin: "0 16px",backgroundColor:"#ddd", padding: 0, minHeight: 280 }}>

                  <div id="slides" style={{margin:"auto",backgroundColor:"#fff",margin:"10px auto",width:"98%",height:"98%",overflow:"visible",position:"relative"}}>
                    {showSeclist}
                  </div>
                  <aside class="control" style={{position:"absolute",right:0,bottom:0}}>
                    <Button id="navigator-up" htmlType="button"  onClick={this.navigatorDre.bind(this)}><Icon type="up" /></Button>
                    <Button id="navigator-down" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="down" /></Button>
                    <Button id="navigator-left" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="left" /></Button>
                    <Button id="navigator-right" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="right" /></Button>
                  </aside>
                  <Button class="add-slides" htmlType="button" onClick={this.addRightSlides.bind(this)} style={{position:"absolute",height:"50px",width:"50px",padding:0,boxSizing:"border-box",border:"none",top:"50%",right:0,fontSize:50,textarea:"center",background:"none"}}><Icon type="plus-circle-o"/></Button>
                  <Button class="add-slides" htmlType="button" onClick={this.addDownSlides.bind(this)} style={{position:"absolute",height:"50px",width:"50px",padding:0,boxSizing:"border-box",border:"none",bottom:0,left:"50%",fontSize:50,textarea:"center",background:"none"}}><Icon type="plus-circle-o" /></Button>
                  <Button class="deleteslides"><Icon type="delete" /></Button>
              </Content>
            </Layout>
            <div id="viewer" style={{position:"absolute",overflow:"hidden",margin:0,padding:0,top:0,left:0,right:0,bottom:0,background:"#a0a0a0",display:this.state.viewerDispaly}}>
              <div id="slides" style={{margin:"auto",overflow:"hidden",backgroundColor:"#fff",margin:"30px auto",width:"72%",height:"90%",position:"relative"}}>
                {showSlideslist}
              </div>
              <aside class="control" style={{position:"absolute",right:0,bottom:0}}>
                <Button id="navigator-up" htmlType="button"  style={{background:"none",border:"none",display:"inline"}} onClick={this.navigatorDre.bind(this)}><Icon type="up" /></Button>
                <Button id="navigator-left" htmlType="button" style={{background:"none",border:"none"}}  onClick={this.navigatorDre.bind(this)} ><Icon type="left" /></Button>
                <Button id="navigator-right" htmlType="button" style={{background:"none",border:"none"}}  onClick={this.navigatorDre.bind(this)} ><Icon type="right" /></Button>
                <Button id="navigator-down" htmlType="button" style={{background:"none",border:"none",display:"inline"}}  onClick={this.navigatorDre.bind(this)} ><Icon type="down" /></Button>
              </aside>
              <Button class="close" htmlType="button" onClick={this.closeviwer.bind(this)} style={{position:"absolute",height:"50px",width:"50px",padding:0,boxSizing:"border-box",border:"none",top:"2%",right:0,fontSize:50,textAlign:"center",background:"none"}}><Icon type="close" /></Button>
            </div>
            </div>

    );
  }
}
