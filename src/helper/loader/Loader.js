import React from "react";
import styles from "./Loader.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
const BlackWhiteSpinner = styled(CircularProgress)({
  color: "black", // Spinner color
  background: "white", // Background color
});
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BlackWhiteSpinner />
    </div>
    // <div className={styles.loaderContainer}>
    //   <div className={styles.container}>
    //     <div className={styles.flame} id={styles["flame-2"]}></div>
    //     <div className={styles.flame} id={styles["flame-1"]}></div>
    //     <div className={styles.flame} id={styles["flame-3"]}></div>
    //     <div className={styles.smallElement} id={styles["small-element-1"]}></div>
    //     <div className={styles.smallElement} id={styles["small-element-2"]}></div>
    //     <div className={styles.fireBottom}>
    //       <div className={styles.mainFire}></div>
    //     </div>
    //     <div className={styles.wood} id={styles["wood-1"]}></div>
    //     <div className={styles.wood} id={styles["wood-2"]}></div>
    //   </div>
    //   <p className={styles.loadingText}>Loading...</p>
    // </div>
  );
};

export default Loader;
