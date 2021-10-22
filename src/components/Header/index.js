import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const imageGravatar = (email) => {
      const hash = md5(email).toString();
      const profileImageGravatar = `https://www.gravatar.com/avatar/${hash}`;
      return profileImageGravatar;
    };
    const { playerName, email } = this.props;
    const profileImage = imageGravatar(email);
    return (
      <header className="header">
        <div className="avatar-info">
          <img
            className="avatar"
            alt="Avatar perfil jogador"
            data-testid="header-profile-picture"
            src={ profileImage }
          />
          <h3 className="player-name" data-testid="header-player-name">
            { playerName }
          </h3>
        </div>
        <h3 className="score">
          Score:
          {' '}
          <span data-testid="header-score">
            0
          </span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
