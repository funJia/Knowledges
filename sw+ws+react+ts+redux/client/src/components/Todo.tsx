import * as React from "react";
import classnames from "classnames";
import TodoTextInput from "./TodoTextInput";

class Todo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getLiStyle = this.getLiStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      editing: false
    };
  }

  getLiStyle() {
    return {
      textDecoration: this.props.completed ? "line-through" : "none"
    };
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = text => {
    if (text.length === 0) {
      this.props.deleteTodo(this.props.id);
    } else {
      this.props.onSave(this.props.id, text);
    }
    this.setState({ editing: false });
  };

  handleDelete = () => {
    this.props.deleteTodo(this.props.id);
  };

  toggleItem = () => {
    this.props.completeTodo(this.props.id);
  };

  render() {
    const { text, completed } = this.props;
    const liStyle = {
      completed: completed,
      editing: this.state.editing
    };

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.toggleItem}
          />
          <label onDoubleClick={this.handleDoubleClick}>{text}</label>
          <button className="destroy" onClick={this.handleDelete} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <li className={classnames(liStyle)}>{element}</li>
      </React.Fragment>
    );
  }
}

export default Todo;
