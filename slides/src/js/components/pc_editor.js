import React from 'react';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Upload,
} from 'antd';
require(`../../css/pc_editor.css`);
const { Footer,Content,Sider } = Layout;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCEditorTextsidebar from './pc_editor_textsidebar';
import PCEditorImagesidebar from './pc_editor_imagesidebar';
import PCEditorVideosidebar from './pc_editor_videosidebar';
import PCEditorTextarea from './pc_editor_textarea';
import PCEditorImagearea from './pc_editor_imagearea';
import PCEditorVideoarea from './pc_editor_videoarea';
import PCPlayer from './pc_player';
export default class PCEditor extends React.Component{
  constructor(){
		super();
		this.state = {
      originSider: 'visible',/*选择添加类型菜单条*/
      originSiderop:1,
      textSider: 'hidden',/*文本编辑工具条*/
      textSiderop:0,
      imagesSider: 'hidden',/*图片编辑工具条*/
      imagesSiderop:0,
      videoSider: 'hidden',/*视频编辑工具条*/
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
      seclist:[['y']],//幻灯片队列
      secNum:0,
      curSecRow:0,
      curSecCol:0,
      sectransform:[[['translate(0,0)','100%','100%','block']],],
		};
	};



  /*展示工具条o*/
  showOriginSider(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      originSider:'visible',
      originSiderop:1,
      textSider: 'hidden',/*文本编辑工具条*/
      textSiderop:0,
      imagesSider: 'hidden',/*图片编辑工具条*/
      imagesSiderop:0,
      videoSider: 'hidden',/*视频编辑工具条*/
      videoSiderop:0,
    });
  }

  showTextSider(e){
    this.setState({
      textSider:'visible',
      textSiderop:1,
      originSider: 'hidden',
      originSiderop:0,
      imagesSider: 'hidden',
      imagesSiderop:0,
      videoSider: 'hidden',
      videoSiderop:0,
    });
  }
  showImageSider(e){
    this.setState({
      imagesSider:'visible',
      imagesSiderop:1,
      originSider: 'hidden',
      originSiderop:0,
      textSider: 'hidden',
      textSiderop:0,
      videoSider: 'hidden',
      videoSiderop:0,
    });
  }
  showVideoSider(e){
    this.setState({
      videoSider:'visible',
      videoSiderop:1,
      originSider: 'hidden',
      originSiderop:0,
      textSider: 'hidden',
      textSiderop:0,
      imagesSider: 'hidden',
      imagesSiderop:0,
    });
  }
