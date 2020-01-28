import React from "react";
import "./Card.scss";

function Card({ title, author, summary }) {
 return (
  <div className="card">
   <h2>{title}</h2>
   <p>{summary}</p>
   <hr />
   <p>{author}</p>
  </div>
 );
}

export default Card;
