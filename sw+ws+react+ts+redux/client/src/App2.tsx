import * as React from "react";
import Header from "./containers/Header";
import MainSection from "./containers/MainSection";
import "./styles/index.less";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="todoapp">
        <div>
          <div>
            <Header />
            <MainSection />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
