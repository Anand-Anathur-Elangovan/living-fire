"use server";
import React from "react";

import Collections from "./collections";
import OurBrands from "./ourBrands";
import Featured from "./featured";
import Testimonials from "./testimonials";
import Blog from "./blog";
import useHomePage from "../hooks/useHomePage";

const TopScreen = ({ data }) => {
  //   const { data } = useHomePage();
  return (
    <div>
      <Collections />
      <OurBrands />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default TopScreen;
