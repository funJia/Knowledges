import * as React from "react";
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
    let props: any = {
      toggleTodo: this.props.toggleTodo,
      completeTodo: this.props.completeTodo,
      deleteTodo: this.props.deleteTodo,
      onSave: this.props.onSave
    };
    return this.props.todos.map((todo: any, index: number) => {
      return <Todo key={index} {...todo} {...props} />;
    });
  }

  render() {
    return <ul className="todo-list">{this.mapTodo()}</ul>;
  }
}

export default TodoList;
