import React from "react";

function Headline(props) {
  return <h1 className="py-10 text-white text-4xl">{props.children}</h1>;
}

export default Headline;
