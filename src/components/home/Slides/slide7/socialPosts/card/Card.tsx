import Image from "next/image";

import styles from "./Card.module.scss";

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles["header-poster"]}>
            <Image
              src="/static/images/home/home6/logo.png"
              alt="Profile Picture"
              width={16}
              height={23}
            />
            <div className={styles["header-text"]}>
              <h6 className="subheading-7">
                National People&apos;s Party (NPP)
              </h6>
              <p className="body-6">@nppmeghalaya</p>
            </div>
          </div>
          <Image
            src="/static/images/home/home7/twitter.png"
            alt="Twitter"
            width={16}
            height={13}
          />
        </div>
        <div>
          <p className="body-6">
            It&apos;s World Environment Day! Let&apos;s all do our bit to make
            the world a cleaner, more sustainable place. Recycle, reuse, and
            reduce waste. By working together, we can make sure our planet stays
            healthy and beautiful for generations to come.
          </p>
          <p className="body-6">💭 #NPPMeghalaya #environment #Cleanliness </p>
        </div>
      </div>
      <div className={styles.details}>
        <p className="body-7">8:45 AM · Sep 1, 2022 · Twitter for iPhone</p>
      </div>
      <hr />
      <div className={styles.footer}>
        <p className="body-7">3 Retweets</p>
        <p className="body-7">1 Quote Tweet</p>
        <p className="body-7">15 Likes</p>
      </div>
    </div>
  );
}
