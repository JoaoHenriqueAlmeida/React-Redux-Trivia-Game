import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayAgain from '../components/PlayAgain';
import Redirect from '../components/Redirect';

import Header from '../components/Header/index';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 'btn-play-again',
      label: 'Jogar novamente',
    };

    this.handleClick = this.handleClick.bind(this);
    this.goodFeedback = this.goodFeedback.bind(this);
    this.badFeedback = this.badFeedback.bind(this);
    this.displayFeedBackContent = this.displayFeedBackContent.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    return history.push('/');
  }

  redirectRanking() {
    const { history } = this.props;
    console.log(history);
    return history.push('/ranking');
  }

  displayFeedBackContent() {
    const getLocal = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = getLocal.player;
    const { id, label } = this.state;
    const { handleClick, redirectRanking } = this;

    return (
      <>
        <div>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' '}
          perguntas e fez
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
          {' '}
          Pontos!
        </div>
        <PlayAgain id={ id } label={ label } onClick={ handleClick } />
        <Redirect onClick={ redirectRanking } />
      </>
    );
  }

  goodFeedback() {
    const getLocal = JSON.parse(localStorage.getItem('state'));
    const { score } = getLocal.player;
    const { displayFeedBackContent } = this;
    const notThatBad = 'Mandou bem!';

    return (
      <>
        <Header score={ score } />
        <div data-testid="feedback-text">{ notThatBad }</div>
        { displayFeedBackContent() }
      </>
    );
  }

  badFeedback() {
    const getLocal = JSON.parse(localStorage.getItem('state'));
    const { score } = getLocal.player;
    const { displayFeedBackContent } = this;
    const getBetterNoob = 'Podia ser melhor...';

    return (
      <>
        <Header score={ score } />
        <div data-testid="feedback-text">{ getBetterNoob }</div>
        { displayFeedBackContent() }
      </>
    );
  }

  render() {
    const { goodFeedback, badFeedback } = this;
    const getLocal = JSON.parse(localStorage.getItem('state'));
    const { assertions } = getLocal.player;
    const MINIMUM_SCORE = 3;

    if (assertions >= MINIMUM_SCORE) return <>{ goodFeedback() }</>;
    if (assertions < MINIMUM_SCORE) return <>{ badFeedback() }</>;
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

Feedback.defaultProps = {

};

export default connect()(Feedback);
