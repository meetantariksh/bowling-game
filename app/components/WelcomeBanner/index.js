/**
 *
 * WelcomeBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';

function WelcomeBanner(props) {
  const getBrand = () => {
    if (props.gameStatus && !props.isGameCompleted) {
      return <p>Awesome!!! Your game is now in progress.</p>;
    }
    if (props.isGameCompleted) {
      return (
        <p>
          Congratulations <b>{props.winner}</b>, you won this round. <br />
          Unfortunately, <b>{props.loser}</b> pays for the drinks.
        </p>
      );
    }
    return <p>Let us start by creating your players.</p>;
  };

  return (
    <div>
      <Jumbotron>
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome To the Bowling Game Calculator</h1>
          {getBrand()}
        </div>
      </Jumbotron>
    </div>
  );
}

WelcomeBanner.propTypes = {
  gameStatus: PropTypes.bool,
  isGameCompleted: PropTypes.bool,
  winner: PropTypes.string,
  loser: PropTypes.string,
};

export default WelcomeBanner;
