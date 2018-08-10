import * as React from "react";
import classnames from "classnames";

class TodoTextInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: this.props.text || ""
    };
  }

  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: "" });
      }
    }
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  };

  render() {
    const textStyle = {
      edit: this.props.editing,
      "new-todo": this.props.newTodo
    };
    return (
      <input
        className={classnames(textStyle)}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

export default TodoTextInput;
