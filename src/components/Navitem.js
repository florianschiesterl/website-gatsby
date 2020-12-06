import React from "react";
import Spinner from "./Spinner";
import { Link } from "gatsby";
import classNames from "classnames";

function Navitem(props) {
  return (
    <Link
      className={classNames(props.classesText, "flex items-center group")}
      to={props.link}
    >
      <Spinner
        className={classNames(
          "transform w-4 h-4 mr-2 mt-2 justify-center items-center transform transition-all duration-500 spring rotate-6 group-hover:rotate-180"
        )}
      />{" "}
      {props.title}
    </Link>
  );
}

export default Navitem;
