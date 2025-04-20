import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import styles from "./Slide6.module.scss";

const Slide6: React.FC = () => {
  const t = useTranslations("home.slide6");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleNavigation = (path: string) => {
    router.push(`/${locale}/${path}`);
  };

  return (
    <section className={styles.home6}>
      <div className={styles.content}>
        {/* Heading */}
        <h1>
          {t("heading").split("  ")[0]}{" "}
          <span className={styles.journey}>{t("heading").split("  ")[1]}</span>
        </h1>
        <span className="subheading-1">{t("subheading")}</span>

        {/* Paragraphs */}
        <p className="body-3">{t("para1")}</p>
        <p className="body-3">{t("para2")}</p>

        {/* Buttons */}
        <div className={styles.buttons}>
          {[
            { label: t("buttons.member"), path: "join", style: styles.member },
            {
              label: t("buttons.volunteer"),
              path: "join",
              style: styles.volunteer,
            },
            {
              label: t("buttons.donate"),
              path: "donate",
              style: styles.donation,
            },
          ].map((button) => (
            <button
              key={button.path}
              type="button"
              className={`body-2 ${button.style}`}
              onClick={() => handleNavigation(button.path)}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Tagline */}
        <div className={styles.tagline}>
          <Image
            src="/static/images/home/home6/logo.png"
            alt={t("footerTagline.imgAlt")}
            width={31}
            height={45}
          />
          <div className="subheading-6">
            <span>{t("footerTagline.united")}</span>
            <br />
            <span>{t("footerTagline.transform")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide6;
