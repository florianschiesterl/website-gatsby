import React from "react";
import Headline from "./Headline";
import { Link } from "gatsby";

function Menubar(props) {
  return (
    <nav>
      <Headline>Congratulations Floli</Headline>
      <Link className="text-black dark:text-white" to="/">
        Go home
      </Link>
    </nav>
  );
}

export default Menubar;
