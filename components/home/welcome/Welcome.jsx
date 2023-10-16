import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contractor'];

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState(JOB_TYPES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const onJobSelected = (item) => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  };

  const onSearch = () => {};

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Josue</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={onSearch}
        >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
            alt='Search'
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={JOB_TYPES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => onJobSelected(item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
