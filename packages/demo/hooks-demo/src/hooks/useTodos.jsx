// @flow

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useDebugValue,
  createContext,
  type Node,
  type Element,
} from 'react';

import { 
  type Serializer,
  useLocalstorage,
} from './useLocalstorage'

export type TodoType = {
  title: string,
  done: boolean,
  id: number,
};

export type TodoMapType = {
  [number]: TodoType,
}

export type TodoContextType = {
  todos: TodoMapType,
  setTodos: Function,
}

const TodoSerializer: Serializer<TodoMapType> = {
  deserialize: (input: string): TodoMapType => {
    try {
      const todos: TodoType[] = JSON.parse(input)

      return todos.reduce(
        (prev, todo) => {
          prev[todo.id] = todo;
          return prev;
        },
        {}
      );
    } catch (e) {
      return {};
    }
  },
  serialize: (input: TodoMapType): string => {
    return JSON.stringify(Object.values(input));
  }
}

const dummyData = [
  { title: 'Write the code', done: true, id: 0 },
  { title: 'Complicate the code', done: true, id: 1 },
  { title: 'Wrap up the Presentation', done: false, id: 2 },
  { title: 'Chug a Time to clear the system', done: false, id: 3 },
]

const storageKey = 'store:todos';

export const TodoContext = createContext<TodoContextType>({});

export const useTodoProvider = (): TodoContextType => {

  // Root state
  const [todos, setTodos] = useLocalstorage(
    storageKey,
    TodoSerializer,
    JSON.stringify(dummyData),
  );
  useDebugValue(`${Object.keys(todos).length} Todos`);

  return {
    todos,
    setTodos,
  };
}

export const TodoProvider = ({
  children
}: {
  children: Node
}): Element<typeof TodoContext.Provider> => {
  const context = useTodoProvider();
  return (
    <TodoContext.Provider value={context}>
      {children}
    </TodoContext.Provider>
  );
}