/************************************************************************/
/*文本编辑*/

  /*新建文本框o*/
  addTextarea(e){
     let {textlist,count,textarea,curSecCol,curSecRow} = this.state;
     let style = ["left",16,1,2,"#000","#fff",0,1,0,"solid","#000",4];
     textarea[curSecCol][curSecRow].push(style);
     textlist[curSecCol][curSecRow].push(count);
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
    let imagelist = this.state.imagelist;
    let count = this.state.imageCount;
    let imagearea = this.state.imagearea;
    let style = [0,10,0,0,"solid","#000"];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    imagearea[curSecCol][curSecRow].push(style);
    imagelist[curSecCol][curSecRow].push(count);
    this.setState({imagelist:imagelist,imageCount:count+1,imagearea:imagearea});
    }
    /*image upload*/
    uploadImage({ file, fileList }){
      let imageObjectList = this.state.imageObjectList;/*
      let url = file.url;
      imageObjectList.push(url);*/
      console.log(file,fileList);/*
      this.setState(imageObjectList:imageObjectList);
      if (file.status !== 'uploading') {
    }*/
  }

  showimage(e){
   this.showImageSider(e);
   this.addImage(e);
 }
 /*新增视频*/
 addVideo(e){
    let {curSecCol,curSecRow}=this.state;
    let videolist = this.state.videolist;
    let count = this.state.videoCount;
    let videoarea = this.state.videoarea;
    let style = [0,10,0,0,"solid","#000"];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    videoarea[curSecCol][curSecRow].push(style);
    videolist[curSecCol][curSecRow].push(count);
    this.setState({videolist:videolist,videoCount:count+1,videoarea:videoarea});
    }
  uploadVideo({ file, fileList }){
    let videoObjectList = this.state.videoObjectList;
    let url = file.url;/*
    videoObjectList.push(url);
    this.setState(videoObjectList:videoObjectList)*/
    console.log(file,fileList);
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
    '';
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
      console.log(e);
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
      '';
    }
    /*新建幻灯片*/
    addRightSlides(){
      let{seclist,secNum,currentSecindex,sectransform,secHead,curSecRow,curSecCol,textlist,imagelist,videolist,textarea,imagearea,videoarea} = this.state;
      let row = curSecRow;
      sectransform[curSecCol][curSecRow][0]='translate(-2000px,0)';/*使当前幻灯片向左滑动*/
      /*sectransform[curSecCol][curSecRow][3]='none';*/
      /*sectransform[curSecCol][curSecRow][1]=0;*//*使当前幻灯片宽度为0*/
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
      seclist[curSecCol+1].splice([curSecRow],0,'y');
      sectransform[curSecCol+1].splice([curSecRow],0,['translate(0,0)','100%','100%','block']);
      textlist[curSecCol+1].splice([curSecRow],0,[]);
      imagelist[curSecCol+1].splice([curSecRow],0,[]);
      videolist[curSecCol+1].splice([curSecRow],0,[]);
      textarea[curSecCol+1].splice([curSecRow],0,[]);
      imagearea[curSecCol+1].splice([curSecRow],0,[]);
      videoarea[curSecCol+1].splice([curSecRow],0,[]);
      console.log('seclist:',seclist,'curSecRow',curSecRow,'curSecCol',curSecCol,'textlist',textlist);
      this.setState({seclist:seclist,secNum:secNum+1,sectransform:sectransform,curSecCol:curSecCol+1,curSecRow:0,
      textlist:textlist,imagelist:imagelist,videolist:videolist,textarea:textarea,imagearea:imagearea,videoarea:videoarea});
    };
    addDownSlides(){
      let{seclist,secNum,currentSecindex,sectransform,secHead,curSecCol,curSecRow,textlist,imagelist,videolist,textarea,imagearea,videoarea} = this.state;
      sectransform[curSecCol][curSecRow][0]='translate(0,-1000px)';/*使当前幻灯片向上滑动*/
      sectransform[curSecCol][curSecRow][3]='none';
      /*sectransform[curSecCol][curSecRow][2]=0;*//*使当前幻灯片高度为0*/
      seclist[curSecCol].splice([curSecRow+1],0,'y');
      sectransform[curSecCol].splice([curSecRow+1],0,['translate(0,0)','100%','100%','block']);
      textlist[curSecCol].splice([curSecRow+1],0,[]);
      imagelist[curSecCol].splice([curSecRow+1],0,[]);
      videolist[curSecCol].splice([curSecRow+1],0,[]);
      textarea[curSecCol].splice([curSecRow+1],0,[]);
      imagearea[curSecCol].splice([curSecRow+1],0,[]);
      videoarea[curSecCol].splice([curSecRow+1],0,[]);
      console.log('seclist:',seclist,'curSecRow',curSecRow,'curSecCol',curSecCol,'textlist',textlist);
      this.setState({seclist:seclist,secNum:secNum+1,sectransform:sectransform,curSecRow:curSecRow+1,
      textlist:textlist,imagelist:imagelist,videolist:videolist,textarea:textarea,imagearea:imagearea,videoarea:videoarea});

    };
    navigatorDre(e){
      let {seclist,sectransform,curSecCol,curSecRow} = this.state;
      switch(e.target.id)
      {
      case "navigator-up":
        if(seclist[curSecCol][curSecRow+1]=='y'){
          sectransform[curSecCol][curSecRow][0]='translate(0,-1000px)';
          sectransform[curSecCol][curSecRow+1][0]='translate(0,0)';
          this.setState({sectransform:sectransform,curSecRow:curSecRow+1});
        }else{
          alert("已经是最后一行了！")
        }
        break;
      case "navigator-down":
        if(seclist[curSecCol][curSecRow-1]=='y'){
        sectransform[curSecCol][curSecRow-1][0]='translate(0,0)';
        sectransform[curSecCol][curSecRow][0]='translate(0,1000px)';
        this.setState({sectransform:sectransform,curSecRow:curSecRow-1});
        }else{
          alert("已经是第一行了！")
        }
        break;
      case "navigator-left":
        if(seclist[curSecCol+1] && seclist[curSecCol+1][curSecRow]=='y'){
        sectransform[curSecCol][curSecRow]=['translate(-2000px,0)',0,'100%'];
        sectransform[curSecCol+1][curSecRow]=['translate(0,0)','100%','100%'];
        this.setState({sectransform:sectransform,curSecCol:curSecCol+1});
      }else{
        alert("已经是最后一列了！")
      }
        break;
      case "navigator-right":
        if(seclist[curSecCol-1] && seclist[curSecCol-1][curSecRow]=='y'){
        sectransform[curSecCol][curSecRow]=['translate(2000px,0)',0,'100%'];
        sectransform[curSecCol-1][curSecRow]=['translate(0,0)','100%','100%'];
        this.setState({sectransform:sectransform,curSecCol:curSecCol-1});
      }else{
        alert("已经是第一列了！")
      }
        break;
      }
    }
    /*储存*/
    storageSlides(){
      localStorage.textlist = this.state.seclist;
      localStorage.textlist = this.state.textlist;
      localStorage.imagelist = this.state.imagelist;
      localStorage.videolist = this.state.videolist;
      localStorage.textarea = this.state.textarea;
      localStorage.imagearea = this.state.imagearea;
      localStorage.videoarea = this.state.videoarea;
      localStorage.transform = this.state.transform;
      console.log(localStorage);
    }
    /*从当前幻灯片开始演示*/
    fromCurSlide(){

    }
