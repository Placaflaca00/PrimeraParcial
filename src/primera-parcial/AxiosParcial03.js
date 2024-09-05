import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import Axios from 'axios';
import { ListItem, SearchBar } from '@rneui/themed';

const AxiosParcial03 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
    setFilteredData(
      data.filter(item => item.email.toLowerCase().includes(search.toLowerCase()))
    );
  };

  return (
    <View>
      <SearchBar
        placeholder="Buscar por correo..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.email}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
};

export default AxiosParcial03;
