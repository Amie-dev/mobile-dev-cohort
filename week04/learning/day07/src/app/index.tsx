import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

export default function Index() {
  const [output, setOutput] = useState("Loading...");
  const [data, setData] = useState<any>();

  async function callApi(label: string, url: string, options?: RequestInit) {
    setOutput(`${label}\n\nLoading...`);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      console.log(json);
      setOutput(`${label}\n\n${JSON.stringify(json, null, 2)}`);
    } catch (error) {
      setOutput(`${label}\n\n${String(error)}`);
    }
  }

  useEffect(() => {
   
     
     
    // Optionally call your API here:
    callApi("GET /api/users", "/api/users");
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Button
        title="GET /api/users"
        onPress={() => callApi("GET /api/users", "/api/users")}
      />
      <Button
        title="POST /api/users"
        onPress={() =>
          callApi("POST /api/users", "/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "Test User",
              email: "test@example2.com",
            }),
          })
        }
      />
      <Button
        title="GET /api/users/1"
        onPress={() => callApi("GET /api/users/1", "/api/users/1")}
      />
      <ScrollView style={styles.output}>
        <Text>{output}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingTop: 48,
    gap: 8,
  },
  output: {
    flex: 1,
    marginTop: 16,
  },
});
