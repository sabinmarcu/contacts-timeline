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

export const makeContact = (withId: boolean = false): Contact => ({
  name: `${name.firstName()} ${name.lastName()}`,
  username: internet.userName(),
  phone: phone.phoneNumber(),
  avatar: image.avatar(),
  cover: image.animals(),
  ...(withId ? { id: `${parseInt(Math.random() * 100, 10)}` } : {}),
});

export const makeMessage = (withId: boolean = false): Message => ({
  text: lorem.text(),
  date: (
    Math.random() >= 0.5
      ? date.past
      : date.future
  )(),
  ...(withId ? { id: `${parseInt(Math.random() * 100, 10)}` } : {}),
});
