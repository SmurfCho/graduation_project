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
              <Sider width="100" style={{ overflow: 'auto', height: '100vh', position:'fixed', left: 0 }}>
                    <Button id="tool-btn1" title="预览">
                      <Icon class="tool-icon" type="scan" />
                    </Button>
                    <Button id="tool-btn2" title="撤销">
                      <Icon class="tool-icon" type="rollback" />
                    </Button>
                    <Button id="tool-btn3" title="保存">
                      <Icon class="tool-icon" type="upload" />
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
              <Sider width="150" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 100 }}>
              </Sider>
            </Layout>
            </div>

    );
  }
}
