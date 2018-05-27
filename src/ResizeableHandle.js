import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class ResizeableHandle extends Component {
  static defaultProps = {
    size: 10,
    x: 0,
    y: 0,
  };

  static propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    size: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  getStyle() {
    const { size, x, y } = this.props;

    const style = {};

    if (!x) {
      style.width = '100%';
      style.height = size;
    } else if (!y) {
      style.height = '100%';
      style.width = size;
    } else {
      style.width = size;
      style.height = size;
    }

    if ((y > 0 && x < 0) || (x > 0 && y < 0)) {
      style.cursor = 'nwse-resize';
    } else if ((y < 0 && x < 0) || (x > 0 && y > 0)) {
      style.cursor = 'nesw-resize';
    } else if (!y) {
      style.cursor = 'ew-resize';
    } else {
      style.cursor = 'ns-resize';
    }

    const halfSize = size / 2;
    if (x > 0 && !y) {
      style.right = 0;
      style.top = 0;
      style.marginRight = -halfSize;
    }
    if (x < 0 && !y) {
      style.left = 0;
      style.top = 0;
      style.marginLeft = -halfSize;
    }
    if (y > 0 && !x) {
      style.left = 0;
      style.top = 0;
      style.marginTop = -halfSize;
    }
    if (y < 0 && !x) {
      style.left = 0;
      style.bottom = 0;
      style.marginBottom = -halfSize;
    }

    if (x > 0 && y > 0) {
      style.right = 0;
      style.top = 0;
      style.marginRight = -halfSize;
      style.marginTop = -halfSize;
    }
    if (x > 0 && y < 0) {
      style.right = 0;
      style.bottom = 0;
      style.marginRight = -halfSize;
      style.marginBottom = -halfSize;
    }
    if (x < 0 && y < 0) {
      style.left = 0;
      style.bottom = 0;
      style.marginLeft = -halfSize;
      style.marginBottom = -halfSize;
    }
    if (x < 0 && y > 0) {
      style.left = 0;
      style.top = 0;
      style.marginLeft = -halfSize;
      style.marginTop = -halfSize;
    }

    return style;
  }

  handleMouseDown = e => {
    const { x, y } = this.props;
    this.props.onMouseDown(e, x, y);
  };

  render() {
    const { ...passPropsThrough } = this.props;
    passPropsThrough.className = 'Resizeable__handle';
    passPropsThrough.style = this.getStyle();
    passPropsThrough.role = 'presentation';

    return createElement('div', passPropsThrough);
  }
}

export default ResizeableHandle;
