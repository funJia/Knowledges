let nextTodoId = 0;
export const todos = {
  state: [],
  reducers: {
    // 添加todo 项
    addTodo(state, text) {
      return [
        ...state,
        {
          id: nextTodoId++,
          text: text,
          completed: false
        }
      ];
    },
    // 切换todo项状态
    toggleTodo(state, id) {
      return state.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    }
  }
};
