import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions } from '../Redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtnVisible: false,
      questionIndex: 0,
      count: 30,
      score: 0,
      assertions: 0,
    };
    this.gameSection = this.gameSection.bind(this);
    this.verifyCorrectAnswer = this.verifyCorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.saveOnStorage = this.saveOnStorage.bind(this);
    this.removeBorder = this.removeBorder.bind(this);
    // this.saveToRanking = this.saveToRanking.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    this.saveOnStorage();
    fetchApi();
  }

  componentDidUpdate() {
    this.saveOnStorage();
    localStorage.setItem('ranking', JSON.stringify(''));
  }

  verifyCorrectAnswer() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.classList.contains('incorrect')) {
        button.classList.add('red-border');
      }
      if (button.classList.contains('correct')) {
        button.classList.add('green-border');
      }
    });
  }

  removeBorder() {
    const buttons = document.querySelectorAll('button');
    const redBorder = 'red-border';
    const greenBorder = 'green-border';
    buttons.forEach((button) => {
      if (button.classList.contains(redBorder)) {
        button.classList.remove(redBorder);
      }
      if (button.classList.contains(greenBorder)) {
        button.classList.remove(greenBorder);
      }
    });
  }

  resetTimer() { this.setState({ count: 30 }); }

  // saveToRanking() {
  //   const getLocal = JSON.parse(localStorage.getItem('state'));
  //   const getRanking = JSON.parse(localStorage.getItem('ranking'));
  //   const { name, score, gravatarEmail } = getLocal.player;
  //   Object.entries(getRanking).push({
  //     name,
  //     score,
  //     gravatarEmail,
  //   });
  //   console.log(getRanking);
  //   const newRanking = getRanking.sort((a, b) => b.score - a.score);
  //   const whatever = Object.fromEntries(newRanking);
  //   localStorage.setItem('ranking', JSON.stringify(whatever));
  // }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    this.removeBorder();
    this.resetTimer();
    this.setState({ questionIndex: questionIndex + 1 });
    const MAX_QUESTION = 4;
    if (questionIndex >= MAX_QUESTION) {
      // this.saveToRanking();
      history.push('/feedback');
    }
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

  calculateScore() {
    const { count, questionIndex } = this.state;
    const { questions } = this.props;
    const { difficulty } = questions[questionIndex];
    const MINIMUM_SCORE = 10;
    const scoreChart = { easy: 1, medium: 2, hard: 3 };
    if (difficulty === 'easy') {
      this.setState(({ score, assertions }) => ({
        score: score + (MINIMUM_SCORE + (count * scoreChart.easy)),
        assertions: assertions + 1,
      }));
    }
    if (difficulty === 'medium') {
      this.setState(({ score, assertions }) => ({
        score: score + (MINIMUM_SCORE + (count * scoreChart.medium)),
        assertions: assertions + 1,
      }));
    }
    if (difficulty === 'hard') {
      this.setState(({ score, assertions }) => ({
        score: score + (MINIMUM_SCORE + (count * scoreChart.hard)),
        assertions: assertions + 1,
      }));
    }
  }

  saveOnStorage() {
    const { name, gravatarEmail } = this.props;
    const { assertions, score } = this.state;

    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions,
      score,
      gravatarEmail,
    },
    }));
  }

  gameSection() {
    const { questions } = this.props;
    const { questionIndex, count, score } = this.state;

    return (
      <div>
        <Header score={ score } />
        <div className="game-container">
          <section className="question-card">
            <Timer count={ count } decreaseTime={ this.decreaseTime } />
            <h3 data-testid="question-text">{questions[questionIndex].question}</h3>
            <h4 data-testid="question-category">{questions[questionIndex].category}</h4>
            {questions[questionIndex].incorrect_answers.map((incorrectAnswer, index) => (
              <button
                className="answer-btn-style incorrect"
                data-testid={ `wrong-answer-${index}` }
                type="button"
                key={ index }
                disabled={ (count === 0) }
                onClick={ () => {
                  this.setState({ isBtnVisible: true });
                  this.verifyCorrectAnswer();
                } }
              >
                { incorrectAnswer }
              </button>
            ))}
            <button
              className="answer-btn-style correct"
              data-testid="correct-answer"
              type="button"
              key="3"
              onClick={ () => {
                this.setState({ isBtnVisible: true });
                this.verifyCorrectAnswer();
                this.calculateScore();
              } }
              disabled={ (count === 0) }
            >
              { questions[questionIndex].correct_answer }
            </button>
          </section>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    const { isBtnVisible, score } = this.state;
    if (loading) {
      return (
        <div>
          <Header score={ score } />
          <div className="game-container">Loading</div>
        </div>
      );
    }
    if (!isBtnVisible) {
      return (
        <div>
          { this.gameSection() }
        </div>
      );
    }
    return (
      <div>
        { this.gameSection() }
        <div className="btn-center">
          <button
            className="btn-next"
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.nextQuestion();
            } }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ login, api }) => ({
  name: login.name,
  gravatarEmail: login.gravatarEmail,
  questions: api.questions,
  loading: api.loading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAndAnswers: () => dispatch(fetchTokenAndQuestions()),
  fetchApi: () => dispatch(fetchTokenAndQuestions()),
});
Game.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
