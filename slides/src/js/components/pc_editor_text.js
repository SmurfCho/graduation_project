import React from 'react';
import ReactDOM from 'react-dom';
import SketchPicker from 'react-color';
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Slider,
  InputNumber,
  Popover
} from 'antd';
const { Footer,Content,Sider } = Layout;
const handleColorChange = ({ hex }) => console.log(hex);
export default class PCEditorText extends React.Component{
  constructor(){
		super();
		this.state = {
      inputValue: 1,
      displayColorPicker: false,
		};
	};

  handleChange(e){
  this.setState({
    inputValue: e
  });
}

render(){
    return (
        <div>
          <div class='text-func'>
            <p>Text Alignment</p>
              <Button htmlType='button' style={{width:'45px',paddingLeft:'13px'}}><img src="../../../src/images/text-left.svg" style={{height:18,width:18}}/></Button>
              <Button htmlType='button' style={{width:'45px',paddingLeft:'13px'}}><img src="../../../src/images/text-right.svg" style={{height:18,width:18}}/></Button>
              <Button htmlType='button' style={{width:'45px',paddingLeft:'13px'}}><img src="../../../src/images/text-center.svg" style={{height:18,width:18}}/></Button>
              <Button htmlType='button' style={{width:'45px',paddingLeft:'13px'}}><img src="../../../src/images/text-justify.svg" style={{height:18,width:18}}/></Button>
          </div>
          <div class='text-func'>
            <p>Line Height</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleChange.bind(this)} value={this.state.inputValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.inputValue}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>Letter Spacing</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleChange.bind(this)} value={this.state.inputValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.inputValue}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>Text Color</p>
            <Popover placement="right"  content={<SketchPicker color="#333" onChangeComplete={ handleColorChange } type="sketch" />} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class='text-func'>
            <p>Background Color</p>
            <Popover placement="right"  content={<SketchPicker type="sketch" />} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class='text-func'>
            <p>Rotation</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleChange.bind(this)} value={this.state.inputValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.inputValue}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>border width</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleChange.bind(this)} value={this.state.inputValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.inputValue}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>border radius</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleChange.bind(this)} value={this.state.inputValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.inputValue}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>border color</p>
            <Popover placement="right"  content={<SketchPicker type="sketch" />} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class='text-func'>
            <p>Animation</p>
          </div>
        </div>

    );
  }
}
