import React from "react";
import { connect } from "react-redux";

class AddTodo extends React.Component<any, any> {
  private todoInput: any;

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.setToDoInputRef = this.setToDoInputRef.bind(this);
  }

  submit(e: any) {
    e.preventDefault();
    if (!this.todoInput.value.trim()) {
      return;
    }
    this.props.addTodo(this.todoInput.value);
    this.todoInput.value = "";
  }

  setToDoInputRef(ref: any) {
    this.todoInput = ref;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input ref={this.setToDoInputRef} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

//  映射 model中的state
//  [{state},ownProps] state:model中的state ownProps:组件自身的prop
const mapState = state => ({
  todos: state.todos
});

//  映射 model中reducers的方法
//  [{model,model2,...},ownProps] model,model2:model对象名 ownProps: 组件自身的prop
//  [{model:{func1,func2},model2,...},ownProps] func1，func2:model中reducers的函数
const mapDispatch = ({ todos: { addTodo } }) => ({
  addTodo: text => addTodo(text)
});

// 把redux store 注入到组件
export default connect(
  mapState,
  mapDispatch
)(AddTodo);
