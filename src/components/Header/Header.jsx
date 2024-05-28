import styles from "./styles.module.css";
import React from "react";
import githubImg from "../../assets/icons/linkedin.svg";
import linkedinImg from "../../assets/icons/github.svg";

function Header() {
  return (
    <header className={styles.header}>
      <p>Welcome!</p>

      <nav>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/laura-luque1215/"
        >
          <img src={githubImg} alt="github" className={styles.social} />
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/MiauraDev">
          <img src={linkedinImg} alt="linkedin" className={styles.social} />
        </a>
      </nav>
    </header>
  );
}

export { Header };
