import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenAndQuestions } from '../Redux/actions';

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
    // const answerList = ['A pistol', 'The H.E.V suit', 'Your fists'];
    // const questionText = 'Pergunta teste?';
    // const questionCategory = 'E-sports';
    const { questions, loading } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }
    return (
      <section className="QuestionCard">
        <h3 data-testid="question-text">{questions[0].question}</h3>
        <h4 data-testid="question-category">{questions[0].category}</h4>
        {questions[0].incorrect_answers.map((incorrectAnswer, index) => (
          <button data-testid={ `wrong-answer-${index}` } type="button" key={ index }>
            { incorrectAnswer }
          </button>
        ))}
        <button data-testid="correct-answer" type="button" key="3">
          { questions[0].correct_answer }
        </button>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
