import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import PasswordGeneratorComponent from "./components/Password-Generator-Component";

import './App.css';
function App() {
  return (
    <div className="App">
        <div className="container">
            <h1>
                Hello There!
            </h1>

            <PasswordGeneratorComponent/>
        </div>
    </div>
  );
}

export default App;
