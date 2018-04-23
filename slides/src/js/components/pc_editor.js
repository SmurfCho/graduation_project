import React from 'react';
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
let sectionIndex = 0;
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
      sectionlist:[],/*幻灯片队列*/
      count:0,/*文本框数*/
      textlist:[],/*文本框队列,保存文字内容*/
      imageCount:0,
      imagelist:[],/*图片框队列，保存图片url*/
      videoCount:0,
      videolist:[],/*视频框队列，保存视频URL*/
      /*textAlign:[],//以下是文本框编辑参数 fontSize:[],lineHeight:[],letterSpacing:3,textColor:4,backgroundColor:5,  rotation:6,borderWidth:7,borderRadius:8,borderStyle:9,borderColor:10,textpadding:11,*/
      textareaKey:0,//section中被点击的textarea的key
      textarea:[[]],//文本样式队列
      imageareaKey:0,
      imagearea:[],//图片样式队列
      videoareaKey:0,
      videoarea:[],//视频样式队列
      imageObjectList: [],//图片list
      videoObjectList:[],

      sectionlist:[1],//幻灯片队列
      sectionpre:1,
      currentSectionindex:[],//当前幻灯片索引
      sectiontransform:['translate(0,0)'],
      sectionHead:[{headdown:0,headup:0,headleft:0,headright:0}],
      testkey:0
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
     let textlist = this.state.textlist;
     let count = this.state.count;
     let textarea = this.state.textarea;
     let style = ["left",16,1,2,"#000","#fff",0,1,0,"solid","#000",4];
     textarea[sectionIndex].push(style);
     textlist.push(count);
     this.setState({textlist:textlist,count:count+1,textarea:textarea});
     }
   /*新增文本框并显示文本编辑工具条*/
 showtext(e){
   this.showTextSider(e);
   this.addTextarea(e);
 }

 /*新增图片*/
 addImage(e){
    let imagelist = this.state.imagelist;
    let count = this.state.imageCount;
    let imagearea = this.state.imagearea;
    let style = [0,1,0,0,"solid","#000"];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    imagearea.push(style);
    imagelist.push(count);
    this.setState({imagelist:imagelist,imageCount:count+1,imagearea:imagearea});
    }
    /*image upload*/
    uploadImage({ file, fileList }){
      let imageObjectList = this.state.imageObjectList;
      let url = file.url;
      imageObjectList.push(url);
      this.setState(imageObjectList:imageObjectList)
      if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  }

  showimage(e){
   this.showImageSider(e);
   this.addImage(e);
 }
 /*新增视频*/
 addVideo(e){
    let videolist = this.state.videolist;
    let count = this.state.videoCount;
    let videoarea = this.state.videoarea;
    let style = [0,1,0,0,"solid","#000"];/*rotation,opacity,borderWidth,borderRadius,borderStyle,borderColor*/
    videoarea.push(style);
    videolist.push(count);
    this.setState({videolist:videolist,videoCount:count+1,videoarea:videoarea});
    }
  uploadVideo({ file, fileList }){
    let videoObjectList = this.state.videoObjectList;
    let url = file.url;
    videoObjectList.push(url);
    this.setState(videoObjectList:videoObjectList)
    if (file.status !== 'uploading') {
    console.log(file, fileList);
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
    this.setState({textareaKey:key});
  }
  /*编辑文本alighment0*/
  getTextAlignKey(e){
    let textarea = this.state.textarea[sectionIndex],textareaKey = this.state.textareaKey;
    switch(e.target.value)
    {
    case "left":
      textarea[textareaKey][0] = "left";
      this.setState({textarea:textarea});
      break;
    case "right":
      textarea[textareaKey][0] = "right";
      this.setState({textarea:textarea});
      break;
    case "center":
      textarea[textareaKey][0] = "center";
      this.setState({textarea:textarea});
      break;
    case "justify":
      textarea[textareaKey][0] = "justify";
      this.setState({textarea:textarea});
      break;
    };
  };
    /*文字大小*/
    fontSizeChange(e){
      let textarea=this.state.textarea,textareaKey = this.state.textareaKey;
      if(textarea[sectionIndex][textareaKey]){
      textarea[sectionIndex][textareaKey][1]=e;
      this.setState({textarea:textarea});}

    }
    /*行高*/
    lineheightChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][2]=e;
      this.setState({textarea:textarea});
    }
    /*letterSpacing*/
    letterSpacingChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][3]=e;
      this.setState({textarea:textarea});
    }
    /*旋转*/
    rotationChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][6]=e;
      this.setState({textarea:textarea});
    }
    /*边框宽度*/
    borderWidthChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][7]=e;
      this.setState({textarea:textarea});
    }
    /*边框角圆*/
    borderRadiusChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][8]=e;
      this.setState({textarea:textarea});
    }
    textColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][4]=color.hex;
      this.setState({textarea:textarea});
    };
    backgroundColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][5]=color.hex;
      this.setState({textarea:textarea});
    };
    borderColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[sectionIndex][textareaKey][10]=color.hex;
      this.setState({textarea:textarea});
    };
    /*图片样式*/
    /*获得当前焦点*/
    getImageareaKey(e){
      let key = parseInt(e.target.id);
      this.setState({imageareaKey:key});
    }
    /*旋转*/
    irotationChange(e){
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[imageareaKey][0]=e;
      this.setState({imagearea:imagearea});
    }
    /*边框宽度*/
    iborderWidthChange(e){
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[imageareaKey][2]=e;
      this.setState({imagearea:imagearea});
    }
    /*边框角圆*/
    iborderRadiusChange(e){
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[imageareaKey][3]=e;
      this.setState({imagearea:imagearea});
    }
    iborderColorChange(color){
      let imagearea = this.state.imagearea,imageareaKey = this.state.imageareaKey;
      imagearea[imageareaKey][5]=color.hex;
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
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[videoareaKey][0]=e;
      this.setState({videoarea:videoarea});
    }
    /*边框宽度*/
    vborderWidthChange(e){
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[videoareaKey][2]=e;
      this.setState({videoarea:videoarea});
    }
    /*边框角圆*/
    vborderRadiusChange(e){
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[videoareaKey][3]=e;
      this.setState({videoarea:videoarea});
    }
    vborderColorChange(color){
      let videoarea = this.state.videoarea,videoareaKey = this.state.videoareaKey;
      videoarea[videoareaKey][5]=color.hex;
      this.setState({videoarea:videoarea});
    };

    /*新建幻灯片*/
    newPage(head){

    }
    addRightSlides(){
      newPage("right");
    };
    addDownSlides(){
      newPage("down");
    };


