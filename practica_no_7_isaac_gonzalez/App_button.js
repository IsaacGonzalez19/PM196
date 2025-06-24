import React, {useState} from 'react';
import {
    Button,
    View,
    TextInput,
    Alert,
    StyleSheet,
    SafeAreaView,
    Platform, Text,
} from 'react-native';

const App = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");

    const mostrarAlerta = () => {
        if (!nombre || !email || !password || !telefono) {
            if (Platform.OS === 'web') {
                window.alert("Todos los campos son obligatorios");
            } else {
                Alert.alert("Error", "Por favor, Todos los campos son obligatorios"
                    [{text: 'OK'}], [{text: 'OK'}]);
            }
        } else {
            if (Platform.OS === 'web') {
                window.alert(`registro exitoso \n Nombre: ${nombre} \n Email: ${email} \n Contraseña: ${password} \n Telefono: ${telefono}`);
            } else {
                Alert.alert(
                    "Registro exitoso",
                    `Nombre: ${nombre} \n Email: ${email}`,
                    [{text: 'OK', onPress: () => limpiarFormulario()}]
                )
            }
        }
    };
    const limpiarFormulario = () => {
            setNombre("");
            setEmail("");
            setPassword("");
            setTelefono("");
    };



    return (
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

                <TextInput
                    style={styles.input}
                    placeholder="contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                    keyboardType="phone-pad"
                />


                <Button title="Registrar" onPress={mostrarAlerta} />

            </View>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formulario:{
        backgroundColor: 'f5f5f5',
        padding: 20,
        borderRadius: 10
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white'
    }

})

export default App;