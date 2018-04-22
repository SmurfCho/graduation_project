import React from 'react';
import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';


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
    this.setState({disableDragging:false,cursor:"move"});
  }
  render() {
    let textarea = this.props.textarea;
    let rndstyle = {
      height:500,
      width:500,
      position:"relative",
      display: "block",
      border: 'solid 1px #ddd',
      background: '#f0f0f0',
      borderRadius:textarea[8],
    };
    let textStyle={
      cursor:this.state.cursor,
      margin:0,
      position:'relative',
      height:"100%",
      width:"100%",
      overflow:"hidden",
      padding:textarea[11],
      textAlign:textarea[0],
      fontSize:textarea[1],
      lineHeight:textarea[2],
      letterSpacing:textarea[3],
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
      <div style={{
      transform:"rotate("+textarea[6]+"deg)!important",
      transformOrigin:"50%",height:this.state.height,width:this.state.width}}
      >
        <Rnd
        style={rndstyle} disableDragging={this.state.disableDragging}
        size={{ width: this.state.width, height: this.state.height }}
        onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          });
        }}
        >
          <div contentEditable = "true"  autoFocus="autofocus" id = {this.props.count}
          onBlur={this.textBlur.bind(this)} onDoubleClick={this.allFocus.bind(this)}
          onClick={this.textFocus.bind(this)} style={textStyle} title="双击编辑文本">

          </div>
        </Rnd>
      </div>
    );
  }
}
