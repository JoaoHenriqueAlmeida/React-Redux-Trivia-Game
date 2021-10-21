import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addLoginInfo, fetchTokenAndQuestions } from '../Redux/actions';
import logo from '../trivia.png';

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
    const { sendInfo, fetchApi } = this.props;
    const { handleChange, verifyLogin, state } = this;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
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
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ () => {
                sendInfo(state);
                fetchApi();
              } }
              disabled={ !verifyLogin() }
            >
              Jogar
            </button>
          </Link>
        </form>
      </header>
    );
  }
}

// function Login({ fetchApi, sendInfo }) {
//   const [email, setEmail] = useState('');
//   const [playerName, setPlayerName] = useState('');
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   return (
//     <header className="App-header">
//       <img src={ logo } className="App-logo" alt="logo" />
//       <p>
//         SUA VEZ
//       </p>
//       <form action="">
//         <input
//           type="text"
//           placeholder="Nome"
//           data-testid="input-player-name"
//           name="playerName"
//           value={ email }
//           onChange={ ({ target: { value } }) => setEmail(value) }
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           data-testid="input-gravatar-email"
//           name="email"
//           value={ playerName }
//           onChange={ ({ target: { value } }) => setPlayerName(value) }
//         />
//         <Link to="/game">
//           <button
//             type="button"
//             data-testid="btn-play"
//             onClick={ () => {
//               sendInfo(email, playerName);
//               fetchApi();
//             } }
//             disabled={ !(emailRegex.test(email) && playerName.length !== 0) }
//           >
//             Jogar
//           </button>
//         </Link>
//       </form>
//     </header>
//   );
// }

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchTokenAndQuestions()),
  sendInfo: (loginInfo) => dispatch(addLoginInfo(loginInfo)),
});

Login.propTypes = {
  sendInfo: PropTypes.func.isRequired,
  fetchApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
