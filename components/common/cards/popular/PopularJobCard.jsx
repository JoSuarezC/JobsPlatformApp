import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './popularjobcard.style';
import { checkImageURL } from '../../../../utils';
import { DUMMY_IMG_URI } from '../../../../constants';

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const imageUrl = checkImageURL(item.employer_logo)
    ? item.employer_logo
    : DUMMY_IMG_URI;

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode='contain'
          style={styles.logoImage}
          alt={item.employer_name}
        />
      </TouchableOpacity>
      <Text
        style={styles.companyName}
        numberOfLines={1}
      >
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={styles.jobName(selectedJob, item)}
          numberOfLines={1}
        >
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
