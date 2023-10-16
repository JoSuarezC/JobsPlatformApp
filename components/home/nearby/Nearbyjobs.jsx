import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  console.log('data', data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size='large'
            color={COLORS.primary}
          />
        ) : error ? (
          <Text>Something went wrong. Please try again later</Text>
        ) : (
          data?.map((item) => (
            <NearbyJobCard
              item={item}
              key={`nearby-${item?.job_id ?? ''}`}
              handleNavigate={() => router.push(`/job-details/${item?.job_id ?? ''}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;