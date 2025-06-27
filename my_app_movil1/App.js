import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, ImageBackground, Alert,  TextInput, SafeAreaView, Switch } from 'react-native';


export default function App() {
  //Para Datos
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  //switch
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  //Cuando se usa para Movil este tiene que camabir a Alert.alert en vez de windows.alert Ya que Alert.alert funciona para IOS como Android
  const mostrarAlerta = () => {
    if (!nombre.trim() || !email.trim()) {
      Alert.alert("Error", "Por favor, todos los campos son obligatorios", [
        {text: 'OK'}
      ]);
      return;
    }

    if (!aceptaTerminos) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones para continuar", [
        {text: 'OK'}
      ]);
      return;
    }

    Alert.alert(
        "Registro exitoso",
        `Nombre: ${nombre}\nEmail: ${email}\nTérminos y condiciones: Aceptados`,
        [
          {text: 'OK', onPress: () => limpiarFormulario()}
        ]
    );
  };

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
  };


  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);

  if (loading) {
    return (
        <View style={styles.splash}>
          <Text style={styles.splashText}>Cargando...</Text>
          <ActivityIndicator size="large" color="#fffff"/>
        </View>
    );
  }return (
      <ImageBackground
          source={{url:'/Users/isaacgonzalez/Downloads/WhatsApp Image 2024-08-05 at 00.30.56.jpeg'}}
          style={styles.background}
          resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.formulario}>
            <Text style={styles.titulo}>Registro Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Acepto términos y condiciones</Text>
              <Switch
                  value={aceptaTerminos}
                  onValueChange={setAceptaTerminos}
                  trackColor={{ false: '#767577', true: '#ffffff' }}
                  thumbColor={aceptaTerminos ? '#51f54b' : '#f3f4f3'}
                  ios_backgroundColor="#3e3e3e"
              />
            </View>

            <Button title="Registrar" onPress={mostrarAlerta} />

          </View>
        </SafeAreaView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({

  splash: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    color:'white',
    fontSize: 24,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formulario:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    borderRadius: 20,
    alignSelf: 'center',
  },
  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input:{
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'white'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  switchLabel: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginRight: 15,
  }

});


