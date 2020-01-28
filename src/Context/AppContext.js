import React, { useContext, useReducer, useMemo } from "react";
import { ADD_BOOK } from "../Context/Actions";
const defaultValue = {
 books: [],
 dispatch: () => {}
};
const AppContext = React.createContext(defaultValue);

function useAppContext() {
 const context = useContext(AppContext);
 if (!context) {
  console.log("useAppContext should be used within AppContextProvider");
  return null;
 }
 return context;
}
function AppReducer(state = {}, action) {
 switch (action.type) {
  case ADD_BOOK:
   return {
    books: [...state.books, action.payload]
   };
  default:
   return state;
 }
}

function AppContextProvider(props) {
 const [state, dispatch] = useReducer(AppReducer, defaultValue);
 const value = useMemo(() => [state, dispatch], [state]);
 return <AppContext.Provider {...props} value={value}></AppContext.Provider>;
}

export { AppContextProvider, useAppContext };
