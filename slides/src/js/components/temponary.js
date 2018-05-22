<div style={{
transform:"translate("+this.state.x+"px,"+this.state.y+"px) rotate("+textarea[6]+"deg)", position:"fixed",
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
