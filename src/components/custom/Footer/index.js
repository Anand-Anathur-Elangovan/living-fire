"use client";
import React from "react";
import Image from "next/image";
import LFFullLogo from "@/public/assets/homePage/rightSideLogo.svg";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LFTitleLogo from "@/public/assets/homePage/header/LFTitle.svg";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const FireplaceTypes = [
    { name: "Electric", route: "/allProducts/electric" },
    { name: "Gas", route: "/allProducts/gas" },
    { name: "Wood", route: "/allProducts/wood" },
    { name: "Bio-Ethanol", route: "/allProducts/bio-ethanol" },
    { name: "Cookers", route: "/allProducts/cooker" },
  ];

  const FireplaceAccessories = [
    { name: "Fireplace Mantels", route: "/allProducts/fireplace-mantels" },
    { name: "Fire Tools", route: "/fire-tools" },
    { name: "Outdoor", route: "/outdoor" },
    { name: "Cast Iron", route: "/cast-iron" },
  ];

  const AboutUsLinks = [
    { name: "Our Story", route: "/our-story" },
    { name: "Services", route: "/services" },
    { name: "News & Blogs", route: "/blogs" },
    { name: "Contact Us", route: "/contact" },
  ];

  const CustomerCare = [
    { name: "Maintenance Service", route: "/maintenance-service" },
    { name: "Warranty & Servicing", route: "/warranty" },
    { name: "Terms of Service", route: "/terms" },
    { name: "Privacy Policy", route: "/privacy-policy" },
  ];

  const iconStyle =
    "border border-white p-2 rounded-full hover:bg-white hover:text-black transition";

  return (
    <footer className="bg-black text-white">
      <Box
        sx={{
          padding: {
            xs: "2rem 1rem",
            sm: "2rem 2rem",
            md: "2rem 4rem",
            lg: "2rem 6rem",
          },
          // borderTop: "20px solid white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            py: { xs: 4, sm: 10 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, sm: 0 },
          }}
        >
          <Image
            src={LFFullLogo}
            alt="Living Fire Full Logo"
            className="w-auto h-12"
            style={{ filter: "invert(1)" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
            }}
          >
            <a href="#" className={iconStyle}>
              <FaFacebookF size={16} />
            </a>
            <a href="#" className={iconStyle}>
              <FaInstagram size={16} />
            </a>
            <a href="#" className={iconStyle}>
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className={iconStyle}>
              <FaYoutube size={16} />
            </a>
          </Box>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid white",
            width: { xs: "100%", sm: "92%" },
            mx: "auto",
            mb: 6,
          }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", sm: "space-between" },
            gap: { xs: 4, sm: 2, md: 4 },
            px: { xs: 2, sm: 6, md: 10 },
            pb: { xs: 6, sm: 12 },
            mt: { xs: 2, sm: 5 },
            "& > *": {
              minWidth: { xs: "100%", sm: "45%", md: "auto" },
              flex: { sm: "0 0 calc(50% - 16px)", md: "0 0 auto" },
            },
          }}
        >
          <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Our Showrooms
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontWeight: 500 }}>Richmond</Typography>
              <Typography>
                359-361 Swan Street, Richmond, Victoria 3121
              </Typography>
              <Typography>(03) 9977 7886</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>Moorabbin</Typography>
              <Typography>
                148-150 Cochranes Road, Moorabbin, Victoria 3189
              </Typography>
              <Typography>(03) 9977 7887</Typography>
            </Box>
          </Box>

          <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Products
            </Typography>
            {FireplaceTypes.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="block mb-1 hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </Box>

          <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Additional Products
            </Typography>
            {FireplaceAccessories.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="block mb-1 hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </Box>

          <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              About
            </Typography>
            {AboutUsLinks.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="block mb-1 hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </Box>

          <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Customer Care
            </Typography>
            {CustomerCare.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="block mb-1 hover:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          py: 4,
          backgroundColor: "black",
          // borderTop: "10px solid white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* <Image
          src={LFTitleLogo}
          alt="Living Fire Title Logo"
          style={{ filter: "invert(1)", height: 40, width: "auto" }}
        /> */}
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          © {new Date().getFullYear()} Living Fire. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;