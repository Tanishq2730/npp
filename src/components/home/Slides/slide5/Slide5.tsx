import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import IndianMap from "./indianMap/IndianMap";
import type { RegionData } from "./indianMap/MapData";
import styles from "./Slide5.module.scss";

const Footprints: React.FC = () => {
  const t = useTranslations("home.slide5");
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const handleRegionSelect = (region: RegionData | null) => {
    setSelectedRegion(region);
  };

  return (
    <div className={styles.home5}>
      <div className={styles.mapWrapper}>
        <div className={styles.map}>
          {/* <h1 className="heading-1">{t("footprints")}</h1> */}

          <IndianMap
            width="100%"
            height="100%"
            onRegionSelect={handleRegionSelect}
          />
        </div>
      </div>
      <div className={styles.data}>
        {selectedRegion ? (
          
          <div>
             <h1 className="heading-1">{t("footprints")}</h1>
            <div className={styles["data-header"]}>
              <h5>{selectedRegion.name || "Unknown Region"}</h5>
              <div>
                {selectedRegion.facebookLink && (
                  <a
                    href={selectedRegion.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selectedRegion.name} Facebook page`}
                  >
                    <IconBrandFacebook stroke={0} fill="rgba(116, 75, 41, 1)" />
                  </a>
                )}
                {selectedRegion.twitterLink && (
                  <a
                    href={selectedRegion.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selectedRegion.name} Twitter page`}
                  >
                    <IconBrandTwitter stroke={0} fill="rgba(116, 75, 41, 1)" />
                  </a>
                )}
                {selectedRegion.instagramLink && (
                  <a
                    href={selectedRegion.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selectedRegion.name} Instagram page`}
                  >
                    <IconBrandInstagram color="rgba(116, 75, 41, 1)" />
                  </a>
                )}
              </div>
            </div>
            <div className={styles["npp-info-container"]}>
              {selectedRegion.imageUrl && (
                <div className={styles["image-container"]}>
                  <Image
                    src={selectedRegion.imageUrl}
                    alt={`${selectedRegion.name || "Region"} representative`}
                    width={100}
                    height={100}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <div className={styles["npp-info"]}>
                {selectedRegion.person && <h5>{selectedRegion.person}</h5>}
                {selectedRegion.post && (
                  <p className="body-4">{selectedRegion.post}</p>
                )}
                <div className={styles["elected-members"]}>
                  {selectedRegion.loksabha && (
                    <div>
                      <p className="body-3">{selectedRegion.loksabha}</p>
                      <h3>{selectedRegion.loksabhaCount || "0"}</h3>
                    </div>
                  )}
                  {selectedRegion.rajyasabha && (
                    <div>
                      <p className="body-3">{selectedRegion.rajyasabha}</p>
                      <h3>{selectedRegion.rajyasabhaCount || "0"}</h3>
                    </div>
                  )}
                  {selectedRegion.mla && (
                    <div>
                      <p className="body-3">{selectedRegion.mla}</p>
                      <h3>{selectedRegion.mlaCount || "0"}</h3>
                    </div>
                  )}
                  {selectedRegion.mlc && (
                    <div>
                      <p className="body-3">{selectedRegion.mlc}</p>
                      <h3>{selectedRegion.mlcCount || "0"}</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h5>Select a region to view details</h5>
        )}
        {/* <div className={styles["nda-info"]}>
          <span className="subheading-1">{t("electionData.NDA.alliance")}</span>
          <div className={styles.parliament}>
            <div>
              <p>{t("electionData.NDA.loksabha")}</p>
              <p>{t("electionData.NDA.lokSeats")}</p>
            </div>
            <div>
              <p>{t("electionData.NDA.rajyasabha")}</p>
              <p>{t("electionData.NDA.rajyaSeats")}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footprints;
