// @flow

import React, {
  type Element,
  type Ref,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  useContext,
  useEffect,
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
export type SideTypeValueToggler = () => void;
export type FlipContextType = {
  value: SideTypeValues,
  setter: ?SideTypeValueToggler,
};

const makeContextValue = (
  value: SideTypeValues,
  setter: ?SideTypeValueToggler = null,
): FlipContextType => ({
  value,
  setter,
});
export const FlipContext = createContext<?FlipContextType>(null);

export type SizeType = {
  width: number,
  height: number,
};

type SideProps = {
  children: Element<*>,
  style: ?Object,
  active: boolean,
  animationDuration: number,
}

const SideComponent = ({
  children,
  style,
  active,
  animationDuration,
}: SideProps, ref: Ref<*>) => {
  const [zIndex, setZIndex] = useState(active ? 1 : 0);
  useEffect(
    () => {
      setTimeout(setZIndex, animationDuration, active ? 1 : 0);
    },
    [active, setZIndex],
  );
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        transition: 'opacity .5s ease-out',
        transitionDelay: active ? `.${animationDuration}s` : '0s',
        transitionDuration: active ? `.${animationDuration}s` : `.${animationDuration * 60 / 100}s`,
        opacity: active ? 1 : 0,
        zIndex,
      }}
      ref={ref}
    >
      {/* {cloneElement(children, { ref })} */}
      {typeof children === 'function' ? children() : children}
    </div>
  );
};
export const Side = forwardRef<
  SideProps,
  HTMLDivElement,
>(SideComponent);

export type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
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
  animationDuration?: number,
}

export const useFlippableProvider = (defaultSide: SideTypeValues = Sides.front) => {
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
};

export const FlippableWithoutContext = (
  props: Props,
) => {
  const { side } = props;
  const context = useFlippableProvider(side);
  return (
    <FlipContext.Provider value={context}>
      <FlippableComponent {...props} />
    </FlipContext.Provider>
  );
};

export const FlippableWithContext = (
  props: Props,
) => <FlippableComponent {...props} />;

export const FlippableComponent = ({
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
  animationDuration = 0.5,
}: Props) => {
  const [init, setInit] = useState(false);
  const context = useContext(FlipContext);
  const { value: sideState } = context || {};
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
        transition: `all ${animationDuration}s ease-out`,
      };
      if (autoSize) {
        finalStyles = { ...finalStyles, flex: 1 };
      } else if (init) {
        finalStyles = { ...finalStyles, ...currentSize };
      }
      if (init && !simple) {
        finalStyles = { ...finalStyles, transform: `rotateY(${sideState === Sides.front ? 0 : 180}deg)` };
      }
      finalStyles = { ...finalStyles, ...style };
      return finalStyles;
    },
    [autoSize, init, simple, currentSize, style],
  );
  const frontSideStyles = useMemo(
    () => {
      if (autoSize) {
        return { flex: 1, display: 'flex', ...wrapperSize };
      }
      if (!(autoFaces || autoFrontFace)) {
        return frontSize;
      }
      return {};
    },
    [autoSize, autoFaces, autoFrontFace, frontSize, wrapperSize],
  );
  const backSideStyles = useMemo(
    () => {
      let finalStyles = {};
      if (autoSize) {
        finalStyles = {
          ...finalStyles, flex: 1, display: 'flex', ...wrapperSize,
        };
      } else if (!(autoFaces || autoBackFace)) {
        finalStyles = { ...finalStyles, ...backSize };
      }
      if (init && !simple) {
        finalStyles = { ...finalStyles, transform: `rotateY(${sideState === Sides.front ? 0 : -180}deg)` };
      }
      return finalStyles;
    },
    [autoSize, autoFaces, autoBackFace, backSize, sideState, init, simple, wrapperSize],
  );
  return (
    <div style={{
      perspective: 800,
      perspectiveOrigin: 'top center',
      display: 'flex',
      flex: 1,
    }}
    >
      <Measure bounds onResize={wrapperSizeSetter}>
        {({ measureRef: parentMeasureRef }) => (
          <ParentRender
            ref={parentMeasureRef}
            style={parentStyles}
          >
            <Measure bounds onResize={frontSizeSetter}>
              {({ measureRef }) => (
                <Side
                  ref={measureRef}
                  style={frontSideStyles}
                  active={sideState === Sides.front}
                  animationDuration={animationDuration}
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
                  animationDuration={animationDuration}
                >
                  {backFace}
                </Side>
              )}
            </Measure>
          </ParentRender>
        )}
      </Measure>
      {children}
    </div>
  );
};

export const Flippable = (props: Props) => {
  const parentContext = useContext(FlipContext);
  const FlippableRender = useMemo(
    () => (parentContext
      ? FlippableWithContext
      : FlippableWithoutContext),
    [parentContext],
  );
  return <FlippableRender {...props} />;
};

export default Flippable;
