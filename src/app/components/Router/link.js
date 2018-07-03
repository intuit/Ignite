import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';

import { getLocation } from './withLocation';

const Link = props => {
  return (
    <a
      {...props}
      onClick={e => {
        e.preventDefault();
        const location = new URL(path.join(window.location.origin, props.href));

        history.pushState(getLocation(location), null, props.href);
        props.onClick();

        const popStateEvent = new CustomEvent('changeLocation', {
          detail: location
        });
        dispatchEvent(popStateEvent);

        return false;
      }}
    />
  );
};

Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func
};

Link.defaultProps = {
  href: '',
  onClick: () => {}
};

export default Link;
