import { StatusBar } from 'expo-status-bar';
//En este apartado se encuentra declarada el StyleSheet, es una funcion basica que proviene de React Native,
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from "react";


const Texto = ({style}) =>{
    const [contenido, setcontenido] = useState('Hola Mundo');
    const actualizatexto = () => {setcontenido('State Modificado')}
    return(
      <Text style={[styles.text, style]} onPress={actualizatexto} >{contenido} </Text>
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
            <Texto style={styles.verde}> </Texto>
            <Texto style={styles.amarillo}> </Texto>
            <Texto style={styles.blue}></Texto>

      <Button title={contenidoButon} onPress={actualizacontButton}> </Button>

    </View>
  );
}

//¿Por que existe?

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
      color:'black',
      fontSize: 27,
      width:100,
      height:100

  },

    verde:{backgroundColor:'green', },
    amarillo:{backgroundColor:'yellow', },
    blue:{backgroundColor:'blue', }


});
