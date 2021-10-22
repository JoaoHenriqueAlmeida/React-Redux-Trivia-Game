import React from 'react';
import { connect } from 'react-redux';

import RankingRows from '../components/RankingRows';

class Ranking extends React.Component {
  render() {
    const ranking = localStorage.getItem('ranking');
    return (
      <div>
        { JSON.parse(ranking).map((rankingRow) => (
          <RankingRows
            key={ rankingRow.id }
            name={ rankingRow.name }
            picture={ rankingRow.picture }
            score={ rankingRow.score }
          />
        ))}
      </div>
    );
  }
}

export default connect()(Ranking);

Ranking.propTypes = {

};

Ranking.defaultProps = {

};
