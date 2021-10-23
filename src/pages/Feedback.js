import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/index';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>Bora que bora</div>
      </div>
    );
  }
}

export default connect()(Feedback);

Feedback.propTypes = {

};

Feedback.defaultProps = {

};
