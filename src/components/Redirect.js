import React from 'react';
import PropTypes from 'prop-types';

class Redirect extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        data-testid="btn-ranking"
        type="button"
        onClick={ onClick }
      >
        Ver ranking
      </button>
    );
  }
}

Redirect.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Redirect;
