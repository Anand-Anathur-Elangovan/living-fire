// "use client";
// import React from "react";
// import Image from "next/image";
// import "./footer.css";
// import InstagramIcon from "@/public/assets/homePage/instagram.svg";
// import FacebookIcon from "@/public/assets/homePage/facebook.svg";
// import LFLogo from "@/public/assets/homePage/header/LFLogo.svg";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div>
//       <Image
//         src={LFLogo}
//         alt="Living Fire Company Logo"
//         className="custom-header-width"
//         style={{ filter: "invert(1)" }}
//       />
//       </div>
//       <div className="footerRow">
//         {/* Column 1: Showrooms */}
//         <div className="footer-column1">
//           <div className="foot-heading">
//             <p>Our Showrooms</p>
//           </div>
//           <div className="columnheadingfi-2">
//             <div className="foot-heading ">
//               <p>Richmond Showroom</p>
//             </div>
//             <div className="columnbodysmall">
//               <p>
//                 359-361 Swan Street, <br />
//                 Richmond, Victoria 3121
//               </p>
//               <p>(03) 9977 7886</p>
//             </div>
//           </div>
//           <div className="columnheadingfi-3">
//             <div className="foot-heading heading7 font-bold">
//               <p>Moorabbin Showroom</p>
//             </div>
//             <div className="columnbodysmall">
//               <p>
//                 148-150 Cochranes Road, <br />
//                 Moorabbin, Victoria 3189
//               </p>
//               <div className="column_two">
//                 <div className="heading7">
//                   <p>(03) 9977 7887</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-white">
//             <p>info@livingfire.com.au</p>
//           </div>
//         </div>

//         {/* Column 2: Information */}
//         <div className="footer-column2 flex flex-col gap-2">
//           <div className="foot-heading headingfive ui text size-h6 text-base">
//             <p>Products</p>
//           </div>
//           <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
//             <li>
//               <a href="/our-story">
//                 <p className="nofilechosen ui text size-body_small">
//                   Fireplaces
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/maintenance-service">
//                 <p className="nofilechosen ui text size-body_small">
//                   Bio-Ethanol
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">Gas</p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">Wood</p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">Electric</p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">Cooker</p>
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Column 3: Additional Products */}
//         <div className="footer-column2 flex flex-col gap-2">
//           <div className="foot-heading headingfive ui text size-h6 text-base">
//             <p>Additional Products</p>
//           </div>
//           <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
//             <li>
//               <a href="/our-story">
//                 <p className="nofilechosen ui text size-body_small">
//                   Fireplace Mantels
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/maintenance-service">
//                 <p className="nofilechosen ui text size-body_small">
//                   Fire Tools
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">Outdoor</p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">
//                   Cast Iron
//                 </p>
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Column 4: Information */}
//         <div className="footer-column2 flex flex-col gap-2">
//           <div className="foot-heading headingfive ui text size-h6 text-base">
//             <p>About</p>
//           </div>
//           <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
//             <li>
//               <a href="/our-story">
//                 <p className="nofilechosen ui text size-body_small">
//                   Our Story
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/maintenance-service">
//                 <p className="nofilechosen ui text size-body_small">
//                   Our Services
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/contact">
//                 <p className="nofilechosen ui text size-body_small">
//                   Contact Us
//                 </p>
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="footer-column3">
//           <div className="foot-heading headingfive ui text size-h6">
//             <p>Customer Care</p>
//           </div>
//           <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
//             <li>
//               <a href="/maintenance-service" className="bodysmall-link">
//                 <p className="nofilechosen ui text size-body_small">
//                   Maintenance Service
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/warranty" className="bodysmall-link">
//                 <p className="nofilechosen ui text size-body_small">
//                   Warranty &amp; Servicing
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/terms" className="bodysmall-link-1">
//                 <p className="nofilechosen ui text size-body_small">
//                   Terms of Service
//                 </p>
//               </a>
//             </li>
//             <li>
//               <a href="/privacy-policy" className="bodysmall-link">
//                 <p className="nofilechosen ui text size-body_small">
//                   Privacy Policy
//                 </p>
//               </a>
//             </li>
//           </ul>
//         </div>
//         {/* <div className="footer-column4">
//           <div className="rowheadingfive-2">
//             <p className="headingfive_six ui text size-h3 font-sans text-lg text-white font-extralight">
//               Stay in the loop
//             </p>
//           </div>
//           <label className="email ui input gray_900 size-xs underline square">
//             <input
//               name="email"
//               placeholder="Email"
//               type="text"
//               className="placeholder-shown:text-[#94999F]"
//             />
//           </label>
//           <div className="flex flex-row gap-3">
//             <Image
//               src={InstagramIcon} //"/assets/instagram" // Replace with actual path
//               alt="Instagram Icon"
//               title="Instagram Icon"
//               className="bg-white"
//               width={24}
//               height={24}
//               // unoptimized
//             />
//             <Image
//               src={FacebookIcon} //"/assets/facebook" // Replace with actual path
//               alt="Facebook Icon"
//               title="Facebook Icon"
//               className="bg-white"
//               width={24}
//               height={24}
//               // unoptimized
//             />
//           </div>
//           <div className="heading7">
//             <p className="bodysmall">© Copyright 2024 Living Fire</p>
//           </div>
//         </div> */}
//       </div>
//     </footer>
//   );
// }

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import LFLogo from "@/public/assets/homePage/header/LFLogo.svg";

