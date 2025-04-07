import Image from "next/image";
import React from "react";

import SocialShareLinks from "../socialShareLinks/SocialShareLinks";
import styles from "./AboutPart.module.scss";
import { useParams, useRouter } from "next/navigation";

interface SharedAboutProps {
  imgSrc: string;
  title: string;
  imgAlt: string;
  description: string;
  buttonText: string;
  date?: string;
  showReadMore?: boolean;
  isExpanded?: boolean;
  onReadMoreClick?: () => void;
  socialLinks?: { url: string; icon: string }[];
  url?: string;
}

const AboutPart: React.FC<SharedAboutProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  date,
  showReadMore = false,
  isExpanded = false,
  onReadMoreClick,
  socialLinks,
  url,
}) => {
  const router = useRouter(); // Initialize the router
  const params = useParams();
  const locale = params.locale as string;
  function handleClick() {
    router.push(`/${locale}/join`);
  }
  return (
    <div className={styles.about}>
      <div className={styles.imageContainer}>
        <Image src={imgSrc} alt={imgAlt} width={713.64} height={476} />
      </div>
      <div className={styles["about-content"]}>
        <div className="flex justify-between">
          {date && <h6>{date}</h6>}
          <SocialShareLinks shareUrl={url} links={socialLinks} />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles["button-container"]}>
          <button
            type="button"
            className={styles["join-button"]}
            onClick={handleClick}
          >
            {buttonText}
          </button>
          {showReadMore && (
            <button
              type="button"
              className={styles["read-more"]}
              onClick={onReadMoreClick}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPart;
