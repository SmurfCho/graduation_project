import React from 'react'
const transX = this.prop.transX;
const transY = this.prop.transY;
export default class Move extends React.Component {
    constructor(){
        super();
        this.state = {
            translateX: transX,
            translateY: transY,
        };
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
    }

    onMouseDown(e) {
        e.stopPropagation();
        this.moving = true;
        console.log('move');
    }

    onMouseUp() {
        this.moving = false;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove(e) {
        this.moving && this.onMove(e);
    }

    onMove(e) {
        if(this.lastX && this.lastY) {
            let dx = e.clientX - this.lastX;
            let dy = e.clientY - this.lastY;
            this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
        }
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }

    render() {
        return (
            <div
                onMouseDown={this.onMouseDown.bind(this)}
                style={{margin:10,transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)`}}
            >
                <div style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
            </div>
        )
    }
};