render(){
   let {imagearea,imageareaKey,imagelist,imageObjectList,videoObjectList} = this.state;
   let {videoarea,videoareaKey,videolist} = this.state;
   let {textarea,textareaKey,textlist}=this.state;
   let {curSecCol,curSecRow}=this.state;
   let {sectransform,seclist,secHead,secpre} = this.state;
   const props = {
     action: '',
     headers: {
       "Access-Control-Allow-Origin":"*"
     },
     listType: 'picture',
     onChange: (file,fileList)=>{
       console.log('file',file,'fileList',fileList);
     }
    };
   let showSeclist = seclist ?
    seclist.map((secCol,colindex)=>{
      let secCollist=[] ;
    for(let rowindex=0;rowindex<secCol.length;rowindex++){

      let showTextlist = textlist[colindex][rowindex] ?
        textlist[colindex][rowindex].map((text,tindex)=>(
          <PCEditorTextarea key={tindex} textkey={tindex}
          getTextareaKey = {this.getTextareaKey.bind(this)}
          textarea={textarea[colindex][rowindex][tindex]} count = {tindex}
          showTextSider={this.showTextSider.bind(this)}/>
         ))
           :
           '';
       let showImagelist = imagelist[colindex][rowindex] ?
       imagelist[colindex][rowindex].map((image,index)=>(
         <PCEditorImagearea key={index} imagekey={index}
         getImageareaKey = {this.getImageareaKey.bind(this)}
         imagearea={imagearea[colindex][rowindex][index]} count = {index}
         imageObjectList={imageObjectList}
         showImageSider={this.showImageSider.bind(this)}/>
        ))
          :
          '';
      let showVideolist = videolist[colindex][rowindex] ?
      videolist[colindex][rowindex].map((video,index)=>{
        return(
        <PCEditorVideoarea key={index} videokey={index}
        getVideoareaKey = {this.getVideoareaKey.bind(this)}
        videoarea={videoarea[colindex][rowindex][index]} count = {index}
        videoObjectList={videoObjectList}
        showVideoSider={this.showVideoSider.bind(this)}/>
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
    return (
        <div>
        <PCHeader/>
            <Layout>
              <Sider class="sider" width="80" style={{ overflow: 'scroll', height: '90vh', position:'fixed', left: 0 }}>
                    <Button htmlType="button" id="tool-btn1" title="预览">
                      <Icon class="tool-icon" type="scan" />
                    </Button>
                    <Button htmlType="button" id="tool-btn2" title="撤销">
                      <Icon class="tool-icon" type="rollback" />
                    </Button>
                    <Button htmlType="button" id="tool-btn3" title="保存" onClick={this.storageSlides.bind(this)}>
                      <Icon class="tool-icon" type="save" />
                    </Button>
                    <Link target="_blank" to={`/player`}>
                    <Button htmlType="button" id="tool-btn4" title="播放">
                      <Icon class="tool-icon" type="caret-right" />
                    </Button>
                    </Link>
                    <Button htmlType="button" id="tool-btn5" title="删除">
                      <Icon class="tool-icon" type="delete" />
                    </Button>
                    <Button htmlType="button" id="tool-btn6" title="设置">
                      <Icon class="tool-icon" type="setting" />
                    </Button>
              </Sider>
              <Sider class="sider" id="func-menu" width="210" style={{ visibility:this.state.originSider,opacity:this.state.originSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80,transition: 'opacity 0.5s linear'}}>
                <Button htmlType="button" id="text" title="添加文本"  onClick={this.showtext.bind(this)}>
                  <Icon class="tool-icon" type="file-text" />
                </Button>
                <Upload {...props}>
                <Button htmlType="button" id="images" title="添加图片"  onClick={this.showimage.bind(this)}>
                    <Icon class="tool-icon" type="picture" />
                </Button>
                </Upload>
                <Upload
                accept="vedio"
                action= ''
                onChange={this.uploadVideo.bind(this)}>
                <Button htmlType="button" id="video" title="添加视频" onClick={this.showvideo.bind(this)}>
                    <Icon class="tool-icon" type="video-camera" />
                </Button>
                </Upload>
              </Sider>
              <Sider class="sider" id="text-menu" width="210" style={{visibility:this.state.textSider,opacity:this.state.textSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
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
                  />
              </Sider>
              <Sider class="sider" id="image-menu" width="200" style={{visibility:this.state.imagesSider,opacity:this.state.imagesSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80 ,transition: 'opacity 0.5s linear',}}>
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
              <Sider class="sider" id="video-menu" width="200" style={{visibility:this.state.videoSider,opacity:this.state.videoSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
                <PCEditorVideosidebar
                showOriginSider={this.showOriginSider.bind(this)}
                vrotationChange={this.vrotationChange.bind(this)}
                vopacityChange={this.vopacityChange.bind(this)}
                vborderWidthChange={this.vborderWidthChange.bind(this)}
                vborderRadiusChange={this.vborderRadiusChange.bind(this)}
                vborderColorChange={this.vborderColorChange.bind(this)}/>
              </Sider>
              <Content style={{position:'fixed',overflow:'hidden', left:300,width:"74%",height:"90%",margin: '0 16px',backgroundColor:"#ddd", padding: 0, minHeight: 280 }}>

                  <div id="slides" style={{margin:'auto',backgroundColor:"#fff",margin:'10px auto',width:"98%",height:"98%",overflow:"visible",position:"relative"}}>
                    {showSeclist}
                  </div>
                  <aside class="control" style={{position:'absolute',right:0,bottom:0}}>
                    <Button id="navigator-up" htmlType="button"  onClick={this.navigatorDre.bind(this)}><Icon type="up" /></Button>
                    <Button id="navigator-down" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="down" /></Button>
                    <Button id="navigator-left" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="left" /></Button>
                    <Button id="navigator-right" htmlType="button"  onClick={this.navigatorDre.bind(this)} ><Icon type="right" /></Button>
                  </aside>
                  <Button class="add-slides" htmlType="button" onClick={this.addRightSlides.bind(this)} style={{position:'absolute',height:'50px',width:'50px',padding:0,boxSizing:'border-box',border:'none',top:'50%',right:0,fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o"/></Button>
                  <Button class="add-slides" htmlType="button" onClick={this.addDownSlides.bind(this)} style={{position:'absolute',height:'50px',width:'50px',padding:0,boxSizing:'border-box',border:'none',bottom:0,left:'50%',fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o" /></Button>

              </Content>
            </Layout>
            </div>

    );
  }
}
