// @flow

import React, {
  type Element,
  type Ref,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  useContext,
  cloneElement,
  createContext,
  forwardRef,
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
export const FlipContext = createContext<FlipContextType>(null);

export type SizeType = {
  width: number,
  height: number,
};

type SideProps = {
  children: Element<*>,
  style: ?Object,
  active: boolean,
}

const SideComponent = ({
  children,
  style,
  active,
}: SideProps, ref: Ref<*>) => (
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
);
export const Side = forwardRef<
  SideProps,
  typeof SideComponent,
>(SideComponent);

export type Props = {
  side?: SideTypeValues,
  frontFace: Element<*>,
  backFace: Element<*>,
  children?: Element<*>,
  naked?: boolean,
  simple?: boolean,
  style?: Object,
  autoFrontFace?: boolean,
  autoBackFace?: boolean,
  autoFaces?: boolean,
  autoSize?: boolean,
}

export const useFlippableProvider = (defaultSide = Sides.front) => {
  const [sideState, setSide] = useState(defaultSide);
  const toggleSide = useCallback(
    () => setSide(sideValue => (sideValue === Sides.front ? Sides.back : Sides.front)),
    [setSide],
  );
  const context = useMemo(
    () => makeContextValue(sideState, toggleSide),
    [sideState, toggleSide],
  );
  return context;
}

export const FlippableWithoutContext = (
  props: Props,
) => {
  const context = useFlippableProvider(props.side);
  return (
    <FlipContext.Provider value={context}>
      <FlippableComponent {...props} />
    </FlipContext.Provider>
  )
}

export const FlippableWithContext = (
  props: Props,
) => <FlippableComponent {...props} />

export const FlippableComponent = ({
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
  autoSize,
}: Props) => {
  const [init, setInit] = useState(false);
  const { value: sideState } = useContext(FlipContext);
  useLayoutEffect(
    () => { setInit(true); },
    [],
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
  const [wrapperSize, setWrapperSize] = useState<SizeType>({ width: 0, height: 0 });
  const wrapperSizeSetter = useCallback(
    ({ bounds: { width, height } }) => setWrapperSize({ width, height }),
    [setWrapperSize],
  );
  const currentSize = useMemo(
    () => (sideState === Sides.front && frontSize)
      || (sideState === Sides.back && backSize)
      || frontSize,
    [frontSize, backSize, sideState],
  );
  const ParentRender = useMemo(
    () => (naked 
      ? forwardRef((props, ref) => <div {...props} ref={ref} />) 
      : forwardRef((props, ref) => <Paper {...props} ref={ref} />)
    ),
    [naked],
  );
  const parentStyles = useMemo(
    () => {
      let finalStyles = {
        transition: 'all .5s ease-out',
      };
      if (autoSize) {
        finalStyles = { ...finalStyles, flex: 1 };
      } else {
        if (init) {
          finalStyles = { ...finalStyles, ...currentSize };
        }
      }
      if (init && !simple) {
        finalStyles = { ...finalStyles, transform: `rotateY(${sideState === Sides.front ? 0 : 180}deg)` };
      }
      finalStyles = { ...finalStyles, ...style };
      return finalStyles;
    }, 
    [autoSize, init, simple, currentSize, style]
  )
  const frontSideStyles = useMemo(
    () => {
      if (autoSize) {
        return { flex: 1, ...wrapperSize };
      }
      if (!(autoFaces || autoFrontFace)) {
        return frontSize;
      }
    },
    [autoSize, autoFaces, autoFrontFace, frontSize]
  )
  const backSideStyles = useMemo(
    () => {
      let finalStyles = {};
      if (autoSize) {
        finalStyles = { ...finalStyles, flow: 1, ...wrapperSize };
      } else {
        if (!(autoFaces || autoBackFace)) {
          finalStyles = { ... finalStyles, ...backSize };
        }
      }
      if (init && !simple) {
        finalStyles = { ...finalStyles, transform: `rotateY(${sideState === Sides.front ? 0 : -180}deg)` };
      }
      return finalStyles;
    },
    [autoSize, autoFaces, autoBackFace, backSize, sideState, init, simple],
  )
  return (
    <>
      <Measure bounds onResize={wrapperSizeSetter}>
        {({ measureRef }) => (
          <ParentRender
            ref={measureRef}
            style={parentStyles}
          >
            <Measure bounds onResize={frontSizeSetter}>
              {({ measureRef }) => (
                <Side
                  ref={measureRef}
                  style={frontSideStyles}
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
                  style={backSideStyles}
                  active={sideState === Sides.back}
                >
                  {backFace}
                </Side>
              )}
            </Measure>
          </ParentRender>
        )}
      </Measure>
      {children}
    </>
  );
}

export const Flippable = (props: Props) => {
  const parentContext = useContext(FlipContext);
  const FlippableRender = useMemo(
    () => parentContext
      ? FlippableWithContext
      : FlippableWithoutContext,
    [parentContext],
  );
  return <FlippableRender {...props} />
};

export default Flippable;
