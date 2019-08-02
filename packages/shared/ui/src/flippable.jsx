// @flow

import React, {
  type Node,
  type Ref,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  cloneElement,
  createContext,
  useImperativeHandle,
} from 'react';
import {
  Paper,
} from '@material-ui/core';
import Measure from 'react-measure';

export const Sides = {
  front: 1,
  back: 2,
};
export type SideType = $Keys<typeof Sides>;

type SideTypeValues = $Values<typeof Sides>;

export type SideTypeValuesSetter = SideTypeValues => void;
export type FlipContextType = {
  value: SideTypeValues,
  setter: ?SideTypeValuesSetter,
};

const makeContextValue = (
  value: SideTypeValues,
  setter: ?SideTypeValuesSetter = null,
): FlipContextType => ({
  value,
  setter,
});
export const FlipContext = createContext<FlipContextType>(
  makeContextValue(Sides.front),
);

export type SizeType = {
  width: number,
  height: number,
};

type SideProps = {
  children: Node,
  style: ?SizeType,
  active: Boolean,
}
export const Side = forwardRef(({
  children,
  style,
  active,
}: SideProps, ref: Ref) => (
  <div
    style={{
      ...style,
      position: 'absolute',
      transition: 'opacity .5s ease-out',
      transitionDelay: active ? '.5s' : '0s',
      transitionDuration: active ? '.5s' : '.3s',
      opacity: active ? 1 : 0,
      zIndex: active ? 1 : -1,
    }}
  >
    {cloneElement(children, { ref })}
  </div>
));

export type Props = {
  side: SideTypeValues,
  frontFace: Node,
  backFace: Node,
  children: ?Node,
  naked: ?boolean,
  simple: ?boolean,
  style: ?Object,
  autoFrontFace: ?boolean,
  autoBackFace: ?boolean,
  autoFaces: ?boolean,
}

export const Flippable = forwardRef(({
  side = Sides.front,
  frontFace,
  backFace,
  children,
  naked = false,
  simple = false,
  style,
  autoFrontFace,
  autoBackFace,
  autoFaces,
}: Props, ref: Ref) => {
  const [sideState, setSide] = useState(side);
  const toggleSide = useCallback(
    () => setSide(sideValue => (sideValue === Sides.front ? Sides.back : Sides.front)),
    [setSide],
  );
  const [frontSize, setFrontSize] = useState<SizeType>({ width: 0, height: 0 });
  const frontSizeSetter = useCallback(
    ({ bounds: { width, height } }) => setFrontSize({ width, height }),
    [setFrontSize],
  );
  const [backSize, setBackSize] = useState<SizeType>({ width: 0, height: 0 });
  const backSizeSetter = useCallback(
    ({ bounds: { width, height } }) => setBackSize({ width, height }),
    [setBackSize],
  );
  const currentSize = useMemo(
    () => (sideState === Sides.front && frontSize) || (sideState === Sides.back && backSize),
    [frontSize, backSize, sideState],
  );
  const ParentRender = useMemo(
    () => (naked ? props => <div {...props} /> : Paper),
    [naked],
  );
  const componentInterface = useMemo(
    () => makeContextValue(sideState, toggleSide),
    [sideState, toggleSide],
  );
  useImperativeHandle(
    ref,
    () => componentInterface,
  );
  return (
    <FlipContext.Provider value={componentInterface}>
      <ParentRender
        style={{
          ...currentSize,
          transition: 'all .5s ease-out',
          transform: !simple && `rotateY(${sideState === Sides.front ? 0 : 180}deg)`,
          ...style,
        }}
      >
        <Measure bounds onResize={frontSizeSetter}>
          {({ measureRef }) => (
            <Side
              ref={measureRef}
              style={!(autoFaces || autoFrontFace) && frontSize}
              active={sideState === Sides.front}
            >
              {frontFace}
            </Side>
          )}
        </Measure>
        <Measure bounds onResize={backSizeSetter}>
          {({ measureRef }) => (
            <Side
              ref={measureRef}
              style={{
                ...(autoFaces || autoBackFace ? {} : backSize),
                transform: !simple && `rotateY(${sideState === Sides.front ? 0 : -180}deg)`,
              }}
              active={sideState === Sides.back}
            >
              {backFace}
            </Side>
          )}
        </Measure>
      </ParentRender>
      {children}
    </FlipContext.Provider>
  );
});

export default Flippable;
