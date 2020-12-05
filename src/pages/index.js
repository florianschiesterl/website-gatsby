import * as React from "react";
import Headline from "../components/Headline";
import { Link } from "gatsby";

// data
const links = [
  {
    text: "Documentation",
    url: "https://www.gatsbyjs.com/docs/",
  },
  {
    text: "Tutorials",
    url: "https://www.gatsbyjs.com/tutorial/",
  },
  {
    text: "Guides",
    url: "https://www.gatsbyjs.com/tutorial/",
  },
  {
    text: "API Reference",
    url: "https://www.gatsbyjs.com/docs/api-reference/",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
  },
  {
    text: "Cheat Sheet",
    url: "https://www.gatsbyjs.com/docs/cheat-sheet/",
  },
];

const IndexPage = () => {
  return (
    <main className="bg-black h-screen w-screen">
      <title>Home Page</title>
      <section className="container p-20">
        <Headline>Congratulations Floli</Headline>
        <Link className="text-white" to="/">
          Go home
        </Link>
      </section>
    </main>
  );
};

export default IndexPage;
