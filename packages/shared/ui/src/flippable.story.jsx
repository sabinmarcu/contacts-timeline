// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React, { forwardRef, useContext } from 'react';
import { storiesOf } from '@storybook/react';

import { Button, Typography } from '@material-ui/core';
import { Flippable, FlipContext, useFlippableProvider } from './flippable';

const Placeholder = forwardRef(({ width, height, selfStyle = false }, ref) => (
  <div style={!selfStyle ? { width, height } : { width: '100%', height: '100%' }} ref={ref}>
    <img src={`https://via.placeholder.com/${width}x${height}/fff/000`} style={selfStyle ? { width: '100%', height: '100%', objectFit: 'cover' } : {}} alt="" />
  </div>
));

const Toggle = () => {
  const { value, setter } = useContext(FlipContext);
  return (
    <Button onClick={setter}>{`Toggle Side: ${value}`}</Button>
  );
};

const Wrapper = ({ children }) => {
  const context = useFlippableProvider();
  return <FlipContext.Provider value={context}>
    <Typography variant="h6">Side: {context.value}</Typography>
    {children}
  </FlipContext.Provider>
}

storiesOf('Flippable', module)
  .add('Demo (With Context)', () => (
    <Flippable
      frontFace={<Placeholder width={300} height={400} />}
      backFace={<Placeholder width={500} height={200} />}
    >
      <Toggle />
    </Flippable>
  ))
  .add('Demo (Without Context)', () => (
    <Wrapper>
      <Flippable
        frontFace={<Placeholder width={300} height={400} />}
        backFace={<Placeholder width={500} height={200} />}
      />
      <Toggle />
    </Wrapper>
  )).add('Demo (Autosize)', () => (
    <div style={{
      display: 'grid',
      gridTemplate: 'repeat(auto-fill, minmax(400px, 1fr)) / repeat(auto-fill, minmax(300px, 1fr))',
      gridGap: 10,
      height: Math.ceil(10 / Math.floor(window.innerWidth / 320)) * 420
    }}>
      {new Array(10).fill(0).map((_, index) => (
        <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
          <Flippable
            frontFace={<Placeholder width={300} height={400} selfStyle />}
            backFace={<Placeholder width={500} height={200} selfStyle />}
            autoSize
          >
            <Toggle />
          </Flippable>
        </div>
      ))}
    </div>
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
