import {
  name,
  internet,
  phone,
  lorem,
  image,
  date,
} from 'faker';

export const makeContact = () => ({
  name: `${name.firstName()} ${name.lastName()}`,
  username: internet.userName(),
  phone: phone.phoneNumber(),
  avatar: image.avatar(),
  cover: image.animals(),
});

export const makeMessage = () => ({
  text: lorem.text(),
  date: new Date((
    Math.random() >= 0.5
      ? date.past
      : date.future
  )()),
});
