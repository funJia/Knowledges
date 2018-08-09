import React from "react";
import Footer from "./Footer";
import VisibleTodoList from "containers/VisibleTodoList";

class MainSection extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <section className="main">
        {!!this.props.todosCount && (
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={this.props.completedCount === this.props.todosCount}
            />
            <label onClick={this.props.completeAllTodos} />
          </span>
        )}
        <VisibleTodoList />
        {!!this.props.todosCount && (
          <Footer
            completedCount={this.props.completedCount}
            activeCount={this.props.todosCount - this.props.completedCount}
            onClearCompleted={this.props.onClearCompleted}
          />
        )}
      </section>
    );
  }
}

export default MainSection;
