import { createSelector } from "reselect";
// import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const getTodos = state => {
  return state;
};

export const todos = {
  name: "todos",
  state: [],
  reducers: {
    // 添加todo 项
    addTodo(state, text) {
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: text,
          completed: false
        }
      ];
    },
    completeAllTodos(state) {
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));
    },
    completeTodo(state, id) {
      return state.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    },
    deleteTodo(state, id) {
      return state.filter(todo => todo.id !== id);
    },
    // 切换todo项状态
    toggleTodo(state, id) {
      return state.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    },
    onClearCompleted(state) {
      return state.filter(todo => todo.completed === false);
    }
  },
  selectors: {
    getCompletedTodoCount: createSelector([getTodos], todos => {
      return todos.reduce(
        (count, todo) => (todo.completed ? count + 1 : count),
        0
      );
    })
  }
};
