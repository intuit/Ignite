import React from 'react';
import makeClass from 'classnames';

import styles from './footer.css';

const Footer = () => (
  <footer className={makeClass(styles.footer, 'footer')}>
    <p className={makeClass('has-text-centered', styles.copyright)}>
      Made with 🌳🔥💨 by Intuit. Licensed under the MIT License.
    </p>
  </footer>
);

export default Footer;
