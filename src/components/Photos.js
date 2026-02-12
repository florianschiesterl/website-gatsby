import React, { useMemo, useEffect, useState, useRef } from "react";
import Img from "gatsby-image";

function Photos(props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagePosition, setImagePosition] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

  // Open lightbox
  const openLightbox = (index) => {
    const imageElement = imageRefs.current[index];
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      setImagePosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
    setCurrentImageIndex(index);
    setIsAnimating(true);
    setLightboxOpen(true);
    
    // Trigger animation after state is set
    setTimeout(() => {
      setIsAnimating(false);
    }, 50);
  };

  // Close lightbox
  const closeLightbox = () => {
    // Capture the position of the current image before closing
    const imageElement = imageRefs.current[currentImageIndex];
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      setImagePosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
    
    setIsAnimating(true);
    
    // Wait for animation to complete before closing
    setTimeout(() => {
      setLightboxOpen(false);
      setIsAnimating(false);
      setImagePosition(null);
      
      // Scroll to the current image position after lightbox closes
      setTimeout(() => {
        if (imageRefs.current[currentImageIndex]) {
          imageRefs.current[currentImageIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    }, 300);
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shuffledImages.length);
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, shuffledImages.length]);

  // Arrow key navigation for main page (when lightbox is closed)
  useEffect(() => {
    if (lightboxOpen) return;

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
        const prevIndex = Math.max(focusedImageIndex - 1, 0);
        setFocusedImageIndex(prevIndex);
        if (imageRefs.current[prevIndex]) {
          imageRefs.current[prevIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, focusedImageIndex, shuffledImages.length]);

  return (
    <>
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
              className={`mb-16 md:mb-32 ${isPortrait ? 'mx-auto' : ''} cursor-pointer`}
              style={{
                maxWidth: isPortrait ? '50%' : '100%',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={() => openLightbox(idx)}
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ 
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 300ms ease-in-out'
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors"
            style={{ 
              cursor: 'pointer', 
              zIndex: 10000,
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 300ms ease-in-out'
            }}
          >
            ×
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white text-5xl font-light hover:text-gray-300 transition-colors"
            style={{ 
              cursor: 'pointer', 
              zIndex: 10000,
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 300ms ease-in-out'
            }}
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white text-5xl font-light hover:text-gray-300 transition-colors"
            style={{ 
              cursor: 'pointer', 
              zIndex: 10000,
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 300ms ease-in-out'
            }}
          >
            ›
          </button>

          {/* Current image */}
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: isAnimating && imagePosition ? 'fixed' : 'relative',
              top: isAnimating && imagePosition ? `${imagePosition.top}px` : 'auto',
              left: isAnimating && imagePosition ? `${imagePosition.left}px` : 'auto',
              width: isAnimating && imagePosition ? `${imagePosition.width}px` : '90vw',
              height: isAnimating && imagePosition ? `${imagePosition.height}px` : '90vh',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'center center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={shuffledImages[currentImageIndex].childImageSharp.fluid.src}
              srcSet={shuffledImages[currentImageIndex].childImageSharp.fluid.srcSet}
              alt=""
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Photos;
