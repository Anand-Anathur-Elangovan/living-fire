import React from "react";
import styles from "./SearchBanner.module.css";

const SearchBanner = () => {
  return (
    <section className={styles.searchBanner}>
      <div className={styles.column}>
        <div className={styles.searchByProduct}>
          <div className={styles.searchText}>
            <p className={styles.searchBy}>Search By Product</p>
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
            />
            <img
              src="/assets/searchicon.svg"
              alt="Search"
              className={styles.searchIcon}
            />
          </div>
        </div>
        <div className={styles.selectABrand}>
          <div className={styles.brandSelect}>
            <p className={styles.filter}>Select a Brand</p>
            <form className={styles.chipViewBrand}>
              {["ADF", "Austroflamm", "Castworks", "Cocoon", "Eurostove"].map(
                (brand, index) => (
                  <label
                    key={index}
                    tabIndex="0"
                    className={styles.brandSelector}
                  >
                    <input
                      type="checkbox"
                      name="selectedChipOptions"
                      value={index + 1}
                      hidden
                      className={styles.checkbox}
                    />
                    <span>{brand}</span>
                  </label>
                )
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
