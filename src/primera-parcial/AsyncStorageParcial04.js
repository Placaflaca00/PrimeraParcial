import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Text } from '@rneui/themed';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [materia, setMateria] = useState('');
  const [calificaciones, setCalificaciones] = useState('');
  const [dataList, setDataList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const parsedItems = items.map(([id, value]) => {
        try {
          const parsedValue = JSON.parse(value);
          if (typeof parsedValue === 'object') {
            return { id, value: parsedValue };
          }
        } catch (error) {
          console.error('Error al parsear los datos: ', error);
        }
        return { id, value };  // Devuelve el valor original si no es JSON
      });
      setDataList(parsedItems);
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  };

  const guardar = async () => {
    try {
      if (codigo && materia && calificaciones) {
        const item = { materia, calificaciones };
        await AsyncStorage.setItem(codigo, JSON.stringify(item)); // Guardar como JSON
        setCodigo('');
        setMateria('');
        setCalificaciones('');
        listar();
        Alert.alert('Datos guardados');
        setIsEditMode(false); // Al guardar, salir del modo de edición
      } else {
        Alert.alert('Todos los campos son obligatorios');
      }
    } catch (error) {
      Alert.alert('Error al guardar los datos');
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      listar();
      Alert.alert('Datos eliminados');
    } catch (error) {
      Alert.alert('Error al eliminar los datos');
      console.error(error);
    }
  };

  const editar = (item) => {
    setCodigo(item.id);
    setMateria(item.value.materia);
    setCalificaciones(item.value.calificaciones);
    setIsEditMode(true); // Cambiar a modo edición
  };

  const cancelarEdicion = () => {
    setCodigo('');
    setMateria('');
    setCalificaciones('');
    setIsEditMode(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        editable={!isEditMode} // No permitir cambiar el código en modo edición
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Calificaciones"
        value={calificaciones}
        onChangeText={setCalificaciones}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      {isEditMode ? (
        <>
          <Button title="Actualizar" onPress={guardar} />
          <Button title="Cancelar" onPress={cancelarEdicion} />
        </>
      ) : (
        <Button title="Guardar" onPress={guardar} />
      )}

      <FlatList
        data={dataList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              {item.value && typeof item.value === 'object' ? (
                <>
                  <ListItem.Title>{item.value.materia}</ListItem.Title>
                  <ListItem.Subtitle>{item.value.calificaciones}</ListItem.Subtitle>
                </>
              ) : (
                <ListItem.Title>{item.value}</ListItem.Title>
              )}
            </ListItem.Content>
            <Button title="Editar" onPress={() => editar(item)} />
            <Button title="Eliminar" onPress={() => eliminar(item.id)} />
          </ListItem>
        )}
      />
    </View>
  );
};

export default AsyncStorageParcial04;
