import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { classesText } from "./sharedClasses";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.png";

function Layout(props) {
  const [isLight, toggleDarkmode] = useState(() => {
    // Check if we're in the browser and if there's a saved preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'light') {
        document.documentElement.classList.add('dark');
        return true;
      }
    }
    return false;
  });

  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Update localStorage when dark mode changes
    localStorage.setItem('darkMode', isLight ? 'light' : 'dark');
  }, [isLight]);

  useEffect(() => {
    // Trigger header animation
    setTimeout(() => setHeaderLoaded(true), 100);
    // Trigger content animation after header
    setTimeout(() => setContentLoaded(true), 400);
  }, []);

  return (
    <main className="w-screen bg-black dark:bg-white spring transition-colors duration-1000">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <title>Florian Schiesterl - Colorful within</title>
        <meta
          name="description"
          content="Street photographer and UX Designer from Vienna, Austria."
        />
      </Helmet>

      <div>
        <header
          style={{
            opacity: headerLoaded ? 1 : 0,
            transition: 'opacity 600ms ease-out'
          }}
        >
          <nav className="p-4 sm:p-8 flex justify-between">
            <Link to="/">
              <h1 className={classesText}>floschie</h1>
            </Link>

            <button
              aria-label="Toggle Darkmode"
              type="button"
              className="mt-2 w-6 h-6 block border-2 border-white dark:border-black rounded-full transform spring duration-200 hover:scale-150"
              onClick={() => {
                if (isLight) {
                  document.documentElement.classList.remove("dark");
                  toggleDarkmode(false);
                } else {
                  document.documentElement.classList.add("dark");
                  toggleDarkmode(true);
                }
              }}
            ></button>
          </nav>
        </header>

        <section className="container mx-auto max-w-screen-2xl">
          <div 
            className="m-4 sm:m-12 md:m-16 lg:m-36 xl:m-36"
            style={{
              opacity: contentLoaded ? 1 : 0,
              transition: 'opacity 800ms ease-out'
            }}
          >
            {props.children}
          </div>
        </section>

        <footer>
          <nav className="p-8 sm:flex sm:justify-between">
            <a
              href="https://www.instagram.com/flo_schie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={classesText}>Instagram</span>
            </a>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className={classesText}>Back to top</span>
            </button>
          </nav>
        </footer>
      </div>
    </main>
  );
}

export default Layout;
