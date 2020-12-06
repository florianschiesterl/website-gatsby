import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

function Photos(props) {
  const data = useStaticQuery(graphql`
    query Image {
      images: allFile(filter: { relativeDirectory: { eq: "odyssey" } }) {
        nodes {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      image: file(
        relativePath: { eq: "odyssey/florianschiesterl_abyanne.jpg" }
      ) {
        id
        childImageSharp {
          fixed(width: 400) {
            ...GatsbyImageSharpFixed
          }
          fluid(duotone: { highlight: "#ff0000", shadow: "#00ff00" }) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  console.log(data);

  return (
    <div className="">
      {data.images.nodes.map((image) => (
        <Img
          className="mb-10 "
          key={image.id}
          fluid={image.childImageSharp.fluid}
        />
      ))}
    </div>
  );
}

export default Photos;
