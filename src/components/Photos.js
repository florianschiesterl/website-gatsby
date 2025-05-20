import React, { useMemo, useEffect } from "react";
import Img from "gatsby-image";

function Photos(props) {
  // Shuffle the images array using Fisher-Yates algorithm with first position tracking
  const shuffledImages = useMemo(() => {
    const images = [...props.data.images.nodes];
    
    // Get the history of recently used first images
    let recentFirstImages = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recentFirstImages');
      if (stored) {
        recentFirstImages = JSON.parse(stored);
      }
    }

    // Find eligible images for first position (not in recent history)
    const eligibleFirstImages = images.filter(img => !recentFirstImages.includes(img.id));
    
    // If we have eligible images, use one of them as first
    if (eligibleFirstImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleFirstImages.length);
      const firstImage = eligibleFirstImages[randomIndex];
      
      // Remove the chosen image from the array
      const remainingImages = images.filter(img => img.id !== firstImage.id);
      
      // Shuffle remaining images
      for (let i = remainingImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingImages[i], remainingImages[j]] = [remainingImages[j], remainingImages[i]];
      }
      
      // Update recent first images history
      const newRecentFirstImages = [firstImage.id, ...recentFirstImages].slice(0, 5);
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentFirstImages', JSON.stringify(newRecentFirstImages));
      }
      
      return [firstImage, ...remainingImages];
    }
    
    // If all images have been used recently, clear history and shuffle normally
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recentFirstImages');
    }
    
    // Regular shuffle as fallback
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
