import React from 'react';
import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';


export default class PCEditorImagearea extends React.Component {
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
  allFocus(e){
    this.props.showImageSider(e);
    this.props.getImageareaKey(e);
  }
  render() {
    let imagearea = this.props.imagearea;
    let rndstyle = {
      height:500,
      width:500,
      position:"absolute",
      display: "block",
      border: 'solid 1px #ddd',
      background: '#f0f0f0',
      opacity:imagearea[1]*0.1,
      borderRadius:imagearea[3],
    };
    let imageStyle={
      cursor:this.state.cursor,
      margin:0,
      position:'relative',
      height:"100%",
      width:"100%",
      display:'block',
      borderWidth:imagearea[2],
      borderStyle:imagearea[4],
      borderRadius:imagearea[3],
      borderColor:imagearea[5],
    }
    let imageObjectList = this.props.imageObjectList;
    let key = this.props.imagekey;/*当前图片索引*/
    return (
      <div style={{position:"absolute",transform:"rotate("+imagearea[0]+"deg)",
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
          <img  autoFocus="autofocus" src={[key]} id = {this.props.count} onClick={this.allFocus.bind(this)}
          style={imageStyle} title="点击编辑图片"/>
        </Rnd>
      </div>
    );
  }
}
