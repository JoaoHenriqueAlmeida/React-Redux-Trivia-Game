import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addLoginInfo, fetchTokenAndQuestions } from '../Redux/actions';
import logo from '../trivia.png';
import Button from '../components/Button/index';

import '../index.css';

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
    const { sendInfo } = this.props;
    const { handleChange, verifyLogin, state } = this;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <form className="form" action="">
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
          <div>
            <Link to="/game">
              <button
                className="btn-play btn-style"
                type="button"
                data-testid="btn-play"
                onClick={ () => {
                  sendInfo(state);
                } }
                disabled={ !verifyLogin() }
              >
                Jogar
              </button>
            </Link>
            <Button />
          </div>
        </form>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchTokenAndQuestions()),
  sendInfo: (loginInfo) => dispatch(addLoginInfo(loginInfo)),
});

Login.propTypes = {
  sendInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
