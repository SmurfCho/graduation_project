import React from 'react';
import ReactDOM from 'react-dom';
import Rnd from 'react-rnd';


export default class PCEditorVideoarea extends React.Component {
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
    this.props.showVideoSider(e);
    this.props.getVideoareaKey(e);
  }
  render() {
    let videoarea = this.props.videoarea;
    let rndstyle = {
      height:500,
      width:500,
      position:"relative",
      display: "block",
      border: 'solid 1px #ddd',
      background: '#f0f0f0',
      opacity:videoarea[1]*0.1,
      borderRadius:videoarea[3],
    };
    let videoStyle={
      cursor:this.state.cursor,
      margin:0,
      position:'relative',
      height:"100%",
      width:"100%",
      display:'block',
      borderWidth:videoarea[2],
      borderStyle:videoarea[4],
      borderRadius:videoarea[3],
      borderColor:videoarea[5],
    }
    let videoObjectList = this.props.videoObjectList;
    let key = this.props.videokey;/*当前视频索引*/

    return (
      <div style={{transform:"rotate("+videoarea[0]+"deg)",
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
          <video id = {this.props.count} onClick={this.allFocus.bind(this)}
          style={videoStyle} title="点击编辑视频">
          <source src={videoObjectList[key]}  type="video/mp4"/>
          </video>
        </Rnd>
      </div>
    );
  }
}