render(){
  let textarea = this.state.textarea;
  let textareaKey = this.state.textareaKey;
  let currentTextStyle = textarea[textareaKey];
  let textlist = this.state.textlist;
  let showTextlist = textlist ?
  textlist.map((text,index)=>(
    <PCEditorTextarea key={index} textkey={index}
    getTextareaKey = {this.getTextareaKey.bind(this)}
    textarea={textarea[sectionIndex][index]} count = {text}
    showTextSider={this.showTextSider.bind(this)}/>
   ))
     :
     '';
   let imagearea = this.state.imagearea;
   let imageareaKey = this.state.imageareaKey;
   let currentImageStyle = imagearea[imageareaKey];
   let imagelist = this.state.imagelist;
   let imageObjectList = this.state.imageObjectList;
   let videoObjectList = this.state.videoObjectList;
   let showImagelist = imagelist ?
   imagelist.map((image,index)=>(
     <PCEditorImagearea key={index} imagekey={index}
     getImageareaKey = {this.getImageareaKey.bind(this)}
     imagearea={imagearea[index]} count = {image}
     imageObjectList={imageObjectList}
     showImageSider={this.showImageSider.bind(this)}/>
    ))
      :
      '';
    let videoarea = this.state.videoarea;
    let videoareaKey = this.state.videoareaKey;
    let currentVideoStyle = videoarea[videoareaKey];
    let videolist = this.state.videolist;
    let showVideolist = videolist ?
    videolist.map((video,index)=>(
      <PCEditorVideoarea key={index} videokey={index}
      getVideoareaKey = {this.getVideoareaKey.bind(this)}
      videoarea={videoarea[index]} count = {video}
      videoObjectList={videoObjectList}
      showVideoSider={this.showVideoSider.bind(this)}/>
     ))
       :
       '';
    let {sectiontransform,sectionlist,sectionHead,sectionpre} = this.state;
    let showSectionlist = sectionlist ?
    sectionlist.map(function (section,index){
      sectionpre < sectionlist.length ?
      sectionIndex = sectionIndex+1
      :
      '';
      return(
     <section key={index} class="sections" style={{transfrom:sectiontransform[index]}} headdown={sectionHead[index]}>
       {showTextlist}
       {showImagelist}
       {showVideolist}
     </section>
   );
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
                    <Button htmlType="button" id="tool-btn3" title="保存">
                      <Icon class="tool-icon" type="save" />
                    </Button>
                    <Button htmlType="button" id="tool-btn4" title="播放">
                      <Icon class="tool-icon" type="caret-right" />
                    </Button>
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
                <Upload
                accept="image"
                action= ''
                onChange={this.uploadImage.bind(this)}>
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
                  textColorChange={this.textColorChange.bind(this)}
                  borderColorChange={this.borderColorChange.bind(this)}
                  backgroundColorChange={this.backgroundColorChange.bind(this)}
                  />
              </Sider>
              <Sider class="sider" id="image-menu" width="200" style={{visibility:this.state.imagesSider,opacity:this.state.imagesSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80 ,transition: 'opacity 0.5s linear',}}>
                <PCEditorImagesidebar
                showOriginSider={this.showOriginSider.bind(this)}
                irotationChange={this.irotationChange.bind(this)}
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
                vborderWidthChange={this.vborderWidthChange.bind(this)}
                vborderRadiusChange={this.vborderRadiusChange.bind(this)}
                vborderColorChange={this.vborderColorChange.bind(this)}/>
              </Sider>
              <Content style={{position:'fixed',overflow:'auto', left:300,width:"74%",height:"90%",margin: '24px 16px', padding: 0, background: '#eee', minHeight: 280 }}>
                <article>
                  <div id="slides">
                    {showSectionlist}
                  </div>
                  <aside class="control" style={{position:'fixed',left:'80%',top:'95%'}}>
                    <Button class="navigator-up" htmlType="button"  ><Icon type="up" /></Button>
                    <Button class="navigator-down" htmlType="button" ><Icon type="down" /></Button>
                    <Button class="navigator-left" htmlType="button" ><Icon type="left" /></Button>
                    <Button class="navigator-right" htmlType="button" ><Icon type="right" /></Button>
                  </aside>
                  <Button class="add-slides" htmlType="button" onClick={this.addRightSlides.bind(this)} style={{position:'fixed',height:'50px',width:'50px',padding:0,boxSizing:'border-box',border:'none',top:'50%',left:'95%',fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o"/></Button>
                  <Button class="add-slides" htmlType="button" onClick={this.addDownSlides.bind(this)} style={{position:'fixed',height:'50px',width:'50px',padding:0,boxSizing:'border-box',border:'none',top:'90%',left:'60%',fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o" /></Button>
                </article>
              </Content>
            </Layout>
            </div>

    );
  }
}
