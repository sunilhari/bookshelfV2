import React from "react";
import "./App.scss";
import AutoComplete from "./components/AutoComplete";
import Cards from "./components/Cards";
import { AppContextProvider } from "./Context/AppContext";

function App() {
 return (
  <AppContextProvider>
   <div className="App">
    <div className="Search">
     <AutoComplete />
    </div>
    <div className="Cards">
     <Cards />
    </div>
   </div>
  </AppContextProvider>
 );
}

export default App;
