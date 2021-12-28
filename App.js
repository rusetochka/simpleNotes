//colors: black - #1b1b1b, white - #fdfdfd, warm white - #fffef7, gold - #c2ad65
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AddRecordForm } from './AddRecordForm';
import { Record } from './Record';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Header } from '@react-navigation/elements';


const Tab =createBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  dark: true, 
  colors: {
    ...DefaultTheme.colors,
    primary: '#fdfdfd',
    background: '#1b1b1b',
    card: '#1b1b1b',
    text: '#fdfdfd',
    border: '#c2ad65'
  }
}
const DailyLogScreen = (props) => {
  return (
    <ScrollView>
        <Text style={styles.dailyLogContainer}>
        {props.records.map((record) => (
        <Record removeRecord={props.removeRecord} key={record.id} record={record} changeRecord={props.changeRecord}/>
      ))}
        </Text>
    </ScrollView>
)
};


export default function App() {
  const [records, setRecords] = useState([]);

  const addRecord = (record)=>{
    setRecords(records => [record,...records])
  };

  const changeRecord = (recordId, newValues) => {
    let recordToChange = records.find(record => record.id === recordId);
    const newRecord = {
      id: recordToChange.id,
      text: recordToChange.text,
      type: recordToChange.type,
      completed: newValues.completed ? newValues.completed : recordToChange.completed,
      migrated: newValues.migrated ? newValues.migrated : recordToChange.migrated,
      sheduled: newValues.sheduled ? newValues.sheduled : recordToChange.sheduled,
      collection: newValues.collection ? newValues.collection : recordToChange.collection,
      deadline: newValues.deadline ? newValues.deadline : recordToChange.deadline
    }
    
    removeRecord(recordId);
    addRecord(newRecord);
  };

  const removeRecord = (recordIdToRemove)=>{
        setRecords(records=>records.filter(record => record.id!==recordIdToRemove))
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Add') {
              iconName = focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline';
            } else if (route.name === 'Daily Log') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#c2ad65',
          tabBarInactiveTintColor: 'gray',
          headerTitle: () => {
            return <Header title='Bullet Journal' headerTitleStyle={{backgroundColor: '#1b1b1b', color: '#c2ad65', textTransform: 'uppercase'}} headerTitleContainerStyle={{backgroundColor: '#1b1b1b'}}/>
          }
        })}>
        <Tab.Screen name="Add" children={()=><AddRecordForm addRecord={addRecord} />} options={{tabBarStyle: {backgroundColor: '#1b1b1b', borderColor: '#c2ad65', borderWidth: 0.5} }}/>
        <Tab.Screen name="Daily Log" children={()=><DailyLogScreen 
                                                      removeRecord={removeRecord} 
                                                      records={records} 
                                                      changeRecord={changeRecord}/>} options={{tabBarStyle: {backgroundColor: '#1b1b1b'}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  dailyLogContainer: {
    marginHorizontal: '2%',
    marginVertical: '5%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around'
  },
});
