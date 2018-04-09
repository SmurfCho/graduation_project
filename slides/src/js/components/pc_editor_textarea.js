import React from 'react';
import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';
const style = {
  height:500,
  width:500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default class PCEditorTextarea extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x:10 ,
      y:10,
      disableDragging:false,
      cursor:'move',
    };
  };

  textFoucus(e){
    this.setState({disableDragging:true,cursor:"text"});

  };
  textBlur(e){
    this.setState({disableDragging:false,cursor:"move"});
  }
  render() {
    let textStyle={
      cursor:this.state.cursor,
      margin:0,
      position:'relative',
      height:"100%",
      width:"100%",
      padding:this.props.textpadding,
      textAlign:this.props.textAlign,
      fontSize:this.props.fontSize,
      lineHeight:this.props.lineHeight,
      letterSpacing:this.props.letterSpacing,
      color:this.props.textColor,
      backgroundColor:this.props.backgroundColor,
      rotation:this.props.rotation,
      borderWidth:this.props.borderWidth,
      borderStyle:this.props.borderStyle,
      borderRadius:this.props.borderRadius,
      borderColor:this.props.borderColor,
    }
    let count= this.props.count,
        textlist = this.props.textlist;
        const showTextlist = textlist ?
        textlist.map((page,index)=>(
          <Rnd key={index} style={style}
          disableDragging={this.state.disableDragging}
          size={{ width: this.state.width, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
            });
          }}

          >
            <div id="align" refs="align" contentEditable = "true"
            onBlur={this.textBlur.bind(this)}
            onClick={this.textFoucus.bind(this)} style={textStyle} title="双击编辑文本">

            </div>
          </Rnd>
        ))
        :
        ''

    return (
      <div>
        {showTextlist}
      </div>
    );
  }
}
