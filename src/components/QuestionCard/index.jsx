import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    const { questionText, answerList, questionCategory, correctAnswer } = this.props;
    return (
      <section className="QuestionCard">
        <h3 data-testid="question-text">{questionText}</h3>
        <h4 data-testid="question-category">{questionCategory}</h4>
        {answerList.map((incorrectAnswer, index) => (
          <button data-testid={ `wrong-answer-${index}` } type="button" key={ index }>
            { incorrectAnswer }
          </button>
        ))}
        <button data-testid="correct-answer" type="button" key="3">
          { correctAnswer }
        </button>
      </section>
    );
  }
}

QuestionCard.propTypes = {
  questionText: PropTypes.string.isRequired,
  answerList: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionCategory: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default QuestionCard;
