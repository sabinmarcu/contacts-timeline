// @flow

import React, {
  type Element,
} from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { styled } from 'linaria/react';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export type Props = {
  left: Element<*>,
  right: Element<*>,
  title: string,
}

export const Navigation = ({
  left,
  right,
  title,
}: Props) => (
  <AppBar position="static">
    <StyledToolbar>
      {left}
      <Typography variant="h6" color="initial">
        {title || 'Awesome Stuff'}
      </Typography>
      {right}
    </StyledToolbar>
  </AppBar>
);

export default Navigation;
