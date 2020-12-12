import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Navitem from "./Navitem";
import { Link } from "gatsby";
import classNames from "classnames";

function Layout(props) {
  const [isDark, setDarkmode] = useState(true);
  const [isInitialLoad, setInitialLoad] = useState(true);

  useEffect(function onFirstMount() {
    document.querySelector("html").classList.add("dark");
  }, []); // empty dependencies array means "run this once on first mount"

  const classesText = props.classesText;

  return (
    <main className="h-screen w-screen bg-black">
      <title>Florian Schiesterl - Colorful within</title>
      {props.showSpinner && isInitialLoad && (
        <div className="absolute z-20 top-1/2 left-1/2 -ml-10 -mt-2 items-center animate-fadeout pointer-events-none">
          <Spinner className="text-white animate-spin justify-center items-center" />
        </div>
      )}
      <div
        className={classNames("h-screen", {
          "animate-fadein": props.showSpinner && isInitialLoad,
        })}
      >
        <section className="bg-white dark:bg-black w-1/4 h-full p-16 pr-4 fixed spring transition-colors duration-1000">
          <nav>
            <Link
              to="/"
              onClick={() => {
                setInitialLoad(false);
              }}
            >
              <h1 className={classesText}>Florian Schiesterl</h1>
            </Link>
            {/* <h2 className={classesText}>Colorful within.</h2> */}
            <button
              aria-label="Toggle Darkmode"
              type="button"
              className="mt-3 w-6 h-6 block bg-black dark:bg-white rounded-full transform spring duration-200 hover:scale-150"
              onClick={() => {
                if (isDark) {
                  document.querySelector("html").classList.remove("dark");
                  setDarkmode(false);
                } else {
                  document.querySelector("html").classList.add("dark");
                  setDarkmode(true);
                }
              }}
            ></button>
          </nav>
          <nav className="bottom-16 left-16 absolute">
            <Navitem
              classesText={classesText}
              title="Odyssey East"
              link="/odyssey"
              onClick={() => {
                setInitialLoad(false);
              }}
            />
            <Navitem classesText={classesText} title="About" link="/" />
            <Navitem classesText={classesText} title="Instagram" link="/" />
          </nav>
        </section>

        <section className="bg-white dark:bg-black ml-1/4 w-3/4 spring transition-colors duration-1000">
          <div className="p-16">{props.children}</div>
        </section>
      </div>
    </main>
  );
}

export default Layout;
