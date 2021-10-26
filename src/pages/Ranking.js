import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlayAgain from '../components/PlayAgain';
import RankingRows from '../components/RankingRows';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    return history.push('/');
  }

  render() {
    const ranking = localStorage.getItem('ranking');
    return (
      <section>
        <h3 data-testid="ranking-title">Ranking</h3>
        <div>
          { JSON.parse(ranking).map((rankingRow, index) => (
            <RankingRows
              key={ index }
              index={ index }
              name={ rankingRow.name }
              gravatarEmail={ rankingRow.gravatarEmail }
              score={ rankingRow.score }
            />
          ))}
        </div>
        <PlayAgain
          id="btn-go-home"
          label="Início"
          onClick={ this.handleClick }
        />
      </section>
    );
  }
}

export default connect()(Ranking);

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

Ranking.defaultProps = {

};
