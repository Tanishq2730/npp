import { Divider } from "@mantine/core";
import Image from "next/image";

import styles from "./Intro.module.scss";

interface IntroProps {
  data: {
    name: string;
    post: string;
    description: string;
    imgAlt: string;
    desktopImageUrl: string;
    mobileImageUrl: string;
  };
}

export default function Intro({ data }: IntroProps) {
  const { name, post, description, imgAlt, desktopImageUrl, mobileImageUrl } =
    data;

  return (
    <div className={styles.intro}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.text}>
            <Divider />
            <h2>{name}</h2>
            <h3>{post}</h3>
            <p>{description}</p>
            
            <Divider className="mt-2" />
          </div>
          <Image
            src={desktopImageUrl}
            alt={imgAlt}
            width={598}
            height={739}
            className={styles["desktop-image"]}
          />
          <Image
            src={mobileImageUrl}
            alt={imgAlt}
            width={598}
            height={739}
            className={styles["mobile-image"]}
          />
        </div>
      </div>
    </div>
  );
}
