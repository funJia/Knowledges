import { connect } from "react-redux";
// import { getCompletedTodoCount } from "../selectors/";
import MainSection from "../components/MainSection";
import { select } from "@rematch/select";

//  映射 model中的state
//  [{state},ownProps] state:model中的state ownProps:组件自身的prop
const mapState = state => ({
  todosCount: state.todos.length,
  completedCount: select.todos.getCompletedTodoCount(state)
});

//  映射 model中reducers的方法
//  [{model,model2,...},ownProps] model,model2:model对象名 ownProps: 组件自身的prop
//  [{model:{func1,func2},model2,...},ownProps] func1，func2:model中reducers的函数
const mapDispatch = dispatch => {
  return {
    completeAllTodos: dispatch.todos.completeAllTodos,
    onClearCompleted: dispatch.todos.onClearCompleted
  };
};

// 把redux store 注入到组件
export default connect(
  mapState,
  mapDispatch
)(MainSection);
