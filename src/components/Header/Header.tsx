import styles from './styles.module.css'
import React from 'react'
import githubImg from '/icons/linkedin.svg'
import linkedinImg from '/icons/github.svg'

const Header: React.FC = () => {
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
  )
}

export { Header }
