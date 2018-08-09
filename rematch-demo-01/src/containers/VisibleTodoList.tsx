import { connect } from "react-redux";
import TodoList from "../components/TodoList";
// import { VisibilityFilters } from '../actions'
// import { VisibilityFilter } from "../enums/visibilityFilter";

const getVisibleTodos = (todos: any, filter: any) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((t: any) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t: any) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

//  映射 model中的state
//  [{state},ownProps] state:model中的state ownProps:组件自身的prop
const mapStateToProps = (state: any) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

//  映射 model中reducers的方法
//  [{model,model2,...},ownProps] model,model2:model对象名 ownProps: 组件自身的prop
//  [{model:{func1,func2},model2,...},ownProps] func1，func2:model中reducers的函数
const mapDispatchToProps = ({ todos }: any) => ({
  toggleTodo: (id: any) => todos.toggleTodo(id)
});

// 把redux store 注入到组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
