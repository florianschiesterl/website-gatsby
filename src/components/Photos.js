import React, { useMemo } from "react";
import Img from "gatsby-image";

function Photos(props) {
  // Shuffle the images array using Fisher-Yates algorithm
  const shuffledImages = useMemo(() => {
    const images = [...props.data.images.nodes];
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    return images;
  }, [props.data.images.nodes]);

  // Prevent right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Prevent drag and drop
  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      onContextMenu={handleContextMenu}
      className="select-none"
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {shuffledImages.map((image, idx) => (
        <Img
          className="mb-16 md:mb-32 rounded pointer-events-none"
          key={image.id}
          fluid={image.childImageSharp.fluid}
          backgroundColor="#1f1f23"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          draggable="false"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
        />
      ))}
    </div>
  );
}

export default Photos;
