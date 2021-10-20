import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmailAddress } from '../Redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      playerName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  verifyLogin() {
    const { email, playerName } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && playerName.length !== 0;
  }

  render() {
    const { email, playerName } = this.state;
    const { sendEmail } = this.props;
    const { handleChange, verifyLogin } = this;
    return (
      <form action="">
        <input
          type="text"
          placeholder="Nome"
          data-testid="input-player-name"
          name="playerName"
          value={ playerName }
          onChange={ (e) => handleChange(e) }
        />
        <input
          type="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ (e) => handleChange(e) }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => sendEmail(email) }
          disabled={ !verifyLogin() }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (emailAddress) => dispatch(addEmailAddress(emailAddress)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
