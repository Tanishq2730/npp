"use client";

import React, { useEffect, useState } from "react";

import DesktopFooter from "./desktopFooter/DesktopFooter";
import MobileFooter from "./moblieFooter/MobileFooter";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;
