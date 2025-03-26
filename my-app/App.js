import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleDeleteTodo = (id) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = () => {
    // check if newTodo is empty before we make it?
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {todos.map((todo) => (
          <View style={styles.todoContainer} >
            <TouchableOpacity key={todo.id} onPress={() => handleToggleCompleted(todo.id)}>
              <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
            <Button
              onPress={() => handleDeleteTodo(todo.id)}
              title="Delete"
              color="#841584"
              accessibilityLabel="Delete todo item"
            />
          </View>
        ))}

        <View>
          <TextInput
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="useless placeholder"
          />
          <Button
            onPress={handleSubmit}
            title="Add Todo"
            color="#841584"
            accessibilityLabel="Submit a new Todo List item"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
});
