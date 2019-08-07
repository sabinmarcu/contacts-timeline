// @flow

import React, {
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardHeader,
  Avatar,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  TextField,
  ListItemSecondaryAction,
  Checkbox,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Clear as DeleteIcon,
} from '@material-ui/icons';

import { 
  TodoProvider,
} from '../hooks/useTodos';
import useTodoList from '../hooks/useTodoList';
import useTodoItem from '../hooks/useTodoItem';

const TodoItem = ({ 
  id,
}: { 
  id: number,
}) => { 
  const { 
    todo: { title, done }, 
    toggleTodo,
    updateTodo,
    deleteTodo,
  } = useTodoItem(id);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = useCallback(
    () => setIsEditing(editing => !editing),
    [setIsEditing],
  );
  const updateTitleHandler = useCallback(
    ({ target: { value }}) => updateTodo(value),
    [updateTodo],
  );
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton onClick={deleteTodo}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={toggleEditing}>
          {isEditing ? <CheckIcon /> : <EditIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemText>
      {isEditing 
        ? (
          <TextField
            placeholder="Todo Text"
            fullWidth
            value={title}
            onChange={updateTitleHandler}
          />
        ) : (
          <Typography>
            {title}
          </Typography>
        ) 
      }
      </ListItemText>
      <ListItemSecondaryAction>
        <Checkbox 
          edge="end"
          onChange={toggleTodo}
          checked={done}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const TodoList = () => {
  const {
    displayTodos,
    progress,
    showDone,
    toggleShowDone,
    createTodo,
  } = useTodoList();
  const [newTodo, setNewTodo] = useState('');
  const newTodoUpdateHandler = useCallback(
    ({ target: { value }}) => setNewTodo(value),
    [setNewTodo],
  );
  const isNewTodoValid = useMemo(
    () => newTodo.length > 0,
    [newTodo],
  );
  const createNewTodoHandler = useCallback(
    () => {
      createTodo(newTodo);
      setNewTodo('');
    },
    [newTodo, createTodo, setNewTodo],
  );
  return (
    <Card>
      <CardHeader
        title={"Todos"}
        avatar={<Avatar>{progress}</Avatar>}
        subheader={showDone ? 'Hide done' : 'Show all'}
        action={
          <Switch 
            checked={showDone}
            onChange={toggleShowDone}
          />
        }
      />
      <CardContent>
        <List>
          {displayTodos.map((todo) => (
            <TodoItem
              key={todo}
              id={todo}
            />
          ))}
        </List>
      </CardContent>
      <CardActions>
        <TextField
          placeholder="New Todo Text"
          fullWidth
          value={newTodo}
          onChange={newTodoUpdateHandler}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!isNewTodoValid}
          onClick={createNewTodoHandler}
        >
         Add
        </Button>
      </CardActions>
    </Card>
  );
}

export const Todos = () => (
  <TodoProvider>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Todo List Example (with hooks)
        </Typography>
      </Toolbar>
    </AppBar>
    <TodoList />
  </TodoProvider>
);

export default Todos;