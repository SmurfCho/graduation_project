import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import Resizable from "re-resizable";


export default class PCEditorVideoarea extends React.Component {
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
    this.props.showVideoSider(e);
    this.props.getVideoareaKey(e);
  }
  resizeBlur(e){
    this.props.getVideoSize(e);
    this.props.getVideoPosition(e);
  }
  render() {
    let videoarea = this.props.videoarea;
    let rndstyle = {
      position:"absolute",
      display: "inline-block",
      border: "solid 1px #ddd",
      background: "none",
      border:"none",
      opacity:videoarea[1]*0.1,
      borderRadius:videoarea[3],
    };
    let videoStyle={
      cursor:"auto",
      margin:0,
      position:"relative",
      height:"100%",
      width:"100%",
      display:"block",
      background:"#eee",
      borderWidth:videoarea[2],
      borderStyle:videoarea[4],
      borderRadius:videoarea[3],
      borderColor:videoarea[5],
    }
    let videoObjectList = this.props.videoObjectList;
    let key = this.props.videokey;/*当前视频索引*/

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
          transform:"rotate("+videoarea[0]+"deg)",
          transformOrigin:"50%"}}
          enable={{ top:false, right:true, bottom:true, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
          defaultSize={{
            width: 200,
            height: 200,
          }}
          onMouseUp={this.resizeBlur.bind(this)}
        >
          <div className="handle" style={{position:"absolute",userSelect:"none",width:10,height:"100%",borderRadius:10,border:"none",display:"inline-block",top:0,left:-5,cursor:"move"}}></div>
          <video id = {this.props.count} controls="controls" onClick={this.allFocus.bind(this)}
          style={videoStyle} title="点击编辑视频">
          <source src="./src/images/test.mp4"  type="video/mp4"/>
          <source src="./src/images/test.mp4"  type="video/ogg"/>
          <source src="./src/images/test.mp4"  type="video/webm"/>
          </video>
      </Resizable>
      </div>
    </Draggable>
    );
  }
}
