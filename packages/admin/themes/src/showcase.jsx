// @flow

import React, {
  useMemo,
  type Node as ReactNode,
} from 'react';

import {
  Typography,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/styles';
import { type ThemeFormat } from './themes/types';

export const LayoutStylesList = ['horizontal', 'vertical'];
export const LayoutStyles: { ['horizontal' | 'vertical']: number } = Object.freeze(LayoutStylesList.reduce(
  (prev, style, index) => {
      prev[style] = index; // eslint-disable-line
    return prev;
  },
  {},
));

type ShowcaseLayoutStyle = $Keys<typeof LayoutStyles>;
type StyleType = { [string]: Object };
type StyleDefinitionType<T> = {
  base: StyleType,
  variants: {
    [key: T]: StyleType,
  },
};

const Styles: {
  list: StyleDefinitionType<ShowcaseLayoutStyle>,
  item: StyleDefinitionType<void>,
  title: StyleDefinitionType<void>,
} = {
  list: {
    base: {
      display: 'flex',
      flex: 1,
    },
    variants: {
      horizontal: {
        flexFlow: 'row wrap',
      },
      vertical: {
        flexFlow: 'column wrap',
      },
    },
  },
  item: {
    base: {
      flex: 1,
      margin: 10,
    },
    variants: {},
  },
  title: {
    base: {
      fontSize: 16,
      fontWeight: 'bold',
      borderBottom: 'solid 1px #ccc',
      flex: 1,
      padding: '10px',
      margin: '25px 0 10px',
    },
    variants: {},
  },
};

const getVariant = <T, P: StyleDefinitionType<T>>(
  { variants }: P,
  variant: T,
): $ElementType<$ElementType<P, 'variants'>, T> => variants[variant];

export type Props = {
  variant: ShowcaseLayoutStyle,
  themes: {[key: string]: ThemeFormat },
  children: any
};

const ThemeShowcase = ({
  variant = 'horizontal',
  themes = {},
  children,
}: Props) => {
  const themesList = useMemo(
    () => Object.keys(themes).map(id => [id, themes[id]]),
    [themes],
  );
  return (
    <div style={{
      ...Styles.list.base,
      ...getVariant(Styles.list, variant),
    }}
    >
      {themesList.map(([id, { name, theme }]: [string, ThemeFormat]): ReactNode => (
        <ThemeProvider theme={theme}>
          <div
            key={id}
            style={{
              ...Styles.item.base,
              // ...getVariant(Styles.item, variant),
            }}
          >
            <Typography
              variant="h2"
              color="primary"
              style={{
                ...Styles.title.base,
              }}
            >
              {`${name} Theme`}
            </Typography>
            {children}
          </div>
        </ThemeProvider>
      ))}
    </div>
  );
};

export default ThemeShowcase;
