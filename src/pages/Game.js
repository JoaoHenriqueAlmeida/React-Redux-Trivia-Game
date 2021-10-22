import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions } from '../Redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';

import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBttnVisible: false,
      questionIndex: 0,
      count: 30,
    };

    this.gameSection = this.gameSection.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  decreaseTime() {
    const { count } = this.state;
    if (count > 0) {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    } else {
      clearInterval();
    }
  }

  toggleButtonVsibility() {
    const { isBttnVisible } = this.state;
    return isBttnVisible ? this.setState({ isBttnVisible: false })
      : this.setState({ isBttnVisible: true });
  }

  gameSection() {
    const { questions } = this.props;
    const { questionIndex, count } = this.state;
    return (
      <section className="question-card">
        <h3 data-testid="question-text">{questions[questionIndex].question}</h3>
        <h4 data-testid="question-category">{questions[questionIndex].category}</h4>
        {questions[questionIndex].incorrect_answers.map((incorrectAnswer, index) => (
          <button
            className="answer-btn-style"
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ index }
            onClick={ () => this.setState({ isBttnVisible: true }) }
            disabled={ (count === 0) }
          >
            { incorrectAnswer }
          </button>
        ))}
        <button
          className="answer-btn-style"
          data-testid="correct-answer"
          type="button"
          key="3"
          onClick={ () => this.setState({ isBttnVisible: true }) }
          disabled={ (count === 0) }
        >
          { questions[questionIndex].correct_answer }
        </button>
      </section>
    );
  }

  render() {
    const { loading } = this.props;
    const { questionIndex, isBttnVisible, count } = this.state;

    if (loading) {
      return (
        <div className="container">
          <Header />
          <div>Loading</div>
        </div>
      );
    }

    if (!isBttnVisible) {
      return (
        <div className="container">
          <Header />
          <Timer count={ count } decreaseTime={ this.decreaseTime } />
          { this.gameSection() }
        </div>
      );
    }

    return (
      <div className="container">
        <Header />
        { this.gameSection() }
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.setState({ questionIndex: questionIndex + 1 }) }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ api: { questions, loading } }) => ({
  questions,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAndAnswers: () => dispatch(fetchTokenAndQuestions()),
  fetchApi: () => dispatch(fetchTokenAndQuestions()),
});

Game.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
