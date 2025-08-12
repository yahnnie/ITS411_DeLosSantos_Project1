import { useEffect, useState } from "react";
import {
    Button,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ToDoScreen() {
    const [userInput, setUserInput] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]); // ✅ Explicit type

    useEffect(() => {
        // Side effects can go here
    }, [userInput, tasks]);

    const addTask = () => {
        const trimmedTask = userInput.trim();
        if (trimmedTask !== '') {
            setTasks([...tasks, trimmedTask]);
            setUserInput('');
        }
    };

    const removeTask = (index: number) => { // ✅ Explicit parameter type
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const renderTask = ({ item, index }: ListRenderItemInfo<string>) => ( // ✅ Typed destructuring
        <View style={styles.taskItem}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity onPress={() => removeTask(index)}>
                <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter a task"
                value={userInput}
                onChangeText={setUserInput}
            />
            <Button title="Add Task etc" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderTask}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    listContent: {
        paddingTop: 10,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 5,
        marginBottom: 5,
    },
    text: {
        color: 'black',
        flex: 1,
    },
    delete: {
        color: 'red',
        fontSize: 16,
        marginLeft: 10,
    },
});