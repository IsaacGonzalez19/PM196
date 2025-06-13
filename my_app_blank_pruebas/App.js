import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const Texto = (props) =>{
    const {children} = props;
    return(
      <Text>{childre}</Text>
  )
}

//2. Main
export default function App() {
  return (


    <View style={styles.container}>
        <StatusBar style="auto" />
            <Texto contenido="Hola"> </Texto>
            <Texto contenido="mundo"> </Texto>
            <Texto contenido="React Native"></Texto>

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
