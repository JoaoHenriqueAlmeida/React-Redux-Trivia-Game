import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/index';

class Feedback extends React.Component {
  render() {
    const getLocal = JSON.parse(localStorage.getItem('state'));
    const { score } = getLocal.player;
    return (
      <div>
        <Header score={ score } />
        <div data-testid="feedback-text">Você foi malzão</div>
      </div>
    );
  }
}

export default connect()(Feedback);

Feedback.propTypes = {

};

Feedback.defaultProps = {

};
