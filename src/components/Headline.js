import React from "react";

function Headline(props) {
  return (
    <h1 className="pb-10 text-black dark:text-white text-4xl spring transition-all duration-1000">
      {props.children}
    </h1>
  );
}

export default Headline;
