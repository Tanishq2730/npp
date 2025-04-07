import Image from "next/image";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  date: string; // ISO string or formatted date
  description: string;
}

export default function Card({ title, date, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles["header-poster"]}>
          <Image
            src="/static/images/home/home6/logo.png"
            alt="Profile Picture"
            width={16}
            height={23}
          />
          <div className={styles["header-text"]}>
            <h6 className="subheading-7">{title}</h6>
            <p className="body-6">{new Date(date).toLocaleDateString()}</p>
          </div>
        </div>
        <Image
          src="/static/images/home/home7/twitter.png"
          alt="Twitter"
          width={16}
          height={13}
        />
      </div>
      <div className={styles.content}>
        <p className="body-6">{description}</p>
      </div>
    </div>
  );
}
