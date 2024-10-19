"use client";
import Image from "next/image";
import windowBlogImg from "../../../assets/homePage/blogSection/window-blog-img.png";
import woodfireImg from "../../../assets/homePage/blogSection/woodfire-img.png";
import "./blogSection.css";
const BlogSection = () => {
  return (
    <section>
      <div className="categories">
        <div className="blog-column">
          <div className="columnheadingon-4">
            <div className="rowheadingone-2">
              <div className="heading">
                <p>Blog</p>
              </div>
            </div>
            <div className="rowmaximising">
              <Image
                src={windowBlogImg}
                alt="Window Blog Image"
                className="left-img"
                placeholder="blur" // Optional: For optimized loading
              />
              <div className="right-section">
                <div className="rowwoodgasand">
                  <Image
                    src={woodfireImg}
                    alt="Woodfire Image"
                    className="right-img"
                    placeholder="blur" // Optional
                  />
                  <div className="columnwoodgasan">
                    <p className="woodgasand ui text size-h6">
                      Wood, Gas, and Electric Fireplaces: What’s Right for You?
                    </p>
                    <p className="description-1 ui text size-body_small">
                      Each type of fireplace offers its own unique advantages,
                      from the traditional charm of wood to the convenience of
                      gas and the versatility of electric. This guide helps you
                      navigate the pros and cons of each option, ensuring you
                      make an informed decision that suits your lifestyle and
                      home. Let us help you find the perfect fireplace to create
                      the ideal ambiance.
                    </p>
                    <a href="#">
                      <p className="shopall ui text size-textmd">Read More</p>
                    </a>
                  </div>
                </div>
                <div className="columnmaximisin">
                  <p className="maximising ui text size-h6">
                    Maximising Energy Efficiency with Your Fireplace
                  </p>
                  <p className="description ui text size-body_small">
                    A well-chosen fireplace not only enhances your home’s beauty
                    but can also improve its energy efficiency. Learn how to
                    select a fireplace that offers optimal heat output and
                    efficiency, reducing your energy bills while keeping your
                    home cozy. Our tips will guide you in making a choice that’s
                    both stylish and sustainable.
                  </p>
                  <a href="#">
                    <p className="shopall ui text size-textmd">Read More</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
