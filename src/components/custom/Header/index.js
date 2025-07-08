"use client";
import React, { useState, useRef, useEffect } from "react";
import "./header.css";
import logo from "@/public/assets/homePage/rightSideLogo.svg";
import LFLogo from "@/public/assets/homePage/header/LFLogo.svg";
import LFTitleLogo from "@/public/assets/homePage/header/LFTitle.svg";
import searchIcon from "@/public/assets/homePage/searchIcon.svg";
import menu from "@/public/assets/homePage/burgerMenuIcon.svg";
import menuIcon from "@/public/assets/homePage/burgerMenu.svg";
import Image from "next/image";
import Menu from "@/src/app/menu/Menu";
import CloseIcon from "@/public/assets/menu/close.svg";
import CloseIconMui from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
  styled,
} from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const MultiColumnList = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "8px",
  padding: "16px 0 16px 24px",
}));

const Header = () => {
  const isMobileVar = typeof window !== "undefined" && window.innerWidth <= 768;
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuNav, setShowMenuNav] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [searchTextHeader, setSearchTextHeader] = useState("");
  const [color, setColor] = useState("white");
  const [isMobile, setIsMobile] = useState(isMobileVar);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [openCategories, setOpenCategories] = useState({});

  const isHomePage = pathname === "/";
  let lastScroll = 0;

  useEffect(() => {
    if (pathname !== prevPathname) {
      // Only animate if coming from another page (not initial load)

      setShouldAnimate(true);

      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setShouldAnimate(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleScroll = () => {
  //   const currentScroll = window.pageYOffset;
  //   lastScroll = currentScroll;

  //   if (currentScroll > 1) {
  //     setScrolled(true);
  //     if (isHomePage && currentScroll > 0) {
  //       setColor("black");
  //     }
  //   } else {
  //     setScrolled(false);
  //     if (isHomePage) {
  //       setColor("white");
  //     }
  //   }
  // };
const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 10) { // Adjust this threshold as needed
    setScrolled(true);
    if (isHomePage && currentScroll > 0) {
      setColor("black");
    }
    
    // Optional: Hide header when scrolling down
    if (currentScroll > lastScroll && currentScroll > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  } else {
    setScrolled(false);
    setHidden(false);
    if (isHomePage) {
      setColor("white");
    }
  }
  
  lastScroll = currentScroll;
};
  useEffect(() => {
    if (!isHomePage) {
      setColor("black");
    } else {
      setColor("white");
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  let headerClasses = ["header"];
  if (scrolled) {
    headerClasses.push("scrolled");
  }
  if (hidden) {
    headerClasses.push("hidden");
  }
  // const handleHomeIconClick = () => {
  //   setShouldAnimate(true);
  //   setTimeout(() => setShouldAnimate(false), 3000);
  //   sessionStorage.removeItem("filtersJson");
  //   sessionStorage.clear();
  //   router.push(`/`);
  // };
  const handleHomeIconClick = () => {
    // Trigger animation
    setShouldAnimate(true);
    setTimeout(() => setShouldAnimate(false), 3000);

    // Clear all client-side storage
    localStorage.clear();
    sessionStorage.clear();

    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    });

    // Clear service worker cache if exists
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
    }

    // Force hard reload after slight delay to ensure cleanup completes
    setTimeout(() => {
      // Use window.location instead of router.push for complete refresh
      window.location.href = "/";
    }, 100);
  };
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setShowMenuNav(false);
      setSearchTextHeader("");
      setIsClosing(false);
    }, 0); // Match this with your CSS animation duration
  };
  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setShouldAnimate(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  const menuItems = [
    {
      title: "Fireplaces",
      subItems: [
        { title: "Wood", href: "/allProducts/wood/" },
        { title: "Gas", href: "/allProducts/gas/" },
        { title: "Electric", href: "/allProducts/electric/" },
        { title: "Bioethanol", href: "/allProducts/bio-ethanol/" },
        { title: "Cooker", href: "/allProducts/cooker/" },
        // { title: "Modern", href: "/modern-fireplaces/" },
        // { title: "Traditional", href: "/traditional-fireplaces/" },
      ],
    },
    {
      title: "Additional Products",
      subItems: [
        { title: "Fireplace", href: "/allProducts/Fireplace/" },
        {
          title: "Fireplace Mantels",
          href: "/allProducts/Fireplace%20Mantels/",
        },
        { title: "Fire Tools", href: "/allProducts/Fire%20Tools/" },
        { title: "Outdoor", href: "/allProducts/Outdoor/" },
        { title: "Cast Iron", href: "/allProducts/Cast%20Iron/" },
      ],
    },
    {
      title: "Brands",
      subItems: [
        { title: "Esse", href: "/allProducts/Esse/" },
        { title: "ADF", href: "/allProducts/ADF/" },
        { title: "Austroflamm", href: "/allProducts/Austroflamm/" },
        { title: "Bosq", href: "/allProducts/Bosq/" },
        { title: "Eurostove", href: "/allProducts/Eurostove/" },
        { title: "Gazco", href: "/allProducts/Gazco/" },
        { title: "Heatmaster", href: "/allProducts/Heatmaster/" },
        { title: "Hergom", href: "/allProducts/Hergom/" },
        { title: "Kalora", href: "/allProducts/Kalora/" },
        { title: "Living Fire", href: "/allProducts/Living Fire/" },
        { title: "Morso", href: "/allProducts/Morso/" },
        {
          title: "Paul Agnew Designs",
          href: "/allProducts/Paul Agnew Designs/",
        },
        { title: "Regency", href: "/allProducts/Regency/" },
        { title: "Stovax", href: "/allProducts/Stovax/" },
      ],
    },
    {
      title: "Services",
      subItems: [
        { title: "Maintenance & Servicing", href: "/maintenance-service/" },
        { title: "Warranty & Servicing", href: "/warranty/" },
      ],
    },
    // Add more categories as needed
  ];
  const bottomMenuItems = [
    { title: "About Us", href: "/our-story/" },
    { title: "News & Blogs", href: "/" },
    { title: "Contact Us", href: "/contact/" },
    { title: "Terms of Service", href: "/terms/" },
    { title: "Privacy Policy", href: "/privacy-policy/" },
    // { title: "Contact", href: "/contact/" },
  ];
  const handleCategoryClick = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    if (showMenuNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenuNav]);

  // Effect to handle body scroll locking
  useEffect(() => {
    if (showMenuNav) {
      // Add class to body to prevent scrolling
      document.body.classList.add("drawer-open");
      // Alternatively, you can directly set styles:
      // document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      // document.body.style.width = '100%';
    } else {
      // Remove class when drawer closes
      document.body.classList.remove("drawer-open");
      // Or remove inline styles:
      // document.body.style.overflow = '';
      // document.body.style.position = '';
      // document.body.style.width = '';
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("drawer-open");
      // Or:
      // document.body.style.overflow = '';
      // document.body.style.position = '';
      // document.body.style.width = '';
    };
  }, [showMenuNav]);

  useEffect(() => {
    if (showMenuNav) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Apply styles to body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore styles and scroll position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [showMenuNav]);


  useEffect(() => {
  if (showMenu) {
    document.body.classList.add('menu-open');
    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
  } else {
    document.body.classList.remove('menu-open');
    // Restore scroll position
    const scrollY = parseInt(document.body.style.top || '0');
    document.body.style.top = '';
    window.scrollTo(0, -scrollY);
  }

  return () => {
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
  };
}, [showMenu]);


  return (
    <>
      {!showMenu && (
        <header className={headerClasses.join(" ")}>
          <div className="image-container" style={{ display: "flex" }}>
            {isMobile ? (
              <Image
                src={LFLogo}
                alt="Living Fire Company Logo"
                className="custom-header-width"
                onClick={handleHomeIconClick}
                style={{ filter: color === "white" ? "invert(1)" : "none" }}
              />
            ) : (
              <>
                {/* Main Logo - slides in from right */}
                <AnimatePresence>
                  {shouldAnimate ? (
                    <motion.div
                      initial={{ x: "50%", opacity: 1 }}
                      animate={{
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 150,
                          damping: 15,
                          mass: 0.7,
                          delay: 2,
                        },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={LFLogo}
                        alt="Living Fire Company Logo"
                        className="custom-header-width"
                        onClick={handleHomeIconClick}
                        title="Living Fire Company Logo"
                      />
                    </motion.div>
                  ) : (
                    <div key="static-logo">
                      <Image
                        src={LFLogo}
                        alt="Living Fire Company Logo"
                        className="custom-header-width"
                        onClick={handleHomeIconClick}
                        title="Living Fire Company Logo"
                        style={{
                          filter: color === "white" ? "invert(1)" : "none",
                        }}
                      />
                    </div>
                  )}
                </AnimatePresence>
                {/* Title Logo - slides left and fades out */}
                <AnimatePresence>
                  {shouldAnimate && (
                    <motion.div
                      key="title-logo"
                      initial={{ x: "8%", opacity: 1 }}
                      animate={{
                        x: 0,
                        opacity: 0,
                        transition: {
                          x: {
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            mass: 0.7,
                            delay: 2,
                          },
                          opacity: {
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 1,
                          },
                        },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <Image
                        src={LFTitleLogo}
                        alt="Living Fire Company Title Logo"
                        className="custom-header-width"
                        onClick={handleHomeIconClick}
                        title="Living Fire Company Title Logo"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
          <div
            className="custom-header-right-side-icons"
            style={{ color: color }}
          >
            {!isMobile && (
              <div className="min-w-[400px] flex justify-center w-full">
                <div
                  className={`h-[50px] flex px-3 bg-transparent outline-none border-b-0 border-${color} rounded-none p-2`}
                >
                  <Image
                    src={SearchIcon}
                    alt="Search Icon"
                    title="Search Icon"
                    style={{ filter: color === "white" ? "invert(1)" : "none" }}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsFocus(true);
                      setShowMenu(true);
                    }}
                    width={30}
                    // unoptimized
                  />
                </div>
              </div>
            )}

            <Image
              src={isMobile ? menu : menuIcon}
              alt="Menu Icon"
              title="Menu Icon"
              className={`cursor-pointer ${
                isMobile ? "w-[30px]" : "w-[45px] md:w-[53px]"
              }`}
              style={{
                filter:
                  color === "white" ? "invert(1) brightness(1.5)" : "none",
              }}
              onClick={() => {
                setIsFocus(false);
                setShowMenuNav(true);
                // setShowMenu(true);
              }}
              // unoptimized
            />
          </div>
        </header>
      )}
      {showMenu && (
        <div
          className={`menu-container ${isMobile ? "mobile-menu" : ""} ${
            isClosing ? "closing" : ""
          }`}
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   left: 0,
          //   width: "100%",
          //   height: "100vh",
          //   backgroundColor: "white",
          //   zIndex: 9999,
          //   overflowY: "auto",
          // }}
        >
          <div className="close-icon cursor-pointer">
            <Image
              src={CloseIcon}
              alt="Close Icon"
              title="Close Icon"
              onClick={handleCloseMenu}
              // unoptimized
            />
          </div>
          <div className={`menu-header ${showMenu ? "active" : ""}`}>
            <Menu
              searchTextHeader={searchTextHeader}
              setShowMenu={setShowMenu}
              isFocus={isFocus}
            />
          </div>
        </div>
      )}
      <Drawer
        anchor="right"
        open={showMenuNav}
        onClose={handleCloseMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "600px" },
            maxWidth: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            overflowY: "auto",
          },
        }}
        ModalProps={{
          disableScrollLock: false,
          keepMounted: true, // Prevent background scrolling
          BackdropProps: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "20px",
          }}
        >
          {/* Close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <Image
              src={CloseIcon}
              alt="Close Icon"
              onClick={handleCloseMenu}
              style={{
                cursor: "pointer",
                filter: "brightness(0) invert(1)",
                height: "auto",
              }}
            />
            {/* <CloseIconMui alt="Close Icon"
              onClick={handleCloseMenu}
              style={{ cursor: "pointer", color:"white" }}/> */}
          </Box>

          {/* Logo */}
          <Box sx={{ marginBottom: "40px" }}>
            <Image
              src={LFLogo}
              alt="Logo"
              style={{ filter: "brightness(0) invert(1)", height: "auto" }}
            />
            {/* <Image
              src={LFTitleLogo}
              alt="Logo Title"
              style={{ filter: "brightness(0) invert(1)", height: "auto" }}
            /> */}
          </Box>

          {/* Main Navigation */}
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <React.Fragment key={item.title}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryClick(item.title)}
                    sx={{
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: "1.3rem",
                        fontWeight: "medium",
                        paddingLeft: "10px",
                      }}
                    />
                    {openCategories[item.title] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openCategories[item.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  <MultiColumnList>
                    {item.subItems.map((subItem) => (
                      // <ListItem key={subItem.title} disablePadding>
                      <ListItemButton
                        key={subItem.title}
                        sx={{
                          padding: "8px 12px",
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                          },
                        }}
                        onClick={() => {
                          router.push(subItem.href);
                          handleCloseMenu();
                        }}
                      >
                        <Typography variant="body1">{subItem.title}</Typography>
                      </ListItemButton>
                      // </ListItem>
                    ))}
                  </MultiColumnList>
                  {/* <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem.title} disablePadding>
                        <ListItemButton
                          sx={{
                            padding: "10px 0 10px 20px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          }}
                          onClick={() => {
                            router.push(subItem.href);
                            handleCloseMenu();
                          }}
                        >
                          <ListItemText
                            primary={subItem.title}
                            primaryTypographyProps={{
                              fontSize: "1rem",
                              color: "rgba(255, 255, 255, 0.8)",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List> */}
                </Collapse>
              </React.Fragment>
            ))}
          </List>

          {/* Bottom Navigation */}
          {/* <List>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            {bottomMenuItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  sx={{ padding: "12px 0" }}
                  onClick={() => {
                    router.push(item.href);
                    handleCloseMenu();
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
          <Box sx={{ marginTop: "auto" }}>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            <List>
              {bottomMenuItems.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    sx={{
                      padding: "14px 0",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                    onClick={() => {
                      router.push(item.href);
                      handleCloseMenu();
                    }}
                  >
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: "1.1rem",
                        paddingLeft: "10px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
