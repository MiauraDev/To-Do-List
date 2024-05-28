import React from "react";
import styles from "./styles.module.css";
import searchIcon from "../../assets/icons/search.svg";
function TodoSearch() {
  return (
    <div className={styles["search-container"]}>
      <img
        src={searchIcon}
        alt="Search Icon"
        className={styles["search-icon"]}
      />
      <input
        type="text"
        placeholder="Busca tu task..."
        className={styles.search}
      />
    </div>
  );
}

export { TodoSearch };
