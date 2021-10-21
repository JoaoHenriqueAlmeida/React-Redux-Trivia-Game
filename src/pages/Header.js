import React, { Component } from 'react';
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
    console.log(playerName);
    const profileImage = imageGravatar(email);
    return (
      <div>
        <img
          alt="Avatar perfil jogador"
          data-testid="header-profile-picture"
          src={ profileImage }
        />
        <h3 data-testid="header-player-name">
          { playerName }
        </h3>
        <span data-testid="header-score">
          0
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Header;
