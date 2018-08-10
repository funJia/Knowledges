import * as React from "react";
import { Route, Switch } from "react-router-dom";

/**
 * home
 */
import App from "./App2";
import AntDemo from "./containers/AntDemo";

// const routes = [
//   // 首页
//   { path: "/", component: App, exact: true },
//   // antDemo
//   { path: "/antDemo", component: AntDemo, exact: true }
// ];

// const RouteComponent = (route: any) => {
//   const renders = props => <route.component {...props} routes={route.routes} />;

//   return <Route exact={true} path={route.path} render={renders} />;
// };
// {routes.map((route, i) => <RouteComponent key={i} {...route} />)}

const Routes: React.StatelessComponent = () => {
  return (
    <Switch>
      <Route exact path="/app/antDemo" component={AntDemo} />
      <Route exact path="/app/toDoList" component={App} />
    </Switch>
  );
};

export default Routes;
