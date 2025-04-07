import "swiper/css";
import "swiper/css/navigation";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Slide3.module.scss";
import { useParams, useRouter } from "next/navigation";

const slidesData = [
  {
    image: "/static/images/home/home3/slide1.png",
    title: "home.slide3.title1",
    subtitle: "home.slide3.subtitle1",
    fb: "https://www.facebook.com/conradksangma/",
    insta: "https://www.instagram.com/conrad_k_sangma/",
    twitter: "  https://x.com/sangmaconrad?lang=en",
  },
  {
    image: "/static/images/home/home3/slide2.png",
    title: "home.slide3.title2",
    subtitle: "home.slide3.subtitle2",
    fb: "https://www.facebook.com/jamespksangma/",
    insta: "https://www.instagram.com/jamespksangma/?hl=en",
    twitter: "https://twitter.com/JamesSangma1",
  },
  {
    image: "/static/images/home/home3/slide3.png",
    title: "home.slide3.title3",
    subtitle: "home.slide3.subtitle3",
    fb: "https://www.facebook.com/conradksangma/",
    insta: "https://www.instagram.com/conrad_k_sangma/",
    twitter: "https://x.com/sangmaconrad?lang=en",
  },
  {
    image: "/static/images/home/home3/slide4.png",
    title: "home.slide3.title4",
    subtitle: "home.slide3.subtitle4",
    fb: "https://www.facebook.com/conradksangma/",
    insta: "https://www.instagram.com/conrad_k_sangma/",
    twitter: "https://x.com/sangmaconrad?lang=en",
  },
  
];

interface Slide3Props {
  isVisible: boolean;
}

const Slide3: React.FC<Slide3Props> = ({ isVisible }) => {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const controls = useAnimation();
  const slideControls = useAnimation();
  const textControls = useAnimation();
  const router = useRouter(); // Initialize the router
  const params = useParams();
  const locale = params.locale as string;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      slideControls.start({
        y: 0,
        opacity: 1,
        transition: { delay: 0.2, duration: 0.8, ease: "easeInOut" },
      });
      textControls.start({
        x: 0,
        opacity: 1,
        transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      slideControls.start({
        y: 20,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
      textControls.start({
        x: -50,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [isVisible, controls, slideControls, textControls]);

  useEffect(() => {
    const swiperElement = swiperRef.current;

    const handleWheel = (e: WheelEvent) => {
      const swiper = swiperElement?.querySelector(
        ".swiper-container",
      ) as HTMLElement & { swiper?: SwiperType };
      if (swiper && swiper.swiper) {
        const rect = swiper.getBoundingClientRect();
        const isMouseOverSwiper =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isMouseOverSwiper) {
          e.preventDefault();
          if (e.deltaY > 0) {
            swiper.swiper.slideNext();
          } else {
            swiper.swiper.slidePrev();
          }
        }
      }
    };

    if (swiperElement) {
      swiperElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (swiperElement) {
        swiperElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleRedirect = () => {
    const slideTitle = t(slidesData[currentSlide]!.title); // Get the translated title
    const camelCaseTitle = slideTitle
      .toLowerCase() // Convert all letters to lowercase
      .replace(/\s+(.)/g, (group1) => group1.toUpperCase()) // Convert spaces to uppercase letters
      .replace(/\s+/g, ""); // Remove any remaining spaces
    console.log(camelCaseTitle); // Log the title in camelCase
    router.push(`/${locale}/info?person=${camelCaseTitle}`); // Redirect with the camelCase name
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.9, x: 100 },
    center: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 1.1, x: -100 },
  };

  const textVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      className={styles.home3}
      initial="hidden"
      animate={controls}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.home3BG}
          style={{ backgroundImage: `url(${slidesData[currentSlide]!.image})` }}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className={styles.home3Content}>
        <motion.div
          className={styles.slides}
          animate={slideControls}
          ref={swiperRef}
        >
          <Swiper
            direction={isMobile ? "horizontal" : "vertical"}
            slidesPerView={isMobile ? 2.5 : 4.5}
            spaceBetween={16}
            mousewheel={false}
            modules={[Mousewheel, Navigation]}
            className={`${styles.swiperContainer} swiper-container`}
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={slide.image}>
                <motion.div
                  className={`${styles.leaderSlides} ${currentSlide === index ? styles.activeSlide : ""}`}
                  onClick={() => handleClick(index)}
                  whileHover={{ scale: 1.1, borderColor: "#d99b2b" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Image
                    src={slide.image}
                    className="innerImg"
                    alt={`Slide ${index + 1}`}
                    width={156}
                    height={109}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.text}
            initial="enter"
            animate="center"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.h1 className="name">
              {t(slidesData[currentSlide]!.title)}
            </motion.h1>
            <motion.p className="subheading-2">
              {t(slidesData[currentSlide]!.subtitle)}
            </motion.p>
            <motion.div className={styles.moreInfo}>
              <button type="button" className="body-2" onClick={handleRedirect}>
                {t("home.slide3.button")}
              </button>
              <div className={styles.socials}>
                <a href={slidesData[currentSlide]?.fb} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/static/images/home/home3/fb.png"
                    alt="Facebook"
                    width={50}
                    height={50}
                  />
                </a>
                <a href={slidesData[currentSlide]?.insta} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/static/images/home/home3/insta.png"
                    alt="Facebook"
                    width={50}
                    height={50}
                  />
                </a>
                <a href={slidesData[currentSlide]?.twitter} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/static/images/home/home3/twitter.png"
                    alt="Facebook"
                    width={50}
                    height={50}
                  />
                </a>
               
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Slide3;
