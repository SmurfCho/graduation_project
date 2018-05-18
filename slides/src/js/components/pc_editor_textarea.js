import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';


export default class PCEditorTextarea extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x:10,
      y:10,
      disableDragging:false,
      cursor:'move',
    };
  };

  textFocus(e){
    this.setState({disableDragging:true,cursor:"text"});
  };
  allFocus(e){
    this.props.showTextSider(e);
    this.props.getTextareaKey(e);
  }
  textBlur(e){
    this.setState({disableDragging:false,cursor:"text"});
  }
  render() {
    let textarea = this.props.textarea;
    let rndstyle = {
      position:"absolute",
      display: 'inline-block',
      border: 'none',
      background: 'none',
    };
    let textStyle={
      cursor:'text',
      margin:0,
      position:'relative',
      height:"100%",
      width:"100%",
      overflow:"hidden",
      padding:textarea[11],
      textAlign:textarea[0],
      fontSize:textarea[1],
      lineHeight:textarea[2],
      letterSpacing:textarea[3]*0.1,
      color:textarea[4],
      backgroundColor:textarea[5],
      borderWidth:textarea[7],
      borderStyle:textarea[9],
      borderRadius:textarea[8],
      borderColor:textarea[10],
    }
  /*  let showTextlist = textlist ?
    textlist.map((text,index)=>(
      <div key={index}
      style={{transform:"rotate("+this.props.rotation+"deg)",width:this.state.width,height:this.state.height}}
      />
     ))
       :
       ''*/

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
          transform:"rotate("+textarea[6]+"deg)",
          transformOrigin:"50%"}}
          enable={{ top:false, right:true, bottom:true, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
          defaultSize={{
            width: 200,
            height: 200,
          }}
        >
        <div className="handle" style={{position:"absolute",userSelect:"none",width:10,height:"100%",borderRadius:10,border:"none",display:"inline-block",top:0,left:-5,cursor:"move"}}></div>


        <div contentEditable = "true"  autoFocus="autofocus" id = {this.props.count}
        onBlur={this.textBlur.bind(this)} onFocus={this.allFocus.bind(this)}
        onClick={this.textFocus.bind(this)} style={textStyle} title="双击编辑文本"></div>
      </Resizable>
      </div>
    </Draggable>
    );
  }
}
