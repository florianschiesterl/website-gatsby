import React from "react";
import Img from "gatsby-image";

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function Photos(props) {
  const shuffledPosts = shuffleArray(props.data.images.nodes);

  return (
    <div>
      {shuffledPosts.map((image) => (
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
