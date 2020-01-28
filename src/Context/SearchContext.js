import React, { useContext, useReducer, useMemo } from "react";
import {
 SET_SEARCH_TEXT,
 SET_SUGGESTIONS,
 CLEAR_INPUT,
 SELECTED_BOOK
} from "./Actions";
const defaultState = {
 suggestions: [],
 searchText: "",
 activeBook: {}
};
const SearchContext = React.createContext(defaultState);

function useSearchContext() {
 const context = useContext(SearchContext);
 if (!context) {
  console.log("useSearchContext should be used within SearchContextProvider");
  return null;
 }
 return context;
}
function SearchReducer(state = {}, action) {
 switch (action.type) {
  case SET_SUGGESTIONS:
   return {
    ...state,
    suggestions: action.payload || []
   };

  case SET_SEARCH_TEXT:
   return {
    ...state,
    searchText: action.payload || ""
   };
  case CLEAR_INPUT:
   return {
    ...state,
    inputText: ""
   };
  case SELECTED_BOOK:
   return {
    ...state,
    activeBook: action.payload
   };
  default:
   return state;
 }
}

function SearchContextProvider(props) {
 const [state, dispatch] = useReducer(SearchReducer, defaultState);
 const value = useMemo(() => [state, dispatch], [state]);
 return (
  <SearchContext.Provider {...props} value={value}></SearchContext.Provider>
 );
}

export { SearchContextProvider, useSearchContext };
