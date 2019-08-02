// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React, { forwardRef, useContext } from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '@material-ui/core';
import { Flippable, FlipContext } from './flippable';

const Placeholder = forwardRef(({ width, height }, ref) => (
  <div style={{ width, height }} ref={ref}>
    <img src={`https://via.placeholder.com/${width}x${height}/fff/000`} alt="" />
  </div>
));

const Toggle = () => {
  const { value, setter } = useContext(FlipContext);
  return (
    <Button onClick={setter}>{`Toggle Side: ${value}`}</Button>
  );
};

storiesOf('Flippable', module)
  .add('Demo', () => (
    <Flippable
      frontFace={<Placeholder width={300} height={400} />}
      backFace={<Placeholder width={500} height={200} />}
    >
      <Toggle />
    </Flippable>
  )).add('Demo (Paperless)', () => (
    <Flippable
      naked
      frontFace={<Placeholder width={300} height={400} />}
      backFace={<Placeholder width={500} height={200} />}
    >
      <Toggle />
    </Flippable>
  )).add('Demo (Simple)', () => (
    <Flippable
      simple
      frontFace={<Placeholder width={300} height={400} />}
      backFace={<Placeholder width={500} height={200} />}
    >
      <Toggle />
    </Flippable>
  ))
  .add('Demo (Simple Paperless)', () => (
    <Flippable
      simple
      naked
      frontFace={<Placeholder width={300} height={400} />}
      backFace={<Placeholder width={500} height={200} />}
    >
      <Toggle />
    </Flippable>
  ));
