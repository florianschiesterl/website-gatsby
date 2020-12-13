import React from "react";
import Layout from "../components/Layout";
import { classesText } from "../components/sharedClasses";
import Image from "../components/Image";
import { Link } from "gatsby";
import classNames from "classnames";

const About = () => {
  return (
    <Layout>
      <h2 className={classesText}>About</h2>
      <p className={classesText}>
        –
        <ul>
          <li>
            Street photographer &amp;{" "}
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href="https://ux.florianschiesterl.com"
            >
              UX designer
            </a>{" "}
            based in Vienna
          </li>
          <li>Born in 1989 in Lower Austria</li>
          <li>Prints available</li>
          <li>
            <a
              className="underline"
              href="mailto:hi@florianschiesterl.com?subject=Topfengolatsche"
            >
              hi@florianschiesterl.com
            </a>
          </li>
        </ul>
      </p>
      <Image
        src="florianschiesterl_self.jpg"
        className="rounded"
        alt="Florian Schiesterl Self"
      />
      <Link className={classNames(classesText, "underline mt-20")} to="/">
        Zurück zu den Aufnahmen
      </Link>
    </Layout>
  );
};

export default About;
