import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Pantalla Principal</Text>

      <Button
        title="Ir a Props02"
        onPress={() => navigation.navigate('Props02', { nombre: 'Texto', estado: false })}
      />

      <Button
        title="Ir a Axios03"
        onPress={() => navigation.navigate('Axios03')}
      />

      <Button
        title="Ir a AsyncStorage04"
        onPress={() => navigation.navigate('AsyncStorage04')}
      />
    </View>
  );
};

export default Componente01;
