import React, { useCallback, useEffect, useRef, useState } from "react";

import Slide1 from "./Slides/slide1/Slide1";
import Slide2 from "./Slides/slide2/Slide2";
import Slide3 from "./Slides/slide3/Slide3";
import Slide4 from "./Slides/slide4/Slide4";
import Slide5 from "./Slides/slide5/Slide5";
import Slide6 from "./Slides/slide6/Slide6";
import Slide7 from "./Slides/slide7/Slide7";

const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const slideRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isTouching = useRef(false);
  const isClickEvent = useRef(false);
  const homePageRef = useRef<HTMLDivElement>(null);

  const syncActiveSlide = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const newActiveSlide = Math.round(scrollPosition / windowHeight);
    if (newActiveSlide !== activeSlide && newActiveSlide < slideRefs.length) {
      setActiveSlide(newActiveSlide);
    }
    if (homePageRef.current && window.innerWidth > 768) {
      const homePageBottom =
        homePageRef.current.offsetTop + homePageRef.current.offsetHeight;
      setShowPagination(scrollPosition + windowHeight < homePageBottom);
    }
  }, [activeSlide, slideRefs.length]);

  useEffect(() => {
    const updatePaginationVisibility = () => {
      setShowPagination(window.innerWidth > 768);
    };

    updatePaginationVisibility();
    syncActiveSlide();

    window.addEventListener("resize", updatePaginationVisibility);
    window.addEventListener("load", syncActiveSlide);

    return () => {
      window.removeEventListener("resize", updatePaginationVisibility);
      window.removeEventListener("load", syncActiveSlide);
    };
  }, [syncActiveSlide]);

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
        Math.min(slideRefs.length - 1, activeSlide + direction),
      );

      if (newSlideIndex !== activeSlide) {
        snapToSlide(newSlideIndex);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Check if the wheel event is coming from Slide3
      if (
        activeSlide === 2 &&
        e.target &&
        (e.target as Element).closest(".swiper-container")
      ) {
        return; // Let Slide3 handle its own scroll
      }

      if (activeSlide === slideRefs.length - 1 && e.deltaY > 0) {
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

      if (isClickEvent.current) {
        return; // It was a click event, not a swipe
      }

      const touchDiff = touchStartY.current - touchEndY.current;
      if (Math.abs(touchDiff) < 50) {
        return; // Ignore small movements
      }

      if (activeSlide === slideRefs.length - 1 && touchDiff > 50) {
        return;
      }

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
  }, [activeSlide, slideRefs.length, syncActiveSlide]);

  const renderPagination = () => {
    if (!showPagination) return null;

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
        {slideRefs.map((_, index) => (
          <div
            key={`pagination-dot-${index + 1}`}
            className={`pagination-dot ${activeSlide === index ? "active" : ""}`}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: activeSlide === index ? "#E6B800" : "#999999",
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
        ))}
      </div>
    );
  };

  return (
    <div ref={homePageRef}>
      {renderPagination()}
      <div ref={slideRefs[0]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide1 />
      </div>
      <div ref={slideRefs[1]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide2 isVisible={activeSlide === 1} />
      </div>
      <div ref={slideRefs[2]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide3 isVisible={activeSlide === 2} />
      </div>
      <div ref={slideRefs[3]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide4 />
      </div>
      <div ref={slideRefs[4]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide5 />
      </div>
      <div ref={slideRefs[5]} style={{ height: "100vh", overflow: "hidden" }}>
        <Slide6 />
      </div>
      <div ref={slideRefs[6]} style={{ overflow: "hidden" }}>
        <Slide7 />
      </div>
    </div>
  );
};

export default HomePage;
