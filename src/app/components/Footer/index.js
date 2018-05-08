import React from 'react';
import makeClass from 'classnames';

import styles from './footer.css';

const Footer = () => (
  <footer className={makeClass(styles.footer, 'footer')}>
    <div className="container">
      <div className={makeClass('has-text-centered', 'content')}>
        <p className={styles.copyright}>
          Made with 🌳🔥💨 by Intuit. Licensed under the{' '}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>{' '}
          License.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
