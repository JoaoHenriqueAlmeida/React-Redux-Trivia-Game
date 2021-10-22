import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions } from '../Redux/actions';
import Header from '../components/Header';

import './game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  render() {
    const { questions, loading } = this.props;
    if (loading) {
      return (
        <div className="container">
          <Header />
          <div>Loading</div>
        </div>
      );
    }
    return (
      <div className="game-container">
        <Header />
        <section className="question-card">
          <h3 data-testid="question-text">{questions[0].question}</h3>
          <h4 data-testid="question-category">{questions[0].category}</h4>
          {questions[0].incorrect_answers.map((incorrectAnswer, index) => (
            <button className="answer-btn-style" data-testid={ `wrong-answer-${index}` } type="button" key={ index }>
              { incorrectAnswer }
            </button>
          ))}
          <button className="answer-btn-style" data-testid="correct-answer" type="button" key="3">
            { questions[0].correct_answer }
          </button>
        </section>
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
