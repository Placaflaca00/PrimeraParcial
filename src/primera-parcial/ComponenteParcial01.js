import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, ListItem } from '@rneui/themed';

const ComponenteParcial01 = () => {
  const [nombre, setNombre] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen Primera Parcial</Text>
      
      <Card>
        <Card.Title>Logo de la Aplicación</Card.Title>
        <Card.Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKy3ZNk3i09ViZHPH_HI0NiWYFaXLscLh7Q&s'}} 
        style={styles.image}/>
      </Card>

      <TextInput
        style={styles.input}
        placeholder="Ingresar nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.subtitle}>Lista de opciones:</Text>
      
      <ListItem bottomDivider onPress={() => navigation.navigate('PropsParcial02', { nombre, estado: false })}>
        <ListItem.Content>
          <ListItem.Title>PropsParcial02</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider onPress={() => navigation.navigate('AxiosParcial03')}>
        <ListItem.Content>
          <ListItem.Title>AxiosParcial03</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider onPress={() => navigation.navigate('AsyncStorageParcial04')}>
        <ListItem.Content>
          <ListItem.Title>AsyncStorageParcial04</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  image: {
    width: 250, // Establecer el ancho de la imagen
    height: 250, // Establecer la altura de la imagen
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
    alignSelf: 'center', // Centrar la imagen dentro del Card
  }
});

export default ComponenteParcial01;
