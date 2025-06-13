import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from "react";


const Texto = () =>{
    const [contenido, setcontenido] = useState('Hola Mundo');
    const actualizatexto = () => {setcontenido('State Modificado')}
    return(
      <Text onPress={actualizatexto} >{contenido} </Text>
  )
}

/*
const Button = () =>{
        const [contenidoButton, setContenidoButton] = useState('Presioname');
        const cambairButton = () =>{setContenidoButton('¡Me presionaste!')}
        return(
            <Text onPress={cambairButton} >{contenidoButton}</Text>
        )
    } La funcion funciona si no esta declarada en las importaciones, pero se debe agregar el diseño aparte ya que no entra por default*/

//2. Main
export default function App() {
    //Caso contrario se debe declarar aqui ya que el boton esta declaro en las importaciones asi que se debe modificar desde aqui
    const [contenidoButon, setContenidoButon] = useState('Presioname');
    const actualizacontButton = () => {setContenidoButon('¡Me presionaste!')}

    return (


    <View style={styles.container}>
        <StatusBar style="auto" />
            <Texto> </Texto>
            <Texto> </Texto>
            <Texto></Texto>

      <Button title={contenidoButon} onPress={actualizacontButton}> </Button>

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
