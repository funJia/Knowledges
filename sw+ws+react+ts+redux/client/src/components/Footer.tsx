import * as React from "react";
import FilterLink from "../containers/FilterLink";

class Footer extends React.Component<any, any> {
  private FILTER_TITLES = {
    SHOW_ALL: "All",
    SHOW_ACTIVE: "Active",
    SHOW_COMPLETED: "Completed"
  };

  constructor(props: any) {
    super(props);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  clearCompleted() {
    this.props.onClearCompleted();
  }

  showButton() {
    return (
      !!this.props.completedCount && (
        <button className="clear-completed" onClick={this.clearCompleted}>
          Clear completed
        </button>
      )
    );
  }

  showLi = () => {
    return Object.keys(this.FILTER_TITLES).map(filter => (
      <li key={filter}>
        <FilterLink filter={filter}>{this.FILTER_TITLES[filter]}</FilterLink>
      </li>
    ));
  };

  render() {
    const itemWord: any = this.props.activeCount === 1 ? "item" : "items";
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.activeCount || "No"}</strong> {itemWord} left
        </span>
        <ul className="filters">{this.showLi()}</ul>
        {this.showButton()}
      </footer>
    );
  }
}

export default Footer;
