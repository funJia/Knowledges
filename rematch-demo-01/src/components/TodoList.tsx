import React from "react";
import Todo from "./Todo";

class TodoList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.props = props;
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  toggleTodo(id) {
    this.props.toggleTodo(id);
  }

  mapTodo() {
    return this.props.todos.map((todo: any, index: number) => {
      return <Todo key={index} {...todo} onClick={this.toggleTodo} />;
    });
  }

  render() {
    return <ul>{this.mapTodo()}</ul>;
  }
}

export default TodoList;
