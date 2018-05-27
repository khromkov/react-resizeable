import React from 'react';
import ResizeableHandle from './ResizeableHandle';
import './Resizeable.css';

class Resizeable extends React.Component {
  static defaultProps = {
    handleSize: 10,
    isSyncUpdate: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      delta: {},
      width: null,
      isDrag: false,
    };
  }

  getRef = node => {
    this.node = node;
  };

  getDelta(e) {
    const delta = {};

    delta.x = e.clientX - this.startPosition.x;
    if (this.rect.width + delta.x < 200) {
      delta.x = 200 - this.rect.width;
    }

    delta.y = e.clientY - this.startPosition.y;

    return delta;
  }

  handleMouseDown = (e, x, y) => {
    this.startPosition = { x: e.clientX, y: e.clientY };
    this.directions = { x, y };
    this.rect = this.node.getBoundingClientRect();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseleave', this.handleMouseLeaveDocument);
    this.setState({ isDrag: true });
    e.preventDefault();
  };

  handleMouseMove = e => {
    const delta = this.getDelta(e);

    const update = { delta };
    if (this.props.isSyncUpdate) {
      update.width = this.rect.width + delta.x;
    }

    this.setState(update);
  };

  handleMouseUp = e => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseleave', this.handleMouseLeaveDocument);
    const width = this.rect.width + this.getDelta(e).x;
    this.setState({ width, isDrag: false, delta: {} });
  };

  handleMouseLeaveDocument = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseleave', this.handleMouseLeaveDocument);
    this.setState({ width: this.rect.width + this.state.delta.x, isDrag: false, delta: {} });
  };

  render() {
    const { children, isSyncUpdate } = this.props;
    const { delta, width, isDrag } = this.state;

    return (
      <div className="Resizeable" ref={this.getRef} style={{ width }}>
        {children}
        <ResizeableHandle onMouseDown={this.handleMouseDown} x={1} />
        <ResizeableHandle onMouseDown={this.handleMouseDown} y={-1} />
        <ResizeableHandle onMouseDown={this.handleMouseDown} x={1} y={-1} />
        {!isSyncUpdate &&
          isDrag && <div className="Resizeable__ghost" style={{ left: 0, right: -delta.x }} />}
      </div>
    );
  }
}

export default Resizeable;
