import { useState, useCallback } from 'react';

export const useCounter = () => {
  const [counter, setCounter] = useState(0);
  const mutate = useCallback(
    amount => setCounter(count => count + amount),
    [setCounter],
  );
  return [counter, mutate, setCounter];
}

export default useCounter;