import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section>
      <div className="aboutSection">
        <div className="aboutBanner">
          <img src="/static/images/about/aboutBanner.jpg" />
        </div>
        <div className="container m-auto">
          <div className="aboutContent">
            <div className="row">
              <div className="col-md-6">
                <div className="aboutImg">
                  <img src="/static/images/about/aboutImg.png" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="aboutInnerContent">
                  <div className="head">
                    <h2>ABOUT US</h2>
                  </div>
                  <p>
                    We are the National People’s Party (NPP) — a nationally
                    recognised political party born from the vision of the late
                    Shri Purno Agitok Sangma, a revered leader and former
                    Speaker of the Lok Sabha. Established in 2013, we emerged
                    with a singular purpose: to be the voice of India’s tribal,
                    indigenous, and marginalised communities, and to bridge the
                    gap between regional aspirations and national progress. With
                    our headquarters in Shillong, Meghalaya, and state units
                    actively working across the Northeast and other parts of
                    India, we are deeply rooted in grassroots realities. Led by
                    our National President, Shri Conrad K. Sangma, we are the
                    first party from the Northeast to be granted national party
                    status, a milestone that reflects our expanding influence
                    and commitment. At our core, we believe in inclusive
                    development, sustainable growth, and governance that
                    reflects the true spirit of the people. Our mission is to
                    empower communities through access to education,
                    infrastructure, entrepreneurship, and social justice, while
                    championing transparency, accountability, and ethical
                    politics. With a dedicated network of leaders, workers, and
                    citizens across the country, we continue to build a
                    people-first movement that is committed to shaping a
                    stronger, more equitable India for generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
