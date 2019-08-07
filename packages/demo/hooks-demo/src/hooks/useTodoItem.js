// @flow

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useDebugValue,
  createContext,
  type Node,
  type Element,
} from 'react';

import {
  TodoContext,
  type TodoType,
} from './useTodos';

type TodoItemReturnType = {
  todo: TodoType,
  deleteTodo: () => void,
  updateTodo: string => void,
  toggleTodo: () => void,
};
export const useTodoItem = (id: number): TodoItemReturnType => {

  // Context State (Todos)
  const { todos, setTodos } = useContext(TodoContext);

  // Derived State
  const todo = useMemo(
    () => todos[id],
    [todos, id],
  );

  // Handlers
  const deleteTodo: () => void = useCallback(
    () => {
      setTodos(todos => {
        const newTodos = {...todos};
        delete(newTodos[id]);
        return newTodos;
      });
    },
    [setTodos, id],
  );
  const updateTodo: string => void = useCallback(
    (title: string) => {
      setTodos(todos => ({ 
        ...todos, 
        [id]: {
          ...todos[id],
          title,
        }
      }));
    },
    [setTodos, id],
  );
  const toggleTodo: () => void = useCallback(
    () => {
      setTodos(todos => ({
        ...todos,
        [id]: {
          ...todos[id],
          done: !todos[id].done,
        }
      }));
    },
    [setTodos, id],
  );

  // Export
  return {
    todo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}

export default useTodoItem;