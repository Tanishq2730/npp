import type { ReactNode } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface SmoothScrollContainerProps {
  children: ReactNode[];
  showPagination?: boolean;
  paginationColor?: string;
  paginationActiveColor?: string;
}

interface ChildWithKey extends React.ReactElement {
  key: string | null;
}

const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({
  children,
  showPagination = true,
  paginationColor = "#999999",
  paginationActiveColor = "#E6B800",
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaginationVisible, setIsPaginationVisible] = useState(true);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isTouching = useRef(false);
  const isClickEvent = useRef(false);

  const syncActiveSlide = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const newActiveSlide = Math.round(scrollPosition / windowHeight);
    if (newActiveSlide !== activeSlide && newActiveSlide < children.length) {
      setActiveSlide(newActiveSlide);
    }

    // Hide pagination when scrolled past the last slide
    if (containerRef.current) {
      const containerBottom =
        containerRef.current.offsetTop + containerRef.current.offsetHeight;
      setIsPaginationVisible(scrollPosition + windowHeight < containerBottom);
    }
  }, [activeSlide, children.length]);

  const snapToSlide = (index: number) => {
    isScrolling.current = true;
    setActiveSlide(index);
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = (direction: number) => {
      const now = Date.now();
      if (isScrolling.current || now - lastScrollTime.current < 500) return;
      lastScrollTime.current = now;

      const newSlideIndex = Math.max(
        0,
        Math.min(children.length - 1, activeSlide + direction),
      );

      if (newSlideIndex !== activeSlide) {
        snapToSlide(newSlideIndex);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (activeSlide === children.length - 1 && e.deltaY > 0) {
        return;
      }
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
      isTouching.current = true;
      isClickEvent.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching.current) return;
      touchEndY.current = e.touches[0]?.clientY ?? 0;
      const touchDiff = Math.abs(touchStartY.current - touchEndY.current);
      if (touchDiff > 10) {
        isClickEvent.current = false;
      }
    };

    const handleTouchEnd = () => {
      if (!isTouching.current) return;
      isTouching.current = false;

      if (isClickEvent.current) return;

      const touchDiff = touchStartY.current - touchEndY.current;
      if (Math.abs(touchDiff) < 50) return;

      if (activeSlide === children.length - 1 && touchDiff > 50) return;

      handleScroll(touchDiff > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("scroll", syncActiveSlide);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", syncActiveSlide);
    };
  }, [activeSlide, children.length, syncActiveSlide]);

  const renderPagination = () => {
    if (!showPagination || !isPaginationVisible) return null;

    return (
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          zIndex: 1000,
        }}
      >
        {React.Children.map(children, (child, index) => {
          const key = (child as ChildWithKey).key || `pagination-dot-${index}`;
          return (
            <div
              key={String(key)}
              className={`pagination-dot ${activeSlide === index ? "active" : ""}`}
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor:
                  activeSlide === index
                    ? paginationActiveColor
                    : paginationColor,
                transition: "background-color 0.3s, transform 0.3s",
                cursor: "pointer",
                transform: activeSlide === index ? "scale(1.2)" : "scale(1)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                snapToSlide(index);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  snapToSlide(index);
                }
              }}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef}>
      {renderPagination()}
      {React.Children.map(children, (child, index) => {
        const key = (child as ChildWithKey).key || `slide-${index}`;
        return (
          <div
            key={String(key)}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            style={{ height: "100vh", overflow: "hidden" }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default SmoothScrollContainer;
