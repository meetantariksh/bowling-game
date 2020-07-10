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
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          {props.gameStatus
            ? `Active Player: ${props.person[props.currentPlayerIndex].name}`
            : 'Add your players'}
        </Navbar.Brand>
        {!props.gameStatus && <Nav className="mr-auto" />}
        {props.gameStatus && (
          <Nav className="mr-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
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
            variant={props.gameStatus ? "outline-danger" : "outline-success"}
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
};

export default memo(GameInitiator);
