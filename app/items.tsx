import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { app } from "../firebase/firebaseconfig"; // ✅ make sure app is exported in firebaseconfig

const db = getFirestore(app); // initialize Firestore

export default function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // clear after adding
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!itemName.trim() || !itemDescription.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "items"), {
        name: itemName,
        description: itemDescription,
        tags: tags,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Item uploaded to Firebase!");
      setItemName("");
      setItemDescription("");
      setTags([]);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />

      <Text style={styles.label}>Item Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter item description"
        value={itemDescription}
        onChangeText={setItemDescription}
        multiline
      />

      <Text style={styles.label}>Item Tags</Text>
      <View style={styles.tagInputContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter a tag"
          value={tagInput}
          onChangeText={setTagInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tags}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tagItem}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => removeTag(index)}>
              <Text style={styles.removeTag}> ❌ </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  tagInputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 5,
  },
  tagText: {
    flex: 1,
    color: "black",
  },
  removeTag: {
    color: "red",
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
