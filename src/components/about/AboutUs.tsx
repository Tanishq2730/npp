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
                  <img src="/static/images/about/aboutImg.jpg" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="aboutInnerContent">
                  <div className="head">
                    <h2>ABOUT US</h2>
                  </div>
                  <p>
                    Conrad K. Sangma, born on January 27, 1978, in Tura, West
                    Garo Hills, Meghalaya, is a prominent Indian politician and
                    the current Chief Minister of Meghalaya. Coming from a
                    political family, he has made significant contributions to
                    the state's governance and development.Conrad K. Sangma was
                    born on the 27th of January 1978 in Tura, West Garo Hills,
                    Meghalaya. His father Purno Sangma worked as the Chief
                    Minister of Meghalaya and Speaker of the Lok Sabha and his
                    mother Soradini was a housewife. Conrad has two siblings
                    involved in politics; an elder brother James and a sister
                    Agatha who are both in NPP. His other sister, Christy has
                    taken an altogether non-controversial career path.In 2009,
                    Conrad got married to Dr. Mehtab Chandee with whom he was
                    blessed with two kids; an elder child Amara who was born in
                    2011, and the youngest child Katelyn who was born in 2017.
                    Apart from politics, Conrad is into social service in the
                    sense that he is the President of the PA Sangma Foundation,
                    an organization that wants to wipe out illiteracy and
                    pollution. The foundation also runs four colleges in rural
                    Meghalaya, a region that still has a raw taste of
                    architectural mastery. Also, he is the President of the
                    Meghalaya Cricket Association and Sports Academy.Conrad
                    entered the political arena in the late 1990s assisting his
                    father P. A. Sangma, who was contesting on the NCP ticket.
                    He first vied for a seat in 2004 in the Garo Hills
                    Autonomous District Council and he lost by a small margin.
                    He and his brother James were both elected to the State
                    Assembly in 2008 as members of the NCP. He also served as
                    the Finance, Power, Tourism, General Administration, and IT
                    minister of the state and unveiled his first state budget in
                    his first 10 days in the minister post.{" "}
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
