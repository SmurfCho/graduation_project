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
      originSider: 'visible',
      originSiderop:1,
      textSider: 'hidden',
      textSiderop:0,
      imagesSider: 'hidden',
      imagesSiderop:0,
      videoSider: 'hidden',
      videoSiderop:0,
      sectionlist:[],
      count:0,
      textlist:[],
      textAlign:"left",
      fontSize:16,
      lineHeight:1,
      letterSpacing:2,
      textColor:"#000",
      backgroundColor:"#fff",
      rotation:0,
      borderWidth:1,
      borderRadius:0,
      borderStyle:"solid",
      borderColor:"#000",
      textpadding:4,

		};
    this.siderDisplay = this.siderDisplay.bind(this);
    this.addTextarea = this.addTextarea.bind(this);
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

  /*显示编辑工具栏o*/
  siderDisplay(e){
    this.setState({
      originSider:'hidden',
      originSiderop:1
    });
    if(e.target.id == 'text'){
      this.setState({
        textSider: 'visible',
        textSiderop:1,
      });
    }else if(e.target.id == 'images'){
      this.setState({
        imagesSider: 'visible',
        imagesSiderop:1
      });
    }else if(e.target.id == 'images'){
      this.setState({
        videoSider: 'visible',
        videoSiderop:1
      });
    }
  }

  /*新建文本框o*/
  addTextarea(e){
       let textlist = this.state.textlist;
       let count = this.state.count;
       textlist.push(text);
       this.setState({textlist:textlist,count:count+1});
     }
 showtext(e){
   this.siderDisplay(e);
   this.addTextarea(e);
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
  /*编辑文本alighment0*/
  getTextAlignKey(e){
    switch(e.target.value)
    {
    case "left":
      this.setState({textAlign:"left"});
      break;
    case "right":
      this.setState({textAlign:"right"});
      break;
    case "center":
      this.setState({textAlign:"center"});
      console.log(this.state.textAlign);
      break;
    case "justify":
      this.setState({textAlign:"justify"});
      break;
  };
};
    /*文字大小*/
    fontSizeChange(e){
      this.setState({fontSize:e});
    }
    /*行高*/
    lineheightChange(e){
      this.setState({lineHeight:e})
    }
    /*letterSpacing*/
    letterSpacingChange(e){
      this.setState({letterSpacing:e})
    }
    rotationChange(e){
      this.setState({rotation:e})
    }
    borderWidthChange(e){
      this.setState({borderWidth:e})
    }
    borderRadiusChange(e){
      this.setState({borderRadius:e})
    }
addRightSlides(){
  newPage("pageright");
};
addDownSlides(){
  newPage("pagedown");
};


render(){
  const pageNum = 0;

    return (
        <div>
        <PCHeader/>
            <Layout>
              <Sider class="sider" width="80" style={{ overflow: 'scroll', height: '100vh', position:'fixed', left: 0 }}>
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
              <Sider class="sider" id="func-menu" width="210" style={{ visibility:this.state.originSider,opacity:this.state.originSiderop, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80,transition: 'opacity 0.5s linear'}}>
                <Button htmlType="button" id="text" title="添加文本"  onClick={this.showtext.bind(this)}>
                  <Icon class="tool-icon" type="file-text" />
                </Button>
                <Button htmlType="button" id="images" title="添加图片"  onClick={this.siderDisplay.bind(this)}>
                    <Icon class="tool-icon" type="picture" />
                </Button>
                <Button htmlType="button" id="video" title="添加视频" onClick={this.siderDisplay.bind(this)}>
                    <Icon class="tool-icon" type="video-camera" />
                </Button>
              </Sider>
              <Sider class="sider" id="text-menu" width="210" style={{visibility:this.state.textSider,opacity:this.state.textSiderop, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
                  <PCEditorText
                  getTextAlignKey={this.getTextAlignKey.bind(this)}
                  fontSizeChange={this.fontSizeChange.bind(this)}
                  lineheightChange={this.lineheightChange.bind(this)}
                  letterSpacingChange={this.letterSpacingChange.bind(this)}
                  rotationChange={this.rotationChange.bind(this)}
                  borderWidthChange={this.borderWidthChange.bind(this)}
                  borderRadiusChange={this.borderRadiusChange.bind(this)}
                  />
              </Sider>
              <Sider class="sider" id="image-menu" width="200" style={{visibility:this.state.imagesSider,opacity:this.state.imagesSiderop, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80 ,transition: 'opacity 0.5s linear',}}>
                <PCEditorPicture/>
              </Sider>
              <Sider class="sider" id="vedio-menu" width="200" style={{visibility:this.state.videoSider,opacity:this.state.videoSiderop, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80,transition:'opacity 0.5s linear', }}>
                <PCEditorVideo/>
              </Sider>
              <Content style={{position:'fixed',overflow:'auto', left:300,width:"74%",height:"80%",margin: '24px 16px', padding: 24, background: '#eee', minHeight: 280 }}>
                <article>
                  <div id="slides">
                    <section style={{display:'block',position:'relative'}}>
                      <PCEditorTextarea count={this.state.count} textlist={this.state.textlist}
                      fontSize={this.state.fontSize}
                      textAlign={this.state.textAlign} textpadding={this.state.textpadding}
                       letterSpacing={this.state.letterSpacing} lineHeight={this.state.lineHeight}
                      backgroundColor={this.state.backgroundColor} rotation={this.state.rotation}
                      borderWidth={this.state.borderWidth} borderStyle={this.state.borderStyle}
                       borderRadius={this.state.borderRadius} borderColor={this.state.borderColor}/>
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
