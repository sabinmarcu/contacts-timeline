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

type UseTodoListReturnType = {
  displayTodos: number[],
  progress: string,
  createTodo: string => void,
  showDone: boolean,
  toggleShowDone: () => void,
};
export const useTodoList = (): UseTodoListReturnType => {

  // Context State (Todos)
  const { todos, setTodos } = useContext(TodoContext);

  // List State
  const [showDone, setShowDone]: [boolean, Function] = useState(true);
  const toggleShowDone = useCallback(
    () => setShowDone(show => !show),
    [setShowDone],
  );

  // Derived Data (used for creating a new todo)
  const lastTodoId = useMemo(
    () => Number(
      Object.keys(todos).sort((
        idA,
        idB,
      ) => Math.sign(Number(idB) - Number(idA)))[0]
    ) + 1,
    [todos],
  );

  // Derived Data (used for rendering purposes)
  const todosList: TodoType[] = useMemo(
    () => Object.keys(todos).map((key: string): TodoType => todos[Number(key)]),
    [todos],
  );
  const activeTodos: TodoType[] = useMemo(
    () => todosList.filter(({ done }) => !done),
    [todosList],
  );
  const displayTodos: number[] = useMemo(
    () => (showDone ? todosList : activeTodos).map(({ id }) => id),
    [activeTodos, todosList, showDone],
  );
  const progress: string = useMemo(
    () => `${todosList.length - activeTodos.length}/${todosList.length}`,
    [todosList, activeTodos],
  );

  // Pretty Print
  useDebugValue(progress);

  // Handlers
  const createTodo: string => void = useCallback(
    (title: string) => {
      setTodos(todos => ({
        ...todos,
        [lastTodoId]: { 
          title, 
          done: false, 
          id: lastTodoId, 
        },
      }));
    },
    [setTodos, todos, lastTodoId],
  );

  return {
    progress,
    createTodo,
    displayTodos,
    showDone,
    toggleShowDone,
  };
}

export default useTodoList;