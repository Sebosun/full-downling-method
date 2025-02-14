import { useState } from "react";
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [counter, setCounter] = useState<number>(0)
  const [text, setText] = useState<string>('')
  const onCount = () => {
    setCounter(prev => {
      console.log(prev)
      return prev + 1
    })
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={onCount}>
          <Text style={styles.buttonText}>
            {counter}
          </Text>
        </Pressable>
        <TextInput style={styles.button} value={text} onChangeText={setText} />
        <Text style={styles.input}>
          {text}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white'
  },
  buttonText: {
    textAlign: 'center',
    color: 'black'
  },
  button: {
    borderRadius: 5,
    marginTop: 20,
    minWidth: 80,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 'auto',
    padding: 10,
    color: 'black',
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: 'white'
  }
});
