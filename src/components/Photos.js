import React, { useMemo, useEffect, useState, useRef } from "react";
import Img from "gatsby-image";

const FALLBACK_ALT = "Street photograph by Florian Schiesterl";

function buildAlt(name) {
  if (!name || typeof name !== "string") return FALLBACK_ALT;
  const cleaned = name
    .replace(/^[0-9]+[\s._-]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return FALLBACK_ALT;
  return `Street photograph — ${cleaned}`;
}

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

    // On larger screens, use a generous bottom margin so the next photo
    // is already visible when its top edge peeks in at the bottom of the viewport.
    // This signals to the user that they can keep scrolling.
    const bottomMargin = window.innerWidth >= 1024
      ? '300px'   // large screens: trigger 300px before entering viewport
      : window.innerWidth >= 768
        ? '150px'  // medium screens: trigger 150px before
        : '-100px'; // small screens: keep original behaviour (fade in after 100px inside viewport)

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px ${bottomMargin} 0px`,
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

    const observedRefs = imageRefs.current;
    observedRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observedRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [shuffledImages]);

  // Track which image is in the center of viewport when scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      imageRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const imageCenter = rect.top + rect.height / 2;
          const distance = Math.abs(imageCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = idx;
          }
        }
      });

      if (closestIndex !== -1 && closestDistance < window.innerHeight) {
        setFocusedImageIndex(closestIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      role="presentation"
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
              width: isPortrait ? 'auto' : '100%',
              maxWidth: isPortrait ? '100%' : '100%',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div 
              className={isPortrait ? 'max-w-full md:max-w-[50%] md:h-[95vh]' : ''}
              style={{
              width: '100%',
              height: isPortrait ? 'auto' : 'auto',
              position: 'relative',
              margin: isPortrait ? '0 auto' : '0'
            }}>
              <Img
                className="rounded pointer-events-none"
                fluid={image.childImageSharp.fluid}
                alt={buildAlt(image.name)}
                backgroundColor="#1f1f23"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                draggable={false}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  height: 'auto'
                }}
                imgStyle={{
                  objectFit: isPortrait ? 'contain' : 'cover'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Photos;
