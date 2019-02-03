import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  id = 3 // setting the 3 because already have 0-2

  state = {
    input: '',
    todos: [
      { id: 0, text: '리액트 소개', checked: false },
      { id: 1, text: 'JSX 사용해보기', checked: true },
      { id: 2, text: '라이프사이클 이해하기', checked: false },
    ],
    color: '#343a40',
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value, // input의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input: '', // input 비우고
      // concat을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color,
      })
    });
  }

  handleKeyPress = (e) => {
    // if the pressed key is Enter, call handleCreate
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id를 가지고 몇 번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    this.setState({
      todos: [
        ...todos.slice(0, index),
        {
          ...selected,
          checked: !selected.checked
        },
        ...todos.slice(index + 1, todos.length)
      ],
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    });
  }

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor,
    } = this;

    return (
      <TodoListTemplate 
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        } 
        palette={
          <Palette 
            colors={colors} 
            selected={color} 
            onSelect={handleSelectColor}
          />
        }
      >
        <TodoItemList 
          todos={todos} 
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
