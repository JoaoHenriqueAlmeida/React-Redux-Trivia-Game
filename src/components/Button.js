import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Button extends Component {
  render() {
    return (
      <Link to="/config">
        <button data-testid="btn-settings" type="button">Config</button>
      </Link>
    );
  }
}