export default function Footer() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const showNewsletter = pathname !== "/";
  const FireplaceTypes = [
    {
      name: "Fireplaces",
      route: "/allProducts/fireplace", // or your actual route path
    },
    {
      name: "Bio-Ethanol",
      route: "/allProducts/bio-ethanol", // or your actual route path
    },
    {
      name: "Gas",
      route: "/allProducts/gas", // or your actual route path
    },
    {
      name: "Wood",
      route: "/allProducts/wood", // or your actual route path
    },
    {
      name: "Electric",
      route: "/allProducts/electric", // or your actual route path
    },
    {
      name: "Cookers",
      route: "/allProducts/cooker", // or your actual route path
    },
  ];

  const FireplaceAccessories = [
    {
      name: "Fireplace Mantels",
      route: "/allProducts/fireplace-mantels", // or your actual route path
    },
    {
      name: "Fire Tools",
      route: "/fire-tools", // or your actual route path
    },
    {
      name: "Outdoor",
      route: "/outdoor", // or your actual route path
    },
    {
      name: "Cast Iron",
      route: "/cast-iron", // or your actual route path
    },
  ];

  const AboutUsLinks = [
  {
    name: "Our Story",
    route: "/our-story" // or your preferred route
  },
  {
    name: "Our Services",
    route: "/" // or "/services" if standalone
  },
  {
    name: "Contact Us",
    route: "/contact" // or "/about/contact" if nested
  }
];

  const CustomerCare = [
    {
      name: "Maintenance Service",
      route: "/maintenance-service",
    },
    {
      name: "Warranty & Servicing",
      route: "/warranty",
    },
    {
      name: "Terms of Service",
      route: "/terms",
    },
    {
      name: "Privacy Policy",
      route: "/privacy-policy",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#4E4E4E",
        color: "white",
        paddingTop: "48px",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo and Social */}
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 3 }}>
              <Image
                src={LFLogo}
                alt="Living Fire Company Logo"
                style={{ filter: "invert(1)", width: "100%", height: "auto" }}
              />
            </Box>
            {showNewsletter && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Stay Updated
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", gap: 1 }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.7)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                        py: 1,
                      },
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: 1,
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      whiteSpace: "nowrap",
                      px: 2,
                      backgroundColor: "white",
                      color: "#4E4E4E",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            )}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Facebook />
              </IconButton>
            </Box>
            <Typography variant="body2">Follow us on social media</Typography>
          </Grid>

          {/* Showrooms */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Our Showrooms
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                Richmond Showroom
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOn
                  fontSize="small"
                  sx={{ mr: 1, color: "rgba(255, 255, 255, 0.7)" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  359-361 Swan Street, Richmond, Victoria 3121
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone
                  fontSize="small"
                  sx={{ mr: 1, color: "rgba(255, 255, 255, 0.7)" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  (03) 9977 7886
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                Moorabbin Showroom
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOn
                  fontSize="small"
                  sx={{ mr: 1, color: "rgba(255, 255, 255, 0.7)" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  148-150 Cochranes Road, Moorabbin, Victoria 3189
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone
                  fontSize="small"
                  sx={{ mr: 1, color: "rgba(255, 255, 255, 0.7)" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  (03) 9977 7887
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email
                fontSize="small"
                sx={{ mr: 1, color: "rgba(255, 255, 255, 0.7)" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                info@livingfire.com.au
              </Typography>
            </Box>
          </Grid>

          {/* Products */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Products
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
              {FireplaceTypes?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.route}
                    color="rgba(255, 255, 255, 0.9)"
                    underline="hover"
                    sx={{
                      display: "block",
                      py: 0.5,
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Additional Products */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Additional Products
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
              {FireplaceAccessories?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.route}
                    color="rgba(255, 255, 255, 0.9)"
                    underline="hover"
                    sx={{
                      display: "block",
                      py: 0.5,
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* About & Customer Care */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              About
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0, mb: 3 }}>
              {AboutUsLinks?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.route}
                    color="rgba(255, 255, 255, 0.9)"
                    underline="hover"
                    sx={{
                      display: "block",
                      py: 0.5,
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </Box>

            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Customer Care
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
              {CustomerCare?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.route}
                    color="rgba(255, 255, 255, 0.9)"
                    underline="hover"
                    sx={{
                      display: "block",
                      py: 0.5,
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          width: "100%",
          py: 3,
          mt: 4,
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "white 10px solid",
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          © {new Date().getFullYear()} Living Fire. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
