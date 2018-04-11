import React from 'react';
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
} from 'antd';
require(`../../css/pc_editor.css`);
const { Footer,Content,Sider } = Layout;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCEditorText from './pc_editor_text';
import PCEditorPicture from './pc_editor_picture';
import PCEditorVideo from './pc_editor_video';
import PCEditorTextarea from './pc_editor_textarea';

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
      textlist:[],/*文本框队列*/
      textAlign:[],//以下是文本框编辑参数
      fontSize:[],
      lineHeight:[],
    /*  letterSpacing:3,
      textColor:4,
      backgroundColor:5,
      rotation:6,
      borderWidth:7,
      borderRadius:8,
      borderStyle:9,
      borderColor:10,
      textpadding:11,*/
      textareaKey:0,
      textarea:[],
		};
	};

  /*新建幻灯片*/
  newPage(direction){
    const prePage = document.querySelector('#page'+pageNum);
    prePage.style.display = "none";
    pageNum ++
    const slides = document.querySelector('#slides');
    const page = document.createElement("section");
    slides.appendChild(page);
    page.id = "page"+pageNum;
    page.setAttribute("dir",direction);

  }
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
  showimageSider(e){
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
     textarea.push(style);
     textlist.push(count);
     this.setState({textlist:textlist,count:count+1,textarea:textarea});
     }
   /*新增文本框并显示文本编辑工具条*/
 showtext(e){
   this.showTextSider(e);
   this.addTextarea(e);
 }
 showvideo(e){
   this.siderDisplay(e);
   this.addVideo(e);
 }
 showimage(e){
   this.siderDisplay(e);
   this.addimage(e);
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
    let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
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
      console.log(this.state.textareaKey);
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      if(textarea[textareaKey]){
      textarea[textareaKey][1]=e;
      this.setState({textarea:textarea});}

    }
    /*行高*/
    lineheightChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][2]=e;
      this.setState({textarea:textarea});
    }
    /*letterSpacing*/
    letterSpacingChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][3]=e;
      this.setState({textarea:textarea});
    }
    /*旋转*/
    rotationChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][6]=e;
      this.setState({textarea:textarea});
    }
    /*边框宽度*/
    borderWidthChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][7]=e;
      this.setState({textarea:textarea});
    }
    /*边框角圆*/
    borderRadiusChange(e){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][8]=e;
      this.setState({textarea:textarea});
    }
    textColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][4]=color.hex;
      this.setState({textarea:textarea});
    };
    backgroundColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][5]=color.hex;
      this.setState({textarea:textarea});
    };
    borderColorChange(color){
      let textarea = this.state.textarea,textareaKey = this.state.textareaKey;
      textarea[textareaKey][10]=color.hex;
      this.setState({textarea:textarea});
    };
addRightSlides(){
  newPage("pageright");
};
addDownSlides(){
  newPage("pagedown");
};


render(){
  const pageNum = 0;
  let textarea = this.state.textarea;
  let key = this.state.textareaKey;
  let currentTextStyle = textarea[key];
  let textlist = this.state.textlist;
  let showTextlist = textlist ?
  textlist.map((text,index)=>(
    <PCEditorTextarea key={index}
    getTextareaKey = {this.getTextareaKey.bind(this)}
    textarea={textarea[index]} count = {text}
    showTextSider={this.showTextSider.bind(this)}/>
   ))
     :
     ''

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
                <Button htmlType="button" id="images" title="添加图片"  onClick={this.showimage.bind(this)}>
                    <Icon class="tool-icon" type="picture" />
                </Button>
                <Button htmlType="button" id="video" title="添加视频" onClick={this.showvideo.bind(this)}>
                    <Icon class="tool-icon" type="video-camera" />
                </Button>
              </Sider>
              <Sider class="sider" id="text-menu" width="210" style={{visibility:this.state.textSider,opacity:this.state.textSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
                  <PCEditorText
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
                <PCEditorPicture/>
              </Sider>
              <Sider class="sider" id="vedio-menu" width="200" style={{visibility:this.state.videoSider,opacity:this.state.videoSiderop, overflow: 'scroll', height: '90vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
                <PCEditorVideo/>
              </Sider>
              <Content style={{position:'fixed',overflow:'auto', left:300,width:"74%",height:"80%",margin: '24px 16px', padding: 24, background: '#eee', minHeight: 280 }}>
                <article>
                  <div id="slides">
                    <section style={{display:'block',position:'relative'}}>
                      {showTextlist}
                    </section>


                  </div>
                  <aside class="control" style={{position:'fixed',left:'80%',top:'90%'}}>
                    <Button class="navigator-up" htmlType="button"  ><Icon type="up" /></Button>
                    <Button class="navigator-down" htmlType="button" ><Icon type="down" /></Button>
                    <Button class="navigator-left" htmlType="button" ><Icon type="left" /></Button>
                    <Button class="navigator-right" htmlType="button" ><Icon type="right" /></Button>
                  </aside>
                  <Button class="add-slides" htmlType="button" onClick={this.addRightSlides.bind(this)} style={{position:'fixed',height:'50px',width:'50px',border:'none',top:'50%',left:'95%',fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o" /></Button>
                  <Button class="add-slides" htmlType="button" onClick={this.addDownSlides.bind(this)} style={{position:'fixed',height:'50px',width:'50px',border:'none',top:'90%',left:'50%',fontSize:50,textarea:'center',background:'none'}}><Icon type="plus-circle-o" /></Button>
                </article>
              </Content>
            </Layout>
            </div>

    );
  }
}
