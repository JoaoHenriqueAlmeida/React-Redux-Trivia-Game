// createAnswers(answer, answerIndex, question) {
//   const { count } = this.state;
//   const { changeColor, calculateScore, interval, activateNextButton } = this;
//   return (
//     <button
//       disabled={ count === 0 }
//       type="button"
//       key={ answerIndex }
//       style={ {} }
//       onClick={ (event) => {
//         clearInterval(interval);
//         changeColor();
//         calculateScore(event, question.difficulty);
//         activateNextButton();
//       } }
//       value={ question.correct_answer === answer
//         ? correctAnswer : 'wrong-answer' }
//       data-testid={
//         question.correct_answer === answer
//           ? correctAnswer : `wrong-answer-${answerIndex}`
//       }
//     >
//       {answer}
//     </button>
//   );
// }
