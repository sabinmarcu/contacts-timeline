import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="initial">
        Awesome Stuff
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navigation;
