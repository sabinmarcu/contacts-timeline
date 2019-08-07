// @flow
/* eslint-disable arrow-parens */

import {
  useState,
  useMemo,
  useCallback,
  useDebugValue,
} from 'react';

type UseFlowReturnType<T> = {
  Steps: { [T]: number },
  step: number,
  setStep: Function,
  nextStep: () => void,
  prevStep: () => void,
}
export const useFlow = <T: string[]>(steps: T): UseFlowReturnType<T> => {
  const Steps = useMemo(
    () => steps.reduce(
      (prev, type, index) => {
        // eslint-disable-next-line no-param-reassign
        prev[type] = index;
        return prev;
      },
      {},
    ),
    [],
  );
  const [step, setStep] = useState(0);
  const nextStep = useCallback(
    () => setStep(value => value + 1),
    [setStep],
  );
  const prevStep = useCallback(
    () => setStep(value => value - 1),
    [setStep],
  );
  useDebugValue(`Step: ${steps[step]} (${step})`);
  return {
    Steps,
    step,
    setStep,
    nextStep,
    prevStep,
  };
};

export default useFlow;
