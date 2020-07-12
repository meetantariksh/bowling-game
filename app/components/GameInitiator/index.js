/**
 *
 * GameInitiator
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Navbar,
  Button,
  Form,
  FormControl,
  Nav,
  NavDropdown,
} from 'react-bootstrap';

import Person from '../../ObjectPrototypes/Person';

function GameInitiator(props) {
  const [name, setName] = useState('');
  const availableRolls = props.gameStatus
    ? props.person[props.currentPlayerIndex].getAvailableRolls()
    : {};

  const getBrand = () => {
    if (props.gameStatus && !props.isGameCompleted) {
      return `Active Player: ${props.person[props.currentPlayerIndex].name}`;
    }
    if (props.isGameCompleted) {
      return `Game Completed`;
    }
    return 'Add your players';
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>{getBrand()}</Navbar.Brand>
        {!props.gameStatus && <Nav className="mr-auto" />}
        {props.gameStatus && !props.isGameCompleted && (
          <Nav className="mr-auto">
            <NavDropdown title="Select your roll" id="basic-nav-dropdown">
              {Object.keys(availableRolls).map(key => (
                <NavDropdown.Item
                  onClick={() => {
                    const frame = props.person[
                      props.currentPlayerIndex
                    ].setRoll(key);
                    if (frame.isFrameComplete) {
                      const playerIndex =
                        props.person.length - 1 === props.currentPlayerIndex
                          ? 0
                          : props.currentPlayerIndex + 1;
                      if (props.person[playerIndex].gameComplete) {
                        props.person.sort(
                          (a, b) => b.totalScore - a.totalScore,
                        );
                        props.setGameCompleted({
                          gameCompleted: true,
                          winner: props.person[0].name,
                          loser: props.person[props.person.length - 1].name,
                        });
                      } else {
                        props.setCurrentPlayerIndex(playerIndex);
                        props.setCounter(props.counter + 1);
                      }
                    } else {
                      props.setCounter(props.counter + 1);
                    }
                  }}
                >
                  {availableRolls[key]}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Button variant="outline-success" onClick={() => {}}>
              Rock and Roll
            </Button>
          </Nav>
        )}
        <Form inline>
          {!props.gameStatus && (
            <div>
              <FormControl
                type="text"
                placeholder="Player Name"
                className="mr-sm-2"
                value={name}
                onChange={event => {
                  setName(event.target.value);
                }}
              />
              <Button
                variant="outline-primary"
                onClick={() => {
                  let temp = name;
                  if (temp === '') {
                    temp = 'Unnamed Player';
                  }
                  const player = new Person();
                  player.name = temp;
                  props.person.push(player);
                  setName('');
                }}
              >
                Add Player
              </Button>
            </div>
          )}

          <Button
            style={{ marginLeft: '5px' }}
            variant={props.gameStatus ? 'outline-danger' : 'outline-success'}
            onClick={() => {
              if (props.gameStatus) {
                props.resetGame();
              }
              props.setGameStatus(!props.gameStatus);
            }}
          >
            {props.gameStatus ? 'Reset current game' : 'Start the Game'}
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}

GameInitiator.propTypes = {
  person: PropTypes.array,
  setGameStatus: PropTypes.func,
  resetGame: PropTypes.func,
  gameStatus: PropTypes.bool,
  currentPlayerIndex: PropTypes.number,
  setCurrentPlayerIndex: PropTypes.func,
  counter: PropTypes.number,
  setCounter: PropTypes.func,
  isGameCompleted: PropTypes.bool,
  setGameCompleted: PropTypes.func,
};

export default memo(GameInitiator);
