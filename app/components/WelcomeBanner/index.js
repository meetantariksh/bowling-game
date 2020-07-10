/**
 *
 * WelcomeBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';

function WelcomeBanner(props) {
  return (
    <div>
      <Jumbotron>
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome To the Bowling Game Calculator</h1>
          <p>
            {props.gameStatus
              ? 'Awesome!!! Your game is now in progress.'
              : 'Let us start by creating your players.'}
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}

WelcomeBanner.propTypes = {
  gameStatus: PropTypes.bool,
};

export default WelcomeBanner;
