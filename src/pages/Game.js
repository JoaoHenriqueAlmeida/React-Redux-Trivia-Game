import React from 'react';
// import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

class Game extends React.Component {
  // questionCategory
  // questionType
  // questionDifficulty
  // questionText
  // questionCorrectAnswer
  // qustionIncorrectAnswers

  render() {
    const answerList = ['A pistol', 'The H.E.V suit', 'Your fists'];
    const questionText = 'Pergunta teste?';
    const questionCategory = 'E-sports';
    return (
      <QuestionCard
        answerList={ answerList }
        questionText={ questionText }
        questionCategory={ questionCategory }
      />
    );
  }
}

// const mapStateToProps = ({ api: { questions } }) => ({
//   questions,
// });

// Game.propTypes = {
//   questions: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export default connect(mapStateToProps)(Game);
export default Game;
