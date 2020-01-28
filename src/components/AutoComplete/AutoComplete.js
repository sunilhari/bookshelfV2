import React from "react";
import Input from "../Input";
import Suggestions from "../Suggestions";
import { SearchContextProvider } from "../../Context/SearchContext";
import "./AutoComplete.scss";

function AutoComplete() {
 return (
  <div className="autoComplete">
   <SearchContextProvider>
    <Input />
    <Suggestions />
   </SearchContextProvider>
  </div>
 );
}

export default AutoComplete;
