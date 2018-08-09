import React from "react";
import Header from "containers/Header";
import MainSection from "containers/MainSection";

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <MainSection />
        {/* <VisibleTodoList />
        <Footer /> */}
      </div>
    );
  }
}

export default App;
