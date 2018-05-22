import React from "react";
import ReactDOM from "react-dom";
import SketchPicker from "react-color";
import {
  Row,
  Col,
  Button,
  Icon,
  Layout,
  Slider,
  InputNumber,
  Popover,
  Radio,
  Input,
  Select,
} from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Footer,Content,Sider } = Layout;
const Option = Select.Option;
export default class PCEditorTextsidebar extends React.Component{
  constructor(){
		super();
		this.state = {
      fontValue:16,
      lineHeightValue:1,
      letterSpacingValue:1,
      rotationValue:0,
      borderWidthValue:1,
      borderRadiusValue:0,
      borderStyleValue:"solid",
      textColorValue:"#000",
      backgroundColorValue:"#fff",
      borderColorValue:"#000",
      displayColorPicker: false,
      background:"",
		};
	};



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
borderStyleChange(e){
  this.setState({
    borderStyleValue: e
  });
}
handleborderStyleChange(e){
  this.props.borderStyleChange(e);
  this.borderStyleChange(e);
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
textColorValueChange(color){
  this.setState({textColorValue:color.hex});
}
handleTextColorChange(color,e){
  this.textColorValueChange(color);
  this.props.textColorChange(color);
}
backgroundColorValueChange(color){
  this.setState({backgroundColorValue:color.hex});
}
handleBackgroundColorChange(color,e){
  this.backgroundColorValueChange(color);
  this.props.backgroundColorChange(color);
}
borderColorValueChange(color){
  this.setState({borderColorValue:color.hex});
}
handleBorderColorChange(color,e){
  this.borderColorValueChange(color);
  this.props.borderColorChange(color);
}

render(){

    return (
        <div>
        <div class="back" style={{textAlign:"center"}}>
        <Button type="Dash" onClick={this.props.showOriginSider}>
          <Icon type="left" />Backward
        </Button>
        </div>
          <div class="text-func">
            <p>Text Alignment</p>
            <RadioGroup onChange={this.props.getTextAlignKey} defaultValue="left">
              <RadioButton style={{height:30,width:40,padding:"6px 0px",textAlign:"center"}} value="left"><img src="../../../src/images/text-left.svg" style={{height:18,width:20}} title="左对齐"/></RadioButton>
              <RadioButton style={{height:30,width:40,padding:"6px 0px",textAlign:"center"}} value="right"><img src="../../../src/images/text-right.svg" style={{height:18,width:20}} title="右对齐"/></RadioButton>
              <RadioButton style={{height:30,width:40,padding:"6px 0px",textAlign:"center"}} value="center"><img src="../../../src/images/text-center.svg" style={{height:18,width:20}} title="居中对齐"/></RadioButton>
              <RadioButton style={{height:30,width:40,padding:"6px 0px",textAlign:"center"}} value="justify"><img src="../../../src/images/text-justify.svg" style={{height:18,width:20}} title="两边对齐"/></RadioButton>
            </RadioGroup>

          </div>
          <div class="text-func">
            <p>Font size</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleFontChange.bind(this)} value={this.state.fontValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.fontValue}
                  onChange={this.handleFontChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>Line Height</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleLineHeightChange.bind(this)} value={this.state.lineHeightValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.lineHeightValue}
                  onChange={this.handleLineHeightChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>Letter Spacing</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleletterSpacingChange.bind(this)} value={this.state.letterSpacingValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.letterSpacingValue}
                  onChange={this.handleletterSpacingChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>Text Color</p>
            <Popover placement="right"  content={<SketchPicker color={this.state.textColorValue}  onChangeComplete={this.handleTextColorChange.bind(this)} type="sketch" />} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class="text-func">
            <p>Background Color</p>
            <Popover placement="right"  content={<SketchPicker color={this.state.backgroundColorValue}  onChangeComplete={this.handleBackgroundColorChange.bind(this)} type="sketch" />} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class="text-func">
            <p>Rotation</p>
            <Row>
              <Col span={12}>
                <Slider min={0} max={360} onChange={this.handlerotationChange.bind(this)} value={this.state.rotationValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={0}
                  max={360}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.rotationValue}
                  onChange={this.handlerotationChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>border width</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleborderWidthChange.bind(this)} value={this.state.borderWidthValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.borderWidthValue}
                  onChange={this.handleborderWidthChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>border radius</p>
            <Row>
              <Col span={12}>
                <Slider min={1} max={100} onChange={this.handleborderRadiusChange.bind(this)} value={this.state.borderRadiusValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16,width:45,display:"inline-block" }}
                  value={this.state.borderRadiusValue}
                  onChange={this.handleborderRadiusChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class="text-func">
            <p>border style</p>
            <Select defaultValue="solid" style={{ width: 120 }} onChange={this.handleborderStyleChange.bind(this)}>
              <Option value="solid">solid</Option>
              <Option value="dashed">dashed</Option>
              <Option value="none">none</Option>
            </Select>
          </div>
          <div class="text-func">
            <p>border color</p>
            <Popover placement="right"  content={<SketchPicker color={this.state.borderColorValue}  onChangeComplete={this.handleBorderColorChange.bind(this)} type="sketch"/>} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class="text-func">
            <p>Animation</p>
          </div>
          <div class="text-func">
            <Button class="delete" onClick={this.props.deleteText.bind(this)}><Icon type="delete" /></Button>
          </div>
        </div>

    );
  }
}
