import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RankingButton from '../components/RankingButton';
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
        <RankingButton
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
