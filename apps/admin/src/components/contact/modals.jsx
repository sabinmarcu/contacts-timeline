// @flow

import React, {
  useMemo,
} from 'react';
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
  DialogContent,
  DialogContentText,
  CircularProgress,
  useTheme,
} from '@material-ui/core';
import {
  Check as SuccessIcon,
  Clear as ErrorIcon,
} from '@material-ui/icons';
import {
  type Contact,
} from '@ct/prisma';

const styles = {
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    margin: 10,
  },
  success: ({ palette: { primary: { main } } }) => ({
    color: main,
  }),
  error: ({ palette: { secondary: { main } } }) => ({
    color: main,
  }),
};

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
  open: boolean,
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

export const ProgressDialog = ({ open }: { open: boolean }) => (
  <Dialog open={open}>
    <DialogTitle>Removing contact...</DialogTitle>
    <DialogContent style={styles.content}>
      <CircularProgress style={styles.icon} />
    </DialogContent>
    <DialogActions />
  </Dialog>
);

export const StatusDialog = ({
  open,
  success,
  error,
}: {
  open: boolean,
  success: boolean,
  error?: string,
}) => {
  const theme = useTheme();
  const style = useMemo(
    () => styles[success ? 'success' : 'error'](theme),
    [theme, success],
  );
  return (
    <Dialog open={open}>
      <DialogTitle>{success ? 'Success!' : 'An error has occurred'}</DialogTitle>
      <DialogContent style={styles.content}>
        {success
          ? <SuccessIcon style={{ ...styles.icon, ...style }} />
          : <ErrorIcon style={{ ...styles.icon, ...style }} />
        }
        <DialogContentText>
          {success ? 'The contact has been removed!' : error}
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default AlertDialog;
