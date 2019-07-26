/* eslint-disable react/require-default-props */
// @flow

import React, { type Node } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  makeStyles,
} from '@material-ui/core';

export type VariantsType = 'default' | 'col2' | 'col3';
export const Variants = ['default', 'col2', 'col3'].reduce(
  (prev, it, index) => {
    // eslint-disable-next-line no-param-reassign
    prev[it] = index;
    return prev;
  },
  {},
);

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    width: '100%',
    gridGap: 10,
    display: 'grid',
    boxSizing: 'border-box',
  },
  'details-default': {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  'details-col2': {
    gridTemplateColumns: '1fr 1fr',
  },
  'details-col3': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}));

const stylesMap = Object.keys(Variants).reduce(
  (prev, it) => {
    // eslint-disable-next-line no-param-reassign
    prev[it] = `details-${it}`;
    return prev;
  },
  {},
);

export type Props = {
  children: Node,
  title: string,
  variant?: VariantsType,
};

export const Section = ({ children, title, variant = 'default' }: Props): Node => {
  const styles = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography className={styles.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={[styles.details, styles[stylesMap[variant]]].join(' ')}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Section;
