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
  Popover,
  Radio
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Footer,Content,Sider } = Layout;
const handleColorChange = ({ hex }) => console.log(hex);
export default class PCEditorText extends React.Component{
  constructor(){
		super();
		this.state = {
      inputValue: 1,
      fontValue:16,
      lineHeightValue:1,
      letterSpacingValue:1,
      rotationValue:0,
      borderWidthValue:1,
      borderRadiusValue:0,
      displayColorPicker: false,
		};
	};

  handleChange(e){
  this.setState({
    inputValue: e
  });
}

fontchange(e){
  this.setState({
    fontValue: e
  });
}
handleFontChange(e){
  this.props.fontSizeChange(e);
  this.fontchange(e);
}

lineheightChange(e){
  this.setState({
    lineHeightValue: e
  });
}
handleLineHeightChange(e){
  this.props.lineheightChange(e);
  this.lineheightChange(e);
}

letterSpacingChange(e){
  this.setState({
    letterSpacingValue: e
  });
}
handleletterSpacingChange(e){
  this.props.letterSpacingChange(e);
  this.letterSpacingChange(e);
}

rotationChange(e){
  this.setState({
    rotationValue: e
  });
}
handlerotationChange(e){
  this.props.rotationChange(e);
  this.rotationChange(e);
}
borderWidthChange(e){
  this.setState({
    borderWidthValue: e
  });
}
handleborderWidthChange(e){
  this.props.borderWidthChange(e);
  this.borderWidthChange(e);
}
borderRadiusChange(e){
  this.setState({
    borderRadiusValue: e
  });
}
handleborderRadiusChange(e){
  this.props.borderRadiusChange(e);
  this.borderRadiusChange(e);
}
render(){
    return (
        <div>
          <div class='text-func'>
            <p>Text Alignment</p>
            <RadioGroup onChange={this.props.getTextAlignKey} defaultValue="left">
              <RadioButton value="left"><img src="../../../src/images/text-left.svg" style={{height:18,width:18}} title="左对齐"/></RadioButton>
              <RadioButton value="right"><img src="../../../src/images/text-right.svg" style={{height:18,width:18}} title="右对齐"/></RadioButton>
              <RadioButton value="center"><img src="../../../src/images/text-center.svg" style={{height:18,width:18}} title="居中对齐"/></RadioButton>
              <RadioButton value="justify"><img src="../../../src/images/text-justify.svg" style={{height:18,width:18}} title="两边对齐"/></RadioButton>
            </RadioGroup>

          </div>
          <div class='text-func'>
            <p>Font size</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleFontChange.bind(this)} value={this.state.fontValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.fontValue}
                  onChange={this.handleFontChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>Line Height</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleLineHeightChange.bind(this)} value={this.state.lineHeightValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.lineHeightValue}
                  onChange={this.handleLineHeightChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>Letter Spacing</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleletterSpacingChange.bind(this)} value={this.state.letterSpacingValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.letterSpacingValue}
                  onChange={this.handleletterSpacingChange.bind(this)}
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
                <Slider min={1} max={100} onChange={this.handlerotationChange.bind(this)} value={this.state.rotationValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.rotationValue}
                  onChange={this.handlerotationChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>border width</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleborderWidthChange.bind(this)} value={this.state.borderWidthValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.borderWidthValue}
                  onChange={this.handleborderWidthChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='text-func'>
            <p>border radius</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleborderRadiusChange.bind(this)} value={this.state.borderRadiusValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.borderRadiusValue}
                  onChange={this.handleborderRadiusChange.bind(this)}
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
