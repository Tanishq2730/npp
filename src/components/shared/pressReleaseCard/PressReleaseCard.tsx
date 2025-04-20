import { IconArrowRight, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SocialShareLinks from "../socialShareLinks/SocialShareLinks";
import styles from "./PressReleaseCard.module.scss";

export interface PressReleaseCardProps {
  id: string;
  heading: string;
  details: string;
  imgPath: string;
  date: string;
  type: "event" | "pressRelease";
  isHighlighted?: boolean;
  socialLinks?: { url: string; icon: string }[];
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const PressReleaseCard: React.FC<PressReleaseCardProps> = ({
  id,
  heading,
  details,
  imgPath,
  date,
  type,
  isHighlighted,
  socialLinks,
}) => {
  const pathname = usePathname();
  const truncatedHeading = truncateText(heading, 40);
  const truncatedDetails = truncateText(details, 50);
  const linkPath = type === "event" ? `expandedEvent` : `article`;
  const linkHref = `${linkPath}/?id=${id}`;

  // Construct the full URL
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname.split("/").slice(0, -1).join("/")}/${linkHref}`
      : linkHref;

  return (
    <div className={styles["press-release-card"]}>
      <div className={styles.imageContainer}>
        <Image
          src={imgPath}
          alt={heading}
          width={434.3}
          height={375.82}
          className={styles.articleImg}
        />
        <div className={styles.share}>
          <SocialShareLinks links={socialLinks} shareUrl={fullUrl} />
        </div>
        {isHighlighted && (
          <div className={styles.highlightIcon}>
            <IconStarFilled size={24} stroke={1.5} color="#E4B001" />
          </div>
        )}
      </div>
      <div className={styles.contentWrapper}>
        {date && <h6 className={styles.date}>{date}</h6>}
        <h5 className={`subheading-4 ${styles.heading}`}>{truncatedHeading}</h5>
        <div className={styles.detailsContainer}>
          <p className={`body-3 ${styles.details}`}>{truncatedDetails}</p>
          <Link href={linkHref} passHref className={styles.readMore}>
            <IconArrowRight size={24} stroke={1.5} className={styles.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseCard;
