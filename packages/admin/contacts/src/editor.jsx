// @flow
/* eslint-disable arrow-parens,camelcase */

import React, {
  type Node,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  TextField,
  Input,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { type Contact, type ID_Output } from '@ct/prisma';

type FieldErrorType = string | null;
type FieldSetterType = SyntheticInputEvent<HTMLInputElement> => void;
type ValidatorType<T> = T => FieldErrorType;
type ValidatorsType<T, K> = { [key: $Keys<T>]: ?ValidatorType<K> };

type UseFieldPropType<T> = {
  initialValue: T,
  validator: ?ValidatorType<T>,
  label?: string,
  deserialize?: string => T,
  serialize?: T => string,
};
type UseFieldReturnType<T> = {
  value: T,
  isValid: boolean,
  isDirty: boolean,
  error: FieldErrorType,
  setValue: FieldSetterType,
};

const useField = <T>({
  initialValue,
  validator,
  label = '',
  deserialize = it => (it: any),
  serialize = (it: any) => `${it}`,
}: UseFieldPropType<T>): UseFieldReturnType<T> => {
  const [inputValue, setInputValue] = useState<T>(initialValue);
  const [value, setValue] = useState<T>(initialValue);
  const [stringValue, setStringValue] = useState<string>(serialize(initialValue));
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(validator ? !!validator(initialValue) : false);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(
    () => {
      if (serialize(inputValue) !== initialValue && !isDirty) {
        setIsDirty(true);
      }
      const err = validator ? validator(inputValue) : null;
      setIsValid(!err);
      setError(err);
      if (!err) {
        setValue(inputValue);
        setStringValue(serialize(inputValue));
      }
    },
    [inputValue, validator],
  );
  const handler = useCallback(
    (
      { target: { value: inputFieldValue } }: SyntheticInputEvent<HTMLInputElement>,
    ) => setInputValue(() => deserialize(inputFieldValue)),
    [setValue],
  );
  const valueObject = useMemo(
    () => ({
      inputValue,
      value,
      stringValue,
      isValid,
      isDirty,
      error,
      setValue: handler,
      label,
    }),
    [
      inputValue,
      value,
      isValid,
      stringValue,
      isDirty,
      error,
      setValue,
      handler,
      label,
    ],
  );
  return valueObject;
};

type UseFormPropType<T: Object> = {
  initialValues: T,
};

type UseFormReturnType<T> = $ObjMap<T, <V>(V) => UseFieldReturnType<V>>;

type EditContact = $Diff<Contact, {id: ID_Output}>;

const urlValidator: ValidatorType<string> = value => (!/^(https?:)?\/\//.test(value)
  ? 'Must enter a valid URL'
  : null
);

const validatorsSet: ValidatorsType<EditContact, string> = {
  name: null,
  username: null,
  avatar: urlValidator,
  cover: urlValidator,
  phone: value => (!/^\+?[0-9 ()]+$/.test(value) ? 'Must enter a valid phone number' : null),
};

const useForm = ({
  initialValues,
}: UseFormPropType<EditContact>): UseFormReturnType<EditContact> => {
  const fields = {
    name: useField<string>({
      initialValue: initialValues.name || '',
      validator: validatorsSet.name,
      label: 'Name',
    }),
    username: useField<string>({
      initialValue: initialValues.username,
      validator: validatorsSet.username,
      label: 'Username',
    }),
    avatar: useField<string>({
      initialValue: initialValues.avatar || '',
      validator: validatorsSet.avatar,
      label: 'Avatar',
    }),
    cover: useField<string>({
      initialValue: initialValues.cover || '',
      validator: validatorsSet.cover,
      label: 'Cover',
    }),
    phone: useField<string>({
      initialValue: initialValues.phone,
      validator: validatorsSet.phone,
      label: 'Phone',
    }),
  };

  const isValid = useMemo(
    () => [fields.name, fields.username, fields.avatar, fields.cover, fields.phone]
      .reduce((prev, field) => prev && field.isValid, true),
    [fields.name, fields.username, fields.avatar, fields.cover, fields.phone],
  );

  const isDirty = useMemo(
    () => [fields.name, fields.username, fields.avatar, fields.cover, fields.phone]
      .reduce((prev, field) => prev && field.isDirty, true),
    [fields.name, fields.username, fields.avatar, fields.cover, fields.phone],
  );

  const returnObject = useMemo(
    () => ({
      ...fields,
      isValid,
      isDirty,
    }),
    [
      fields.name,
      fields.username,
      fields.avatar,
      fields.cover,
      fields.phone,
      isValid,
      isDirty,
    ],
  );
  return returnObject;
};

export type Props = {
  contact: Contact | EditContact,
  onUpdate?: Function,
};

export const Editor = ({ contact, onUpdate }: Props): Node => {
  const fields = useForm({
    initialValues: contact,
  });
  useEffect(
    () => onUpdate && onUpdate(Object.keys(validatorsSet).reduce((prev, key) => ({ ...prev, [key]: fields[key].value }), {})),
    [fields.name, fields.username, fields.phone, fields.avatar, fields.cover, onUpdate],
  );
  return (
    <Card>
      <CardHeader title={`${contact && contact.id ? 'Edit' : 'Create'} Contact`} />
      <CardContent>
        {Object.keys(validatorsSet).map(key => (
          <FormControl error={fields[key].isDirty && !fields[key].isValid} fullWidth>
            <InputLabel>Avatar: </InputLabel>
            <Input
              placeholder="Avatar"
              fullWidth
              value={fields[key].inputValue}
              onChange={fields[key].setValue}
            />
            {fields[key].isDirty && fields[key].error && <FormHelperText>{fields[key].error}</FormHelperText>}
          </FormControl>
        ))}
      </CardContent>
    </Card>
  );
};

export default Editor;