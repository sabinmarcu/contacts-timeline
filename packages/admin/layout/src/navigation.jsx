import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="default">
        Awesome Stuff
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navigation;
