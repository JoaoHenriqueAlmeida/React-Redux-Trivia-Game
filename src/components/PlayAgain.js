import React from 'react';
import PropTypes from 'prop-types';

class PlayAgain extends React.Component {
  render() {
    const { id, label, onClick } = this.props;
    return (
      <button
        data-testid={ id }
        type="button"
        onClick={ onClick }
      >
        { label }
      </button>
    );
  }
}

PlayAgain.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayAgain;
