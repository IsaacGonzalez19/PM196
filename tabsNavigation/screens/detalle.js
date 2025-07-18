import { View, Text, StyleSheet } from 'react-native';

export default function Detalle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de usuarios</Text>
            <Text style={styles.subtitle}>Usando navegación Stack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});