"use client";

import { Button, Select } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import headerStyle from "./Header.module.scss";
import MobileMenu from "./mobileHeader/MobileMenu";

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

const Header = () => {
  const t = useTranslations("header");
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = Object.entries(t.raw("nav")) as [string, NavItem][];

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.logo}>
        {/* <Image
          src="/static/images/header/party_logo.png"
          alt="National People's Party"
          width={192}
          height={86}
          sizes="(max-width: 768px) 150px, (max-width: 1024px) 180px, 192px"
        /> */}
      </div>

      <nav className={headerStyle.navbar}>
        <div
          className={`${headerStyle.top} ${headerStyle.disappear} subheading-5`}
        >
          <Select
            data={Object.entries(
              t.raw("language") as Record<string, string>,
            ).map(([key, value]) => ({ value: key, label: value as string }))}
            defaultValue="eng"
            classNames={{
              input: headerStyle.mantineSelect,
              dropdown: headerStyle.mantineDropdown,
            }}
          />
          <Button
            variant="subtle"
            className={headerStyle.mantineButtonSubtle}
            onClick={() => handleNavigation(t("join.link"))}
          >
            {t("join.label")}
          </Button>
          <Button
            className={headerStyle.mantineButtonRoot}
            onClick={() => handleNavigation(t("donation.link"))}
          >
            {t("donation.label")}
          </Button>
        </div>
        <ul className="subheading-5">
          {navItems.map(([key, item]) => (
            <li
              key={key}
              className={`${headerStyle.disappear} ${item.options ? headerStyle.hasDropdown : ""}`}
              onMouseEnter={() => toggleDropdown(key)}
              onMouseLeave={() => toggleDropdown(key)}
            >
              <button
                type="button"
                onClick={() => handleNavigation(item.path)}
                className={`${headerStyle.navItemButton} subheading-6`}
              >
                {item.label}
              </button>
              {item.options && (
                <AnimatePresence>
                  {openDropdown === key && (
                    <motion.div
                      className={headerStyle.dropdownMenu}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.options.map((option) => (
                        <ul key={option.items[0]?.label}>
                          {option.items.map((subItem) => (
                            <li key={subItem.label}>
                              <Button
                                onClick={() => handleNavigation(subItem.path)}
                                className="subheading-6 my-auto"
                              >
                                {subItem.label}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
          <li className={headerStyle.mobileMenuToggle}>
            <Button
              variant="subtle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={headerStyle.menuButton}
            >
              <Image
                className={headerStyle.menu}
                src="/static/images/header/menu.png"
                alt="menu"
                width={33}
                height={21}
              />
            </Button>
          </li>
        </ul>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
