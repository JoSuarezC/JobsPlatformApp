import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';

const TABS = {
  About: 'About',
  Qualifications: 'Qualifications',
  Responsibilities: 'Responsibilities',
};
const DEFAULT_JOB_URL = 'https://careers.google.com/jobs.results';

const JobDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  });
  const tabList = Object.values(TABS);
  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {}, []);

  const currentJob = data[0];

  const displayTabContent = () => {
    switch (activeTab) {
      case TABS.Qualifications:
        return (
          <Specifics
            key={TABS.Qualifications}
            title={TABS.Qualifications}
            points={currentJob?.job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case TABS.About:
        return (
          <JobAbout
            key={TABS.About}
            info={currentJob?.job_description ?? 'No data provided'}
          />
        );
      case TABS.Responsibilities:
        return (
          <Specifics
            key={TABS.Responsibilities}
            title={TABS.Responsibilities}
            points={currentJob?.job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
              label='Back'
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.right}
              dimension='60%'
              handlePress={() => {}}
              label='Share'
            />
          ),
          headerTitle: '',
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {isLoading ? (
            <ActivityIndicator
              size='large'
              color={COLORS.primary}
            />
          ) : error ? (
            <Text>Error: Something went wront</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={currentJob.employer_logo}
                jobTitle={currentJob.job_title}
                companyName={currentJob.employer_name}
                location={currentJob.job_country}
              />
              <JobTabs
                tabs={tabList}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={currentJob?.job_google_link ?? DEFAULT_JOB_URL}/>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
