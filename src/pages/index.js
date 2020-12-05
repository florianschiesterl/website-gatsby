import * as React from "react"
import "../../styles/styles.css"

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
]

// markup
const IndexPage = () => {
  return (
    <main className="bg-black h-screen w-screen">
      <title>Home Page</title>
      <h1 className="text-white text-4xl">
        Congratulations Flo
      </h1>

    </main>
  )
}

export default IndexPage
