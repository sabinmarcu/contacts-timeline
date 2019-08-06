// @flow
import React, { useState, useEffect } from 'react';
import { styled } from 'linaria/react';
import {
  CircularProgress,
  Typography,
} from '@material-ui/core';

export const Wrapper = styled.section`
  flex: 1;
  overflow: auto;
`;

export const List = ({
  amount,
  minWidth = 300,
  maxWidth = 500,
  height = 400,
  margin = 15,
  children,
}: {
  amount: number,
  minWidth?: number,
  maxWidth?: number,
  height?: number,
  margin?: number,
  children: any,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(
    () => {
      const handler = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
    [setWidth],
  );
  return (
    <Grid
      amount={amount}
      height={height}
      margin={margin}
      columns={parseInt(Math.min(width / minWidth, width / maxWidth), 10)}
    >
      {children}
    </Grid>
  );
};

export const Grid = styled.section`
  /* perspective: 2000px;
  perspective-origin: top center; */
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(${({ height }) => height}px, 1fr));
  grid-gap: ${({ margin }) => margin}px;
  margin: ${({ margin }) => margin}px;
  height: ${({
    amount, columns, height, margin,
  }) => Math.ceil(amount / columns) * (height + margin)}px;
  /* display: flex;
  flex-flow: row wrap;
  align-items: space-around;
  justify-content: center; */
  /* padding: ${({ margin }) => margin / 2}px;
  & > * {
    margin: ${({ margin }) => margin / 2}px;
  } */
`;

export const LoadingWrapper = styled.section`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

export const LoadingProgress = styled(CircularProgress)`
  width: 25vmin !important;
  height: 25vmin !important;
`;

export const LoadingText = styled(Typography)`
  font-size: 10vmin !important;
`;
