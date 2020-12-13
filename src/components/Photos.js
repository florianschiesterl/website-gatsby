import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

function Photos(props) {
  const data = useStaticQuery(graphql`
    query Image {
      images: allFile(
        filter: { relativeDirectory: { eq: "odyssey" } }
        sort: { fields: relativePath, order: ASC }
      ) {
        nodes {
          id
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
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
