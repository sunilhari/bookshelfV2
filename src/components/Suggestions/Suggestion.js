import React from "react";
import { useSearchContext } from "../../Context/SearchContext";
import { SET_SEARCH_TEXT, SELECTED_BOOK } from "../../Context/Actions";
import "./Suggestion.scss";
function Suggestion() {
 const [state, dispatch] = useSearchContext();
 function selectBook(event) {
  const { id } = event.currentTarget.dataset;
  const book = state.suggestions[id];
  dispatch({ type: SET_SEARCH_TEXT, payload: book.title });
  dispatch({ type: SELECTED_BOOK, payload: book });
 }
 return (
  <div className="suggestions">
   <ul>
    {state.suggestions.map((suggestion, index) => {
     return (
      <li key={index} onClick={selectBook} data-id={index}>
       {suggestion.title}
      </li>
     );
    })}
   </ul>
  </div>
 );
}

export default Suggestion;
