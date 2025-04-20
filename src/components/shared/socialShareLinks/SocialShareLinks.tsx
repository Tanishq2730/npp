import { Button, Group, Modal } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconLink,
  IconShare,
} from "@tabler/icons-react";
import React, { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import styles from "./SocialShareLinks.module.scss";

interface SocialLink {
  url: string;
  icon: string;
}

interface SocialShareLinksProps {
  links?: SocialLink[];
  shareUrl?: string;
  shareTitle?: string;
  iconSize?: number;
}

const SocialShareLinks: React.FC<SocialShareLinksProps> = ({
  links,
  shareUrl,
  shareTitle,
  iconSize = 16,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "facebook":
        return <IconBrandFacebook size={iconSize} />;
      case "twitter":
        return <IconBrandTwitter size={iconSize} />;
      case "youtube":
        return <IconBrandYoutube size={iconSize} />;
      case "instagram":
        return <IconBrandInstagram size={iconSize} />;
      default:
        return null;
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInstagramShare = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleCopyLink = async () => {
    try {
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      setError("Failed to copy link to clipboard");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className={styles.socialShareLinksContainer}>
      {links &&
        links.map((link) => (
          <a
            key={`${link.icon}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            data-icon={link.icon}
          >
            {getSocialIcon(link.icon)}
          </a>
        ))}
      {shareUrl && (
        <Button
          onClick={handleOpenModal}
          className={styles.shareButton}
          aria-label="Share this content"
        >
          <IconShare size={iconSize} />
        </Button>
      )}

      {shareUrl && (
        <Modal
          opened={isModalOpen}
          onClose={handleCloseModal}
          title="Share this content"
          classNames={{ title: styles.modalTitle }}
        >
          <Group className={styles.shareGroup}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <EmailShareButton url={shareUrl} subject={shareTitle}>
              <EmailIcon size={32} round />
            </EmailShareButton>

            <Button
              onClick={handleInstagramShare}
              variant="outline"
              color="pink"
              className={styles.roundButton}
              data-icon="instagram"
            >
              <IconBrandInstagram size={20} />
            </Button>

            <Button
              onClick={handleCopyLink}
              variant="outline"
              color="gray"
              className={styles.roundButton}
              data-icon="link"
            >
              <IconLink size={20} />
            </Button>
          </Group>
          {isCopied && (
            <div className={styles.copySuccess}>Link copied to clipboard!</div>
          )}
          {error && <div className={styles.copyError}>{error}</div>}
        </Modal>
      )}
    </div>
  );
};

export default SocialShareLinks;
