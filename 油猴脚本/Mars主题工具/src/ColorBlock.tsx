import * as React from 'react';
import { SketchPicker } from 'react-color'

class ColorBlock extends React.Component<any, any>
{
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    background: "red"
  };

  handleChange = (color: any) => {
    const { onChange } = this.props;
    this.setState({ background: color.hex })
    onChange && onChange(color.hex);
  };

  handleClick = () => {
    this.setState({ displayColorPicker: true })
  }

  handleCloseClick = () => {
    this.setState({ displayColorPicker: false })
  }

  constructor(props: any) {
    super(props);
    const { background } = props;
    this.state.background = background;
  }

  render() {
    const { background } = this.state;
    return <div className="color-block" >
      <div className="block" style={{ backgroundColor: background }} onClick={this.handleClick}></div>
      {this.state.displayColorPicker && <div className="picker">
        <SketchPicker color={this.state.background as any} onChange={this.handleChange} />
        <div className="close" onClick={this.handleCloseClick}>X</div>
      </div>}
    </div>;
  }
}

export default ColorBlock