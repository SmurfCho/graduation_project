import React from 'react';
import SketchPicker from 'react-color';
require(`../../css/pc_editor_imagesidebar.css`);
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
  Upload,
  Modal
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Footer,Content,Sider } = Layout;

export default class PCEditorVideosidebar extends React.Component{
  constructor(){
		super();
		this.state = {
      rotationValue:0,
      opacityValue:10,
      borderWidthValue:1,
      borderRadiusValue:0,
      borderColorValue:"#000",
      displayColorPicker: false,
		};
	};
 rotationChange(e){
   this.setState({
     rotationValue: e
   });
 }
 handlerotationChange(e){
   this.props.vrotationChange(e);
   this.rotationChange(e);
 }
 opacityChange(e){
   this.setState({
     rotationValue: e
   });
 }
 handleopacityChange(e){
   this.props.vopacityChange(e);
   this.opacityChange(e);
 }
 borderWidthChange(e){
   this.setState({
     borderWidthValue: e
   });
 }
 handleborderWidthChange(e){
   this.props.vborderWidthChange(e);
   this.borderWidthChange(e);
 }
 borderRadiusChange(e){
   this.setState({
     borderRadiusValue: e
   });
 }
 handleborderRadiusChange(e){
   this.props.vborderRadiusChange(e);
   this.borderRadiusChange(e);
 }
 borderColorValueChange(color){
   this.setState({borderColorValue:color.hex});
 }
 handleBorderColorChange(color,e){
   this.borderColorValueChange(color);
   this.props.vborderColorChange(color);
 }
render(){
    return (
        <div>
          <div class='back' style={{textAlign:"center"}}>
            <Button type="Dash" onClick={this.props.showOriginSider}>
              <Icon type="left" />Backward
            </Button>
          </div>
          <div class='video-func'>
            <p>Rotation</p>
            <Row>
              <Col span={12}>
                <Slider min={0} max={360} onChange={this.handlerotationChange.bind(this)} value={this.state.rotationValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={0}
                  max={360}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.rotationValue}
                  onChange={this.handlerotationChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='video-func'>
            <p>Opacity</p>
            <Row>
              <Col span={12}>
                <Slider min={0} max={10} onChange={this.handleopacityChange.bind(this)} value={this.state.opacityValue} />
              </Col>
              <Col span={2}>
                <InputNumber
                  min={0}
                  max={10}
                  style={{ marginLeft: 16,width:45,display:'inline-block' }}
                  value={this.state.opacityValue}
                  onChange={this.handleopacityChange.bind(this)}
                />
              </Col>
            </Row>
          </div>
          <div class='video-func'>
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
          <div class='video-func'>
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
          <div class='video-func'>
            <p>border color</p>
            <Popover placement="right"  content={<SketchPicker color={this.state.borderColorValue}  onChangeComplete={this.handleBorderColorChange.bind(this)} type="sketch"/>} trigger="click">
              <Button>Pick Color</Button>
            </Popover>
          </div>
          <div class='video-func'>
            <p>Animation</p>
          </div>
          <div class='video-func'>
            <p>Depth</p>
          </div>
        </div>

    );
  }
}
