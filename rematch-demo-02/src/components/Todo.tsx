import React, { Fragment } from "react";
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

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  };

  render() {
    const { text, id, completed, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={text}
          editing={this.state.editing}
          onSave={text => this.handleSave(id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => completeTodo(id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{text}</label>
          <button className="destroy" onClick={() => deleteTodo(id)} />
        </div>
      );
    }

    return (
      <Fragment>
        <li
          className={classnames({
            completed: completed,
            editing: this.state.editing
          })}
        >
          {element}
        </li>
      </Fragment>
    );
  }
}

export default Todo;
