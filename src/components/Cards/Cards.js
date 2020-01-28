import React from "react";
import Card from "../Card";
import { useAppContext } from "../../Context/AppContext";
import "./Cards.scss";

function Cards() {
 const [state] = useAppContext();
 if (state.books.length === 0) {
  return (
   <div className="cards-container">
    <h3 className="error">No Books Selected </h3>
   </div>
  );
 }
 return (
  <div className="cards-container">
   {state.books.map(({ id, summary, title, author }) => {
    return <Card key={id} title={title} author={author} summary={summary} />;
   })}
  </div>
 );
}

export default Cards;
