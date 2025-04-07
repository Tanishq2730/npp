import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import styles from "./DesktopFooter.module.scss";

// Dynamically import the form component to avoid hydration issues
const DynamicForm = dynamic(() => import("./DesktopFooterForm"), {
  ssr: false,
});

const Footer = () => {
  const t = useTranslations();

  const renderNavLinks = (section: string) => {
    const navSection = t.raw(`footer.nav.${section}`);
    if (!navSection || !navSection.options) return null;

    return (
      <div className={styles.links}>
        <h3>
          {navSection.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="2"
            viewBox="0 0 98 2"
            fill="none"
          >
            <path
              d="M97 1L0.999996 1"
              stroke="url(#paint0_linear_265_2393)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_265_2393"
                x1="-1.21218"
                y1="1.49998"
                x2="111.7"
                y2="21.9662"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.08" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </h3>
        {navSection.options.map((option: any, index: number) => (
          <div key={`${section}-${option.uniqueId || index}`}>
            {option.items.map((item: any) => (
              <Link key={item.path} href={item.path} passHref>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundImage} />
      <div className={styles.content}>
        <div className={styles.messageBox}>
          <h2>{t("footer.form.title")}</h2>
          <DynamicForm
            t={t}
            styles={{
              inputRow: styles.inputRow as string,
              input: styles.input as string,
              textarea: styles.textarea as string,
              submitButton: styles.submitButton as string,
            }}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Image
                src="/static/images/header/party_logo.png"
                alt={t("footer.about.imgAlt")}
                width={192}
                height={86}
              />
            </div>
            <p>{t("footer.about.description")}</p>
          </div>
          {renderNavLinks("party")}
          {renderNavLinks("issues")}
          {renderNavLinks("media")}
        </div>
        <div className={styles.actions}>
          <Button
            component={Link}
            href={t.raw("footer.buttons.donate.path")}
            className={`${styles.actionButton} ${styles.donate}`}
          >
            {t("footer.buttons.donate.label")}
          </Button>
          <Button
            component={Link}
            href={t.raw("footer.buttons.join.path")}
            className={`${styles.actionButton} ${styles.join}`}
          >
            {t("footer.buttons.join.label")}
          </Button>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1152"
          height="2"
          viewBox="0 0 1152 2"
          fill="none"
        >
          <path
            d="M1 1H1151"
            stroke="url(#paint0_radial_265_2392)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <radialGradient
              id="paint0_radial_265_2392"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(562 1.49997) rotate(180) scale(615.5 596.354)"
            >
              <stop offset="0.08" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className={styles.footerBottom}>
          <p>{t("footer.disclosure.rights")}</p>
          <Link href={t.raw("footer.disclosure.privacy.path")} passHref>
            {t("footer.disclosure.privacy.label")}
          </Link>
          <Link href={t.raw("footer.disclosure.disclaimer.path")} passHref>
            {t("footer.disclosure.disclaimer.label")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
