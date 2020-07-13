/**
 *
 * ScoreBoard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import Person from '../../ObjectPrototypes/Person';

function ScoreBoard(props) {
  const score = [];
  const { frames } = props.player;

  const getFrameVal = (frame, index) => {
    if (frame) {
      if (frame.frame && frame.frame[index]) {
        return frame.frame[index].roll;
      }
      return '-';
    }
    return '-';
  };

  const getFrameTotal = frame => {
    if (frame) {
      if (frame.isFrameComplete && frame.isFrameScoreCalculated) {
        return frame.frameScore;
      }
      return '-';
    }
    return '-';
  };

  for (let i = 0; i < 10; ) {
    const frame = frames[i];
    score.push(
      <td>
        <tr>
          <td>{getFrameVal(frame, 0)}</td>
          <td>{getFrameVal(frame, 1)}</td>
          {i === 9 && <td>{getFrameVal(frame, 2)}</td>}
        </tr>
        <tr>
          <td colSpan="2">{getFrameTotal(frame)}</td>
        </tr>
      </td>,
    );
    i += 1;
  }
  return (
    <div>
      <Table
        responsive="xl"
        striped
        bordered
        hover
        variant={
          props.isActive && !props.player.gameComplete ? 'dark' : 'light'
        }
        style={{
          minWidth: 'max-content',
          backgroundColor: props.player.gameComplete ? '#ace134' : '',
        }}
      >
        <tbody>
          <tr>
            <td>{props.index}</td>
            <td>{props.player.name}</td>
            {score}
            {props.player.gameComplete && (
              <td>
                Game Completed
                <br />
                <b>{props.player.totalScore}</b>
              </td>
            )}
            {!props.player.gameComplete && <td>Game in Progress</td>}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

ScoreBoard.propTypes = {
  player: PropTypes.objectOf(Person).isRequired,
  isActive: PropTypes.bool,
  index: PropTypes.number,
};

export default ScoreBoard;
