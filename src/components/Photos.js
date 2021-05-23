import React from "react";
import Img from "gatsby-image";

function Photos(props) {
  return (
    <div>
      {props.data.images.nodes.map((image) => (
        <Img
          className="mb-16 md:mb-32 rounded"
          key={image.id}
          fluid={image.childImageSharp.fluid}
        />
      ))}
    </div>
  );
}

export default Photos;
