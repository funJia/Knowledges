import { createSelector } from "reselect";
import { select } from "@rematch/select";
// import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const SHOW_ALL = "show_all";
const SHOW_COMPLETED = "show_completed";
const SHOW_ACTIVE = "show_active";

const getVisibilityFilter = state => {
  return state;
};

const getTodos = (currentState, todoState) => {
  return todoState;
};

export const visibilityFilter = {
  name: "visibilityFilter",
  state: "SHOW_ALL",
  reducers: {
    setVisibilityFilter(state, filter) {
      return filter;
    }
  },
  selectors: {
    getVisibleTodos: createSelector(
      [getVisibilityFilter, getTodos],
      (visibilityFilter, todos) => {
        switch (visibilityFilter) {
          case "SHOW_ALL":
            return todos;
          case "SHOW_COMPLETED":
            return todos.filter(t => t.completed);
          case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
          default:
            throw new Error("Unknown filter: " + visibilityFilter);
        }
      }
    )
  }
};
