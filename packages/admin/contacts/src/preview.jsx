// @flow
/* eslint-disable react/require-default-props */

import React, { forwardRef } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  Button,
} from '@material-ui/core';

import { type Contact } from '@ct/prisma';

import styles from './style';

export type Props = {
  contact: Contact,
  coverSize?: {
    +width?: number,
    +height: number,
  },
  onEdit?: Function,
  onRemove?: Function,
};

export const Preview = forwardRef(({
  contact: {
    name,
    avatar,
    phone,
    username,
    cover,
  },
  coverSize = {
    height: 150,
  },
  onEdit,
  onRemove,
}: Props, ref: Ref) => (
  <Card className={styles.card} ref={ref}>
    <CardHeader
      title={name}
      subheader={`@${username} | #${phone}`}
      avatar={<Avatar src={avatar} />}
    />
    <CardMedia
      image={cover}
      style={coverSize}
    />
    {(onEdit || onRemove) && (
      <CardActions>
        {onEdit && (
        <Button
          variant="contained"
          color="primary"
          onClick={onEdit}
        >
            Edit
        </Button>
        )}
        {onRemove
          && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onRemove}
          >
            Remove
          </Button>
          )}
      </CardActions>
    )}
  </Card>
));

export default Preview;
