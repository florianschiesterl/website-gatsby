import React, { useEffect, useState } from "react";
import Navitem from "./Navitem";
import { Link } from "gatsby";
import { classesText } from "./sharedClasses";

function Layout(props) {
  const [isLight, toggleDarkmode] = useState(false);

  return (
    <main className="h-screen w-screen bg-black">
      <title>Florian Schiesterl - Colorful within</title>

      <div className="h-screen">
        <section className="bg-black dark:bg-white w-1/4 h-full p-16 pr-4 fixed spring transition-colors duration-1000">
          <nav>
            <Link to="/">
              <h1 className={classesText}>Florian Schiesterl</h1>
            </Link>
            {/* <h2 className={classesText}>Colorful within.</h2> */}
            <button
              aria-label="Toggle Darkmode"
              type="button"
              className="mt-3 w-6 h-6 block bg-white dark:bg-black rounded-full transform spring duration-200 hover:scale-150"
              onClick={() => {
                if (isLight) {
                  document.querySelector("html").classList.remove("dark");
                  toggleDarkmode(false);
                } else {
                  document.querySelector("html").classList.add("dark");
                  toggleDarkmode(true);
                }
              }}
            ></button>
          </nav>
          <nav className="bottom-16 left-16 absolute">
            <Navitem title="Odyssey East" link="/odyssey" />
            <Navitem title="About" link="/" />
            <Navitem title="Instagram" link="/" />
          </nav>
        </section>

        <section className="bg-black dark:bg-white ml-1/4 w-3/4 spring transition-colors duration-1000">
          <div className="p-16 animate-fadein">{props.children}</div>
        </section>
      </div>
    </main>
  );
}

export default Layout;
