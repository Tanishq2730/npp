import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import styles from "./Slide1.module.scss";
import SubSlide1 from "./subSlides/subSlide1/SubSlide1";
import SubSlide2 from "./subSlides/subSlide2/SubSlide2";
import SubSlide3 from "./subSlides/subSlide3/SubSlide3";
import SubSlide4 from "./subSlides/subSlide4/SubSlide4";
import SubSlide5 from "./subSlides/subSlide5/SubSlide5";

enum SubSlides {
  subSlide1 = "SubSlide 1",
  subSlide2 = "SubSlide 2",
  subSlide3 = "SubSlide 3",
  subSlide4 = "SubSlide 4",
  subSlide5 = "SubSlide 5",
}

const subSlideComponents = {
  [SubSlides.subSlide1]: SubSlide1,
  [SubSlides.subSlide2]: SubSlide2,
  [SubSlides.subSlide3]: SubSlide3,
  [SubSlides.subSlide4]: SubSlide4,
  [SubSlides.subSlide5]: SubSlide5,
};

const socialIcons = [
  {
    icon: <FaFacebookF style={{ color: "#fff" }} />,
    alt: "Facebook",
    link: "https://www.facebook.com/nppmeghalaya/",
  },
  {
    icon: <FaXTwitter style={{ color: "#fff" }} />,
    alt: "Twitter",
    link: "https://x.com/nppmeghalaya?lang=en",
  },
  {
    icon: <FaYoutube style={{ color: "#fff" }} />,
    alt: "YouTube",
    link: "https://www.youtube.com/channel/UCljPxUJSs_SP29U_GavdJlQ",
  },
  {
    icon: <FaInstagram style={{ color: "#fff" }} />,
    alt: "Instagram",
    link: "https://www.instagram.com/nppmeghalaya/?hl=en",
  },
];

const Slide1 = () => {
  const [activeSubSlide, setActiveSubSlide] = useState(SubSlides.subSlide1);

  const ActiveSubSlideComponent = subSlideComponents[activeSubSlide];

  const slideTransition = {
    initial: { opacity: 0, scale: 0.95, x: 50 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.95, x: -50 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  return (
    <div className={styles.home1}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubSlide}
          initial={slideTransition.initial}
          animate={slideTransition.animate}
          exit={slideTransition.exit}
          transition={slideTransition.transition}
        >
          <ActiveSubSlideComponent />
        </motion.div>
      </AnimatePresence>

      <div className={styles.home1__foot}>
        {activeSubSlide === SubSlides.subSlide1 && (
          <>
            {/* <div className="web">
              <Image
                src="/static/images/home/home1/silhouettes.jpg"
                alt="Public Applause"
                width={1519}
                height={171}
                className={styles.silhouettes}
              />
            </div>
            <div className="mob">
              <Image
                src="/static/images/home/home1/silhouettes.jpg"
                alt="Public Applause"
                width={1519}
                height={171}
                className={styles.silhouettes}
              />
            </div> */}
          </>
        )}

        <div className={styles.social}>
          {socialIcons.map((iconData, index) => (
            <a
              key={index}
              href={iconData.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              {iconData.icon}
            </a>
          ))}
        </div>

        <div className={styles.subSlides}>
          <Image
            src="/static/images/home/home1/icons/mouse.png"
            alt="Mouse"
            width={92}
            height={106}
            className={styles.mouse}
          />
          {Object.values(SubSlides).map((slide, index) => (
            <Image
              key={slide}
              src={`/static/images/home/home1/slide${index + 1}.png`}
              alt={`Slide ${index + 1}`}
              width={157}
              height={102}
              onClick={() => setActiveSubSlide(slide)}
              className={activeSubSlide === slide ? styles.selected : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide1;
