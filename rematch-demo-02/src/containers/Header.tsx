import React from "react";
import TodoTextInput from "components/TodoTextInput";
import { connect } from "react-redux";

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) {
              this.props.addTodo(text);
            }
          }}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

//  映射 model中reducers的方法
//  [{model,model2,...},ownProps] model,model2:model对象名 ownProps: 组件自身的prop
//  [{model:{func1,func2},model2,...},ownProps] func1，func2:model中reducers的函数
const mapDispatch = ({ todos: { addTodo } }) => ({
  addTodo: text => addTodo(text)
});

// 把redux store 注入到组件
export default connect(
  null,
  mapDispatch
)(Header);
