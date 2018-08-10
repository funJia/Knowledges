import React from "react";
import classnames from "classnames";

class Link extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <a
        className={classnames({ selected: this.props.active })}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}

export default Link;
