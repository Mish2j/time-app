import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>by Mishel Ghukasyan</p>
      <div className={styles["footer__social"]}>
        <a
          target="_blank"
          href="https://github.com/Mish2j"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github-square"></i>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mishel-ghukasyan/"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
