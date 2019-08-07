import React, { useCallback, useEffect } from 'react';
import { useCounter } from '../hooks/useCounter';
import {
  ButtonGroup,
  Button
} from '@material-ui/core';

console.log(useCounter)

export const Counter = () => {
  const [counter, mutate, rawSet] = useCounter();
  const addOne = useCallback(() => mutate(1), [mutate]);
  const addFive = useCallback(() => mutate(5), [mutate]);
  const subOne = useCallback(() => mutate(-1), [mutate]);
  const subFive = useCallback(() => mutate(-5), [mutate]);
  const reset = useCallback(() => rawSet(0), [rawSet]);
  useEffect(
    () => {
      document.title = `Counted: ${counter}`
    },
    [counter],
  );
  return (
    <ButtonGroup variant="contained" color="primary" >
      <Button onClick={subFive}>-5</Button>
      <Button onClick={subOne}>-1</Button>
      <Button variant="contained" color="primary">Count: {counter}</Button>
      <Button onClick={addOne}>+1</Button>
      <Button onClick={addFive}>+5</Button>
      <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
    </ButtonGroup>
  )
}