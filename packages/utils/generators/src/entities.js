// @flow

import type {
  Contact,
  Message,
} from '@ct/prisma';

import {
  name,
  internet,
  phone,
  lorem,
  image,
  date,
} from 'faker';

export const makeContact = (): Contact => ({
  id: lorem.slug(),
  name: `${name.firstName()} ${name.lastName()}`,
  username: internet.userName(),
  phone: phone.phoneNumber(),
  avatar: image.avatar(),
  cover: image.animals(),
});

export const makeMessage = (): Message => ({
  id: lorem.slug(),
  text: lorem.text(),
  date: (
    Math.random() >= 0.5
      ? date.past
      : date.future
  )(),
});
