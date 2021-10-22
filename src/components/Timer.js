import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.decreaseTime();
    }, ONE_SECOND);
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

  render() {
    const { count } = this.state;
    return (
      <div>
        { `00:${count}` }
      </div>
    );
  }
}

export default connect()(Timer);

Timer.propTypes = {

};

Timer.defaultProps = {

};
