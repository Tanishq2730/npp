import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./ImageSlider.module.scss";

interface ImageSliderProps {
  currentSlideWidth: number;
  currentSlideHeight: number;
  containerHeight: number;
  images: string[]; 
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  currentSlideWidth,
  currentSlideHeight,
  containerHeight,
  images
}) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const moveSlide = useCallback((direction: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (isDragging) {
      setCurrentX(clientX);
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) {
        // Threshold for considering it a drag
        moveSlide(diff > 0 ? 1 : -1);
      }
      setIsDragging(false);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragStart(touch.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragMove(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveSlide(-1);
      if (e.key === "ArrowRight") moveSlide(1);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [moveSlide]);

  const getSlideStyle = (position: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: `${currentSlideWidth}px`,
      height: `${currentSlideHeight}px`,
    };

    switch (position) {
      case "current":
        return baseStyle;
      case "prev":
      case "next":
        return {
          ...baseStyle,
          width: `${currentSlideWidth * 0.9}px`,
          height: `${currentSlideHeight * 0.9}px`,
        };
      case "farPrev":
      case "farNext":
        return {
          ...baseStyle,
          width: `${currentSlideWidth * 0.8}px`,
          height: `${currentSlideHeight * 0.8}px`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      className={`mx:auto md:container ${styles.sliderContainer}`}
      style={{ height: `${containerHeight}px` }}
      ref={sliderRef}
      role="button"
      aria-label="Image Slider"
      tabIndex={0} // Makes the div focusable
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // Trigger the appropriate action when Enter or Space is pressed
          // For example, you might want to start the drag or change the slide
          moveSlide(1); // Or any other action appropriate to your use case
        }
      }}
    >
      <div className={`${styles.slider}`}>
        {images.map((img, index) => {
          let position = "next";
          if (index === currentIndex) {
            position = "current";
          } else if (
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === images.length - 1)
          ) {
            position = "prev";
          } else if (
            index === currentIndex + 1 ||
            (currentIndex === images.length - 1 && index === 0)
          ) {
            position = "next";
          } else if (
            !isMobile &&
            (index === currentIndex - 2 ||
              (currentIndex === 1 && index === images.length - 1) ||
              (currentIndex === 0 && index === images.length - 2))
          ) {
            position = "farPrev";
          } else if (
            !isMobile &&
            (index === currentIndex + 2 ||
              (currentIndex === images.length - 2 && index === 0) ||
              (currentIndex === images.length - 1 && index === 1))
          ) {
            position = "farNext";
          }

          const slideStyle = getSlideStyle(position);

          return (
            <button
              type="button"
              key={img}
              className={`${styles.slide} ${
                styles[
                  `slide${position.charAt(0).toUpperCase() + position.slice(1)}`
                ]
              }`}
              style={slideStyle}
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageClick(index);
                }
              }}
              aria-label={`Slide ${index + 1}`}
              aria-current={position === "current" ? "true" : "false"}
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          );
        })}
      </div>
      <Button
        variant="filled"
        color="yellow"
        className={styles.prevButton}
        onClick={() => moveSlide(-1)}
        aria-label="Previous slide"
      >
        <IconChevronLeft size={24} />
      </Button>
      <Button
        variant="filled"
        color="yellow"
        className={styles.nextButton}
        onClick={() => moveSlide(1)}
        aria-label="Next slide"
      >
        <IconChevronRight size={24} />
      </Button>
    </div>
  );
};

export default ImageSlider;
