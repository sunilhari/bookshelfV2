import React, { useState, useEffect } from "react";
import { useSearchContext } from "../../Context/SearchContext";
import { useAppContext } from "../../Context/AppContext";
import { search } from "../../api";
import {
 SET_SEARCH_TEXT,
 SET_SUGGESTIONS,
 ADD_BOOK
} from "../../Context/Actions";
import "./Input.scss";

function Input() {
 const [state, dispatch] = useSearchContext();
 const [, dispatchToApp] = useAppContext();
 const [text, setText] = useState("");
 function onInput(event) {
  setText(event.target.value);
 }
 function selectBook(event) {
  event.preventDefault();
  dispatchToApp({ type: ADD_BOOK, payload: state.activeBook });
  setText("");
 }

 useEffect(() => {
  if (text) {
   const suggestions = text ? search(text) : [];
   dispatch({ type: SET_SUGGESTIONS, payload: suggestions });
   dispatch({ type: SET_SEARCH_TEXT, payload: text });
  } else {
   dispatch({ type: SET_SEARCH_TEXT, payload: "" });
  }
 }, [text, dispatch]);

 useEffect(() => {
  setText(state.searchText);
 }, [state.searchText]);

 useEffect(() => {
  setText("");
 }, []);
 return (
  <form className="Input">
   <input
    type="text"
    className="search-input"
    onChange={onInput}
    value={text}
    data-testid="test-search-input"
   />
   <button
    className="input-button"
    onClick={selectBook}
    disabled={state.searchText === "" ? "disabled" : null}>
    Submit
   </button>
  </form>
 );
}

export default Input;
