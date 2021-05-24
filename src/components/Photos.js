import React from "react";
import Img from "gatsby-image";

function Photos(props) {
  return (
    <div>
      {props.data.images.nodes.map((image, idx) => (
        <Img
          className="mb-16 md:mb-32 rounded"
          key={image.idx}
          fluid={image.childImageSharp.fluid}
          backgroundColor="#1f1f23"
        />
      ))}
    </div>
  );
}

export default Photos;
