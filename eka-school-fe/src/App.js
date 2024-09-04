import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import EkaSchoolContainer from "./containers/ekaSchoolContainer";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <EkaSchoolContainer />
      </div>
    </Provider>
  );
}

export default App;
