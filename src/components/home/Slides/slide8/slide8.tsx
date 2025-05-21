import React from "react";

import "./Slide8.module.scss";

const Slide8: React.FC = () => {
  return (
    <section>
      <div>
        <div className="webParty">
          <div className="partyImg">
            <img src="/static/images/about/aboutBanner.png" />
          </div>
        </div>
        <div className="mobParty">
          <div className="partyImg">
            <img src="/static/images/about/aboutBannerMob.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide8;
