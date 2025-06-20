import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';

const App = () => {
  const [activo, setActivo] = useState(false);
  const cambiarSwitch = () => { setActivo(previousState => !previousState) }

  return (
      <View style={styles.container}>
        <Text style={styles.label}>Activar Características</Text>

        <Switch
            onValueChange={cambiarSwitch}
            value={activo}
        />

        <Text style={styles.statusText}>Estado actual: {activo ? 'Activo' : 'Desactivado'}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});

export default App;

//Codigo para el boton
/*
import { StyleSheet, Text, View, Alert, Platform, Button } from 'react-native';

export default function App() {
  const showAlert = (message) => {
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Alert', message);
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Buttons Test</Text>

        <View style={styles.section}>
          <Text style={styles.description}>Botón Básico</Text>
          <Button title="Presióname" onPress={() => showAlert('Botón presionado!')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.description}>Botón de color</Text>
          <Button title="Botón de color" color="#f194ff" onPress={() => showAlert('Botón de color presionado!')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.description}>Botón Deshabilitado</Text>
          <Button title="Botón Deshabilitado" disabled onPress={() => showAlert('No funciona :(')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.description}>Two Buttons:</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button title="Izquierda"
                      onPress={() => showAlert('Botón izquierdo presionado!')} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Derecha"
                      onPress={() => showAlert('Botón derecho presionado!')} />
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 10,
  },
}); */