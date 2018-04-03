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

export default class PCEditor extends React.Component{
  constructor(){
		super();
		this.state = {
      originSider: 'block',
      textSider: 'none',
      imagesSider: 'none',
      videoSider: 'none',
		};
	};

  /*显示编辑工具栏*/
  siderDisplay(e){
    this.setState({
      originSider:'none'
    });
    if(e.target.id == 'text'){
      this.setState({
        textSider: 'block',
      });
    }else if(e.target.id == 'images'){
      this.setState({
        imagesSider: 'block',
      });
    }else if(e.target.id == 'images'){
      this.setState({
        videoSider: 'block',
      });
    }
  }
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
addRightSlides(){
  newPage("pageright");
};
addDownSlides(){
  newPage("pagedown");
};

addTextarea(){
const page = document.QuerySelector('#'+pageNum);
const newtext = document.createElement('div');
page.appendChild(newtext);
}

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
              <Sider class="sider" id="func-menu" width="80" style={{ display:this.state.originSider, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80 }}>
                <Button htmlType="button" id="text" title="添加文本"  onClick={this.siderDisplay.bind(this)}>
                  <Icon class="tool-icon" type="file-text" />
                </Button>
                <Button htmlType="button" id="images" title="添加图片"  onClick={this.siderDisplay.bind(this)}>
                    <Icon class="tool-icon" type="picture" />
                </Button>
                <Button htmlType="button" id="video" title="添加视频" onClick={this.siderDisplay.bind(this)}>
                    <Icon class="tool-icon" type="video-camera" />
                </Button>
              </Sider>
              <Sider class="sider" id="text-menu" width="210" style={{display:this.state.textSider, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80 }}>
                  <PCEditorText/>
              </Sider>
              <Sider class="sider" id="image-menu" width="200" style={{display:this.state.imagesSider, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80 }}>
                <PCEditorPicture/>
              </Sider>
              <Sider class="sider" id="vedio-menu" width="200" style={{display:this.state.videoSider, overflow: 'scroll', height: '100vh', position: 'fixed', left: 80 }}>
                <PCEditorVideo/>
              </Sider>
              <Content style={{position:'fixed',overflow:'hidden', left:300,width:"74%",height:"80%",margin: '24px 16px', padding: 24, background: '#eee', minHeight: 280 }}>
                <article>
                  <div id="slides">
                    <section id="page0"></section>
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
