"use client";
import React, { useState } from "react";
import ourwood1 from '@/public/html/assets/stackimg.png'
import ourwood2 from '@/public/html/assets/stackimg.png'
import ourwood3 from '@/public/html/assets/stackimg.png'
import manimg from '@/public/html/assets/stackimg.png'
import "./ourstory.css";
import Image from 'next/image';

const OurStory = () => {
  return (
    <>
      <div className="our-story">
            <p className="ourstory ui text size-text2xl">Our Story</p>
      <section>
        <div className="three-image">
          <div className="columntypeface">
            <div className="img-list">
              <Image
                src={ourwood1}
                alt="Screenshot"
                width={500}
                height={300}
                className="img-1"
              />
              <Image
                src={ourwood2}
                alt="Furnishingsde"
                width={500}
                height={300}
                className="img-2"
              />
              <Image
                src={ourwood3}
                alt="Furnishingsde"
                width={500}
                height={300}
                className="img-3"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="card-content">
          <div className="columndesc">
            <p className="desc ui text size-body_medium">
            Living Fire’s journey is a tale of family passion, enduring
            craftsmanship, and an unwavering commitment to quality and
            innovation. Founded by Paul Agnew, a visionary whose roots in the
            industry run deep, Living Fire has grown from a small, family-owned
            business into Melbourne’s leading supplier of premium local and
            European fireplaces. With 60 years of industry experience, we have
            become synonymous with excellence, trusted by discerning customers
            who seek the perfect blend of cutting-edge design and traditional
            one-on-one service.
            </p>
            <div className="rowdescription">
              <Image
                src={manimg}
                alt="manimg"
                width={200}
                height={200}
                className="manimg"
              />
              <p className="desc ui text size-body_medium">
              Paul Agnew’s story begins in his youth, following in his father’s
              footsteps, salvaging antique architectural fittings from old
              homes. This early appreciation for quality materials and
              craftsmanship ignited a lifelong passion. As demand for his unique
              finds grew, Paul transitioned to producing high-quality
              reproductions, setting a new standard in the market. His
              dedication took him to the UK, where he established a reputation
              for excellence in cast iron fireplace products. Today, Paul leads
              a team whose combined expertise spans over a century, all equally
              dedicated to innovation and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="left-right-text">
          <div className="column">
            <p className="ui heading text size-h1" style={{textTransform: 'uppercase'}}>
              Sculptural, elegant, and statement works of art that bring warmth to both the home and the soul.
            </p>
            <div className="row">
              <p className="desc ui text size-body_medium">
              At Living Fire, we believe a fireplace is more than just a source
              of heat; it’s the heart of the home. Our exquisite fireplaces are
              sculptural, elegant, and statement works of art that bring warmth
              to both the home and the soul. We work closely with architects,
              interior designers, developers, and home renovators to ensure each
              fireplace is perfectly suited to its space, whether it’s a period
              house or a contemporary apartment
              </p>
              <p className="desc ui text size-body_medium">
              Living Fire is more than a brand; it’s a legacy of quality and
              innovation, a family tradition of craftsmanship, and a promise of
              warmth and elegance for every home. Our story is one of dedication
              and passion, and we invite you to be a part of it. Experience the
              comfort, ease, and pride of owning a Living Fire fireplace, where
              the journey begins the moment you walk through our doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="four-cards">
          <div className="column">
            <div className="rowheading">
              <div className="heading1">
                <p className="heading ui text size-h1">Our People</p>
              </div>
            </div>
            <div className="team-col">
              {[1, 2, 3, 4].map((i) => (
                <div className="team-1" key={i}>
                  <Image
                    src={manimg}
                    alt="manimg"
                    width={100}
                    height={100}
                    className="teamimg"
                  />
                  <div className="columnnametext">
                    <p className="nametext ui text size-h4">Name</p>
                    <p className="jobtitletext ui text size-h6">Job Title</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="find-us">
          <div className="column">
            <div className="columnheading">
              <p className="heading ui text size-h1">Find Us</p>
              <p className="desc ui text size-body_large">
              Our showrooms showcase a curated selection of fireplaces from
              Europe, all surpassing Australian standards and offering
              hassle-free installation. From the moment you step into our
              showroom, we aim to provide an exceptional experience, guiding you
              through the process with personalised service and expert advice.
              We take pride in going above and beyond for our customers,
              reviewing plans, discussing options, and making tailored
              recommendations.
              </p>
            </div>
            <div class="showroominfo">
            <div class="locationinfo">
              <div class="heading1-1">
                <p class="headingfive ui text size-h6">Richmond Showroom</p>
              </div>
              <div class="column-1">
                <div class="columnheader">
                  <p class="bodysmall-1 ui text size-body_small">
                    359-361 Swan Street, <br />Richmond, Victoria 3121
                  </p>
                  <p class="openinghourstex ui text size-body_small">
                    Monday – Friday: 9am – 5pm<br />Saturday: 10am – 4pm
                  </p>
                </div>
                <div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      info@livingfire.com.au
                    </p>
                  </div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      (03) 9977 7886
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="locationinfo">
              <div class="heading1-1">
                <p class="headingfive ui text size-h6">Moorabbin Showroom</p>
              </div>
              <div class="column-1">
                <div class="columnheader">
                  <p class="bodysmall-1 ui text size-body_small">
                    148-150 Cochranes Road, <br />Moorabbin, Victoria 3189
                  </p>
                  <p class="openinghourstex ui text size-body_small">
                    Monday – Friday: 8:30am – 4:30pm<br />Saturday: 10am – 4pm
                  </p>
                </div>
                <div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      info@livingfire.com.au
                    </p>
                  </div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      (03) 9977 7887
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="locationinfo">
              <div class="heading1-1">
                <p class="headingfive ui text size-h6">Moorabbin Warehouse</p>
              </div>
              <div class="column-1">
                <div class="columnheader">
                  <p class="bodysmall-1 ui text size-body_small">
                    148-150 Cochranes Road, <br />Moorabbin, Victoria 3189
                  </p>
                  <p class="openinghourstex ui text size-body_small">
                    Monday – Friday: 9am – 5pm<br />Saturday: 10am – 4pm
                  </p>
                </div>
                <div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      Accounts: 03 9977 7880
                    </p>
                  </div>
                  <div class="heading1-1">
                    <p class="bodysmall_one ui text size-body_small">
                      Operations: 03 9977 7881
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/><br/>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default OurStory;
