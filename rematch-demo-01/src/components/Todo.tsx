import React, { Fragment } from "react";

class Todo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getLiStyle = this.getLiStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getLiStyle() {
    return {
      textDecoration: this.props.completed ? "line-through" : "none"
    };
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <Fragment>
        <li onClick={this.handleClick} style={this.getLiStyle()}>
          {this.props.text}
        </li>
      </Fragment>
    );
  }
}

export default Todo;
