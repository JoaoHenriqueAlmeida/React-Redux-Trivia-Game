import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions } from '../Redux/actions';
import Header from '../components/Header';

import '../index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBtnVisible: false,
      questionIndex: 0,
    };

    this.gameSection = this.gameSection.bind(this);
    this.verifyCorrectAnswer = this.verifyCorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  nextQuestion() {
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
    const { questionIndex } = this.state;
    this.setState({ questionIndex: questionIndex + 1 });
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

  gameSection() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    return (
      <div className="game-container">
        <section className="question-card">
          <h3 data-testid="question-text">{questions[questionIndex].question}</h3>
          <h4 data-testid="question-category">{questions[questionIndex].category}</h4>
          {questions[questionIndex].incorrect_answers.map((incorrectAnswer, index) => (
            <button
              className="answer-btn-style incorrect"
              data-testid={ `wrong-answer-${index}` }
              type="button"
              key={ index }
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
            } }
          >
            { questions[questionIndex].correct_answer }
          </button>
        </section>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    const { isBtnVisible } = this.state;

    if (loading) {
      return (
        <div>
          <Header />
          <div className="game-container">Loading</div>
        </div>
      );
    }

    if (!isBtnVisible) {
      return (
        <div>
          <Header />
          { this.gameSection() }
        </div>
      );
    }
    return (
      <div>
        <Header />
        { this.gameSection() }
        <div className="btn-center">
          <button
            className="btn-next"
            type="button"
            data-testid="btn-next"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>
        </div>
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
