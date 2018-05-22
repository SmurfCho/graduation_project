import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import Resizable from "re-resizable";


export default class PCEditorImagearea extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x:10,
      y:10,
      disableDragging:false,
      cursor:"move",
    };
  };
  allFocus(e){
    this.props.showImageSider(e);
    this.props.getImageareaKey(e);
  }
  resizeBlur(e){
    this.props.getImageSize(e);
    this.props.getImagePosition(e);
  }
  render() {
    let imagearea = this.props.imagearea;
    let rndstyle = {
      position:"absolute",
      display: "block",
      border: "none",
      background: "none",
      opacity:imagearea[1]*0.1,
      borderRadius:imagearea[3],
    };
    let imageStyle={
      cursor:"auto",
      margin:0,
      position:"relative",
      height:"100%",
      width:"100%",
      display:"block",
      background: "#f0f0f0",
      borderWidth:imagearea[2],
      borderStyle:imagearea[4],
      borderRadius:imagearea[3],
      borderColor:imagearea[5],
    }
    let imageObjectList = this.props.imageObjectList;
    let key = this.props.imagekey;/*当前图片索引*/
    return (
      <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      grid={[25, 25]}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}>
      <div style={rndstyle}>

        <Resizable
          style={{
          transform:"rotate("+imagearea[0]+"deg)",
          transformOrigin:"50%"}}
          enable={{ top:false, right:true, bottom:true, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
          defaultSize={{
            width: 200,
            height: 200,
          }}
          onMouseUp={this.resizeBlur.bind(this)}
        >
        <div className="handle" style={{position:"absolute",userSelect:"none",width:10,height:"100%",borderRadius:10,border:"none",display:"inline-block",top:0,left:-5,cursor:"move"}}></div>
        <img  autoFocus="autofocus" src="./src/images/timg.jpg" id = {this.props.count} onClick={this.allFocus.bind(this)}
        style={imageStyle} title="点击编辑图片"/>
      </Resizable>
      </div>
    </Draggable>
    );
  }
}
