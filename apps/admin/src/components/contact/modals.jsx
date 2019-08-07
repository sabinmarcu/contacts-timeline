// @flow

import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  DialogActions,
  Button,
} from '@material-ui/core';
import {
  type Contact,
} from '@ct/prisma';

export const AlertDialog = ({
  contact: {
    avatar,
    name,
    username,
    phone,
  },
  open,
  onClose,
  onConfirm,
}: {
  contact: Contact,
  open: Function,
  onClose: Function,
  onConfirm: Function,
}) => (
  <Dialog {...{ open, onClose }}>
    <DialogTitle>Are you sure you want to remove this contact?</DialogTitle>
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={`@${username} | #${phone}`}
        />
      </ListItem>
    </List>
    <DialogActions>
      <Button onClick={onConfirm} color="primary">Yes</Button>
      <Button onClick={onClose} color="secondary">Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog;
