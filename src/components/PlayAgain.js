import React from 'react';
import PropTypes from 'prop-types';

class PlayAgain extends React.Component {
  render() {
    const { id, label, onClick, fixedBottom } = this.props;
    return (
      <button
        className={ `btn-style ${fixedBottom}` }
        data-testid={ id }
        type="button"
        onClick={ onClick }
      >
        <p>{ label }</p>
      </button>
    );
  }
}

PlayAgain.propTypes = {
  fixedBottom: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayAgain;
