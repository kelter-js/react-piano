import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      Powered by React, build by kelter
      <br />
      {currentYear}
    </footer>
  );
};
export default Footer;
