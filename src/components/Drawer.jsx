import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import zindex from '../shared/zindex';

export default class Drawer extends Base {
  static propTypes = {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.node,
    open: React.PropTypes.bool,
    openFrom: React.PropTypes.oneOf(['left', 'right']),
    width: React.PropTypes.number,
  };

  static defaultProps = {
    open: false,
    openFrom: 'right',
    width: 300,
  };

  displayName = 'Drawer';

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        Drawer: {
          width: this.props.width,
          height: '100%',
          position: 'fixed',
          top: 0,
          right: this.props.openFrom === 'right' ? this.props.width * -1 : undefined,
          left: this.props.openFrom === 'left' ? this.props.width * -1 : undefined,
          background: clr.backgroundColors.primary,
          zIndex: zindex.Drawer,
          transition: 'all 0.3s ease',
        },
      },
      open: {
        Drawer: {
          right: this.props.openFrom === 'right' ? 0 : undefined,
          left: this.props.openFrom === 'left' ? 0 : undefined,
        },
      },
      backgroundColor: {
        Drawer: {
          background: this.props.backgroundColor,
        },
      },
    }, {
      open: this.props.open,
      backgroundColor: !!this.props.backgroundColor,
    });
    return (
      <div
        style={style.Drawer}
      >
        {this.props.children}
      </div>
    );
  }
}
