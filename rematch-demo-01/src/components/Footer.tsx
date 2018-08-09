import React from "react";
import FilterLink from "containers/FilterLink";

class Footer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <span>Show: </span>
        <FilterLink filter={"SHOW_ALL"}>All</FilterLink>
        <FilterLink filter={"SHOW_ACTIVE"}>Active</FilterLink>
        <FilterLink filter={"SHOW_COMPLETED"}>Completed</FilterLink>
      </div>
    );
  }
}

export default Footer;
