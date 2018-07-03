import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';

import { getLocation } from './withLocation';

const Link = props => {
  return (
    <a
      {...props}
      href={props.to}
      onClick={e => {
        e.preventDefault();
        const location = new URL(path.join(window.location.origin, props.to));

        history.pushState(getLocation(location), null, props.to);
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
  to: PropTypes.string,
  onClick: PropTypes.func
};

Link.defaultProps = {
  to: '',
  onClick: () => {}
};

export default Link;
