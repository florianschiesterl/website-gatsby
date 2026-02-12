import React, { useMemo, useEffect, useState, useRef } from "react";
import Img from "gatsby-image";

function Photos(props) {
  const imageRefs = useRef([]);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [focusedImageIndex, setFocusedImageIndex] = useState(-1);

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleImages(prev => new Set([...prev, index]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [shuffledImages]);

  // Prevent right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Prevent drag and drop
  const handleDragStart = (e) => {
    e.preventDefault();
  };

  // Arrow key navigation for main page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const nextIndex = Math.min(focusedImageIndex + 1, shuffledImages.length - 1);
        setFocusedImageIndex(nextIndex);
        if (imageRefs.current[nextIndex]) {
          imageRefs.current[nextIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (focusedImageIndex === 0) {
          // Scroll to top of page
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          setFocusedImageIndex(-1);
        } else {
          const prevIndex = Math.max(focusedImageIndex - 1, 0);
          setFocusedImageIndex(prevIndex);
          if (imageRefs.current[prevIndex]) {
            imageRefs.current[prevIndex].scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedImageIndex, shuffledImages.length]);

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
      {shuffledImages.map((image, idx) => {
        // Detect if image is portrait (height > width) or landscape
        const aspectRatio = image.childImageSharp.fluid.aspectRatio;
        const isPortrait = aspectRatio < 1;
        const isVisible = visibleImages.has(idx);
        
        return (
          <div
            key={image.id}
            ref={el => imageRefs.current[idx] = el}
            data-index={idx}
            className={`mb-16 md:mb-32 ${isPortrait ? 'mx-auto' : ''}`}
            style={{
              maxWidth: isPortrait ? '50%' : '100%',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Img
              className="rounded pointer-events-none"
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
          </div>
        );
      })}
    </div>
  );
}

export default Photos;
