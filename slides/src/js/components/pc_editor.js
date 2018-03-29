import React from 'react';
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
} from 'antd';
const { Footer,Content,Sider } = Layout;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCEditor extends React.Component{
  constructor(){
		super();
		this.state = {

		};
	};
render(){
    return (
        <div>
        <PCHeader/>
            <Layout>
              <Sider width="80" style={{ overflow: 'auto', height: '100vh', position:'fixed', left: 0 }}>
                    <Button id="tool-btn1" title="预览">
                      <Icon class="tool-icon" type="scan" />
                    </Button>
                    <Button id="tool-btn2" title="撤销">
                      <Icon class="tool-icon" type="rollback" />
                    </Button>
                    <Button id="tool-btn3" title="保存">
                      <Icon class="tool-icon" type="save" />
                    </Button>
                    <Button id="tool-btn4" title="播放">
                      <Icon class="tool-icon" type="caret-right" />
                    </Button>
                    <Button id="tool-btn5" title="删除">
                      <Icon class="tool-icon" type="delete" />
                    </Button>
                    <Button id="tool-btn6" title="设置">
                      <Icon class="tool-icon" type="setting" />
                    </Button>
              </Sider>
              <Sider width="80" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 80 }}>
                <Button id="text" title="添加文本">
                  <Icon class="tool-icon" type="file-text" />
                </Button>
                <Button id="images" title="添加图片">
                    <Icon class="tool-icon" type="picture" />
                </Button>
                <Button id="video" title="添加视频">
                    <Icon class="tool-icon" type="video-camera" />
                </Button>
              </Sider>
              <Content style={{position:'fixed', left:160,width:100%,height:100%,margin: '24px 16px', padding: 24, background: '#eee', minHeight: 280 }}>
                <section class="page"></section>
              </Content>
            </Layout>
            </div>

    );
  }
}
