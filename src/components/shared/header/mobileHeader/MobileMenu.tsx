import { Accordion, ActionIcon, Button, Select } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconChevronDown,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import styles from "./MobileMenu.module.scss";

interface NavItem {
  label: string;
  path: string;
  options?: {
    items: {
      label: string;
      path: string;
    }[];
  }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const navItems = Object.entries(t.raw("nav") as Record<string, NavItem>);

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const menuVariants = {
    closed: { x: "100%", transition: { duration: 0.3 } },
    open: { x: 0, transition: { duration: 0.3 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.mobileMenu}
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className={styles.menuHeader}>
            <Image
              src="/static/images/header/party_logo.png"
              alt="National People's Party"
              width={96}
              height={43}
            />
            <ActionIcon onClick={onClose} variant="transparent" color="gray">
              <IconX size={24} />
            </ActionIcon>
          </div>
          <Accordion
            className={styles.accordion}
            chevronPosition="right"
            chevron={
              <IconChevronDown size={16} className={styles.accordionChevron} />
            }
            classNames={{
              item: styles.accordionItem,
              control: styles.accordionControl,
              content: styles.accordionContent,
              panel: styles.accordionPanel,
            }}
          >
            {navItems.map(([key, item]) =>
              item.options ? (
                <Accordion.Item key={key} value={key}>
                  <Accordion.Control
                    className={`${styles.accordionControl} ${styles.light} subheading-4`}
                  >
                    {item.label}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item.options[0]?.items.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`${styles.subMenuItem} body-1`}
                        type="button"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ) : (
                <button
                  key={key}
                  onClick={() => handleNavigation(item.path)}
                  className={`${styles.menuItem} ${styles.bold} subheading-4`}
                  type="button"
                >
                  {item.label}
                </button>
              ),
            )}
          </Accordion>
          <div className={styles.actionButtons}>
            <Button
              fullWidth
              className={`${styles.actionButton} ${styles.memberButton} subheading-4`}
              onClick={() => handleNavigation(t("join.link"))}
            >
              {t("join.label")}
            </Button>
            {/* <Button
              fullWidth
              className={`${styles.actionButton} ${styles.volunteerButton} subheading-4`}
              onClick={() => handleNavigation('/volunteer')}
            >
              JOIN AS VOLUNTEER
            </Button> */}
            <Button
              fullWidth
              variant="outline"
              className={`${styles.actionButton} ${styles.donateButton} subheading-4`}
              onClick={() => handleNavigation(t("donation.link"))}
            >
              {t("donation.label")}
            </Button>
          </div>
          <div className={styles.footer}>
            <Select
              data={Object.entries(
                t.raw("language") as Record<string, string>,
              ).map(([key, value]) => ({ value: key, label: value }))}
              defaultValue="eng"
              className={`${styles.languageSelect} body-1`}
              classNames={{
                input: styles.languageSelectInput,
              }}
            />
            <div className={styles.socialIcons}>
              <ActionIcon variant="transparent" className={styles.socialIcon}>
                <IconSearch size={20} />
              </ActionIcon>
              <ActionIcon variant="transparent" className={styles.socialIcon}>
                <IconBrandFacebook size={20} />
              </ActionIcon>
              <ActionIcon variant="transparent" className={styles.socialIcon}>
                <IconBrandTwitter size={20} />
              </ActionIcon>
              <ActionIcon variant="transparent" className={styles.socialIcon}>
                <IconBrandLinkedin size={20} />
              </ActionIcon>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
