import { Accordion, Button, Textarea, TextInput } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import styles from "./MobileFooter.module.scss";

const MobileFooter = () => {
  const t = useTranslations();

  const renderNavLinks = (section: string) => {
    const navSection = t.raw(`footer.nav.${section}`);
    if (!navSection || !navSection.options) return null;

    return (
      <Accordion.Item value={section}>
        <Accordion.Control className={styles.mantineAccordionControl}>
          {navSection.label}
        </Accordion.Control>
        <Accordion.Panel className={styles.mantineAccordionPanel}>
          {navSection.options.map((option: any) => (
            <React.Fragment key={`${section}-${option.uniqueId}`}>
              {option.items.map((item: any) => (
                <Link key={item.id} href={item.path} passHref legacyBehavior>
                  <button type="button" className={styles.accordionLink}>
                    {item.label}
                  </button>
                </Link>
              ))}
            </React.Fragment>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    );
  };

  return (
    <footer className={styles.mobileFooter}>
      <motion.div
        className={styles.logo}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/static/images/header/party_logo.png"
          alt={t("footer.about.imgAlt")}
          width={96}
          height={43}
        />
      </motion.div>

      <motion.div
        className={styles.messageBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>{t("footer.form.title")}</h2>
        <form>
          <TextInput
            placeholder={t("footer.form.namePlaceholder")}
            className={styles.input}
          />
          <TextInput
            type="email"
            placeholder={t("footer.form.mailPlaceholder")}
            className={styles.input}
          />
          <Textarea
            placeholder="Write your message here"
            className={styles.textarea}
          />
          <Button type="submit" className={styles.submitButton}>
            {t("footer.form.send")}
          </Button>
        </form>
      </motion.div>

      <motion.div
        className={styles.siteNavigator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3>SITE NAVIGATOR</h3>
        <Accordion className={styles.accordion}>
          {renderNavLinks("party")}
          {renderNavLinks("issues")}
          {renderNavLinks("media")}
        </Accordion>
      </motion.div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          component={Link}
          href={t.raw("footer.buttons.donate.path")}
          fullWidth
          className={styles.donateButton}
        >
          {t("footer.buttons.donate.label")}
        </Button>
        <Button
          component={Link}
          href={t.raw("footer.buttons.join.path")}
          fullWidth
          className={styles.joinButton}
        >
          {t("footer.buttons.join.label")}
        </Button>
      </motion.div>

      <motion.div
        className={styles.social}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Link href="/" aria-label="Facebook">
          <i className="fab fa-facebook-f" />
        </Link>
        <Link href="/" aria-label="Twitter">
          <i className="fab fa-twitter" />
        </Link>
        <Link href="/" aria-label="YouTube">
          <i className="fab fa-youtube" />
        </Link>
        <Link href="/" aria-label="Instagram">
          <i className="fab fa-instagram" />
        </Link>
      </motion.div>

      <motion.div
        className={styles.footerBottom}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>{t("footer.disclosure.rights")}</p>
        <div>
          <Link href={t.raw("footer.disclosure.privacy.path")}>
            {t("footer.disclosure.privacy.label")}
          </Link>
          <Link href={t.raw("footer.disclosure.disclaimer.path")}>
            {t("footer.disclosure.disclaimer.label")}
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};

export default MobileFooter;
