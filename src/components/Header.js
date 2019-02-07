import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ message }) => {
  return (
    <h2 className="Header text-center">
      {message}
    </h2>
  );
};

//Type checking
Header.propTypes = {
  message: PropTypes.string
};

Header.defaultProps = {
  message: 'Hello!!'
}

export default Header