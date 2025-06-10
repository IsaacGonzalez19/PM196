import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const Texto = () =>{
  return(
      <Text>Hola Mundo react Native</Text>
  )
}


export default function App() {
  return (


    <View style={styles.container}>
      <Texto> </Texto>
      <StatusBar style="auto" />
      <Texto> </Texto>
      <Button title="Presioname"> </Button>
      <Texto> </Texto>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
