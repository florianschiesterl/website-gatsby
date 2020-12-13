import React from "react";
import Tilde from "./Tilde";
import { Link } from "gatsby";
import classNames from "classnames";
import { classesText } from "./sharedClasses";

function Navitem(props) {
  return (
    <Link
      className={classNames(classesText, "flex items-center group lg:-ml-6")}
      to={props.link}
      target={props.target}
      activeClassName="active"
    >
      <Tilde
        className={classNames(
          "fs-showonactive w-4 h-4 mr-2 mt-2 justify-center items-center transform transition-all duration-500 spring rotate-6 group-hover:rotate-180"
        )}
      />
      <span>{props.title}</span>
    </Link>
  );
}

export default Navitem;
