import styles from './styles.module.css'
import React from 'react'
import githubImg from '/icons/github.svg'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <p>Welcome!</p>
      <nav>
        <a target="_blank" rel="noreferrer" href="https://github.com/MiauraDev">
          <img src={githubImg} alt="linkedin" className={styles.social} />
        </a>
      </nav>
    </header>
  )
}

export { Header }
