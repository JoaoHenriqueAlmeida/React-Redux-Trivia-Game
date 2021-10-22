import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RankingRows extends React.Component {
  render() {
    const { key, name, picture, score } = this.props;
    return (
      <div>
        <img src={ picture } alt={ name } />
        <span data-testid={ `player-name-${key}` }>{ name }</span>
        <span data-testid={ `player-score-${key}` }>{ score }</span>
      </div>
    );
  }
}

export default connect()(RankingRows);

RankingRows.propTypes = {
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

RankingRows.defaultProps = {

};
