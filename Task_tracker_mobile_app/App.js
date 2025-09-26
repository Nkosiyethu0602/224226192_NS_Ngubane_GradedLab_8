import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () =>{
    if(taskText.trim() === "")return;

    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, done: !task.done} : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  };

  const RenderItem = ({ item }) => (
  <View style={styles.taskItem}>
    <TouchableOpacity
      style={styles.checkbox}
      onPress={() => toggleTask(item.id)}
    >
      <Text style={{ fontSize: 18 }}>
        {item.done ? "Completed" : "Not Completed"}
      </Text>
    </TouchableOpacity>

    <Text
      style={[styles.taskText, item.done && styles.taskTextDone]}
      onPress={() => toggleTask(item.id)}
    >
      {item.text}
    </Text>

    <TouchableOpacity onPress={() => deleteTask(item.id)}>
      <Text style={styles.deleteButton}>Delete</Text>
    </TouchableOpacity>
  </View>
);

  return (
<View style={styles.container}>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
     
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={RenderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    fontSize: 18,
    marginLeft: 10,
  },
});