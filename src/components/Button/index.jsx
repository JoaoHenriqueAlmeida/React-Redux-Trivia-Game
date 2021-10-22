import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../pages/login.css';

export default class Button extends Component {
  render() {
    return (
      <Link to="/config">
        <button
          className="btn-style"
          data-testid="btn-settings"
          type="button"
        >
          Config
        </button>
      </Link>
    );
  }
}
