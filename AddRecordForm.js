import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { generateId } from './utilities';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

export function AddRecordForm(props) {
    const [text, setText] = useState('');
    const [type, setType] = useState('Task');
    const [completed, setCompleted] = useState(false); 
    const [migrated, setMigrated] = useState(false);
    const [collection, setCollection] = useState('Inbox');
    const [sheduled, setSheduled] = useState(false);
    const [deadline, setDeadline] = useState(new Date());



    const handleMigration = () => {
        migrated === false ? setMigrated(true) : setMigrated(false);
    };
    
    const handleCollectionChange = (collection) => {
        if (migrated) {
            setCollection(collection)
        }
    };

    const handleShedule = () => {
        sheduled === false ? setSheduled(true) : setSheduled(false);
    }
    const handleTextChange = (text)=>{
        setText(text);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
          if (text.length){
            const record = {
              id : generateId(),
              text: text,
              type: type,
              completed: completed,
              migrated: migrated,
              collection: collection,
              sheduled: sheduled,
              deadline: deadline,
              }
            props.addRecord(record);
            setText('');
            setCompleted(false);
            setMigrated(false);
            setCollection('Inbox');
            setSheduled(false);
            setDeadline(new Date());
          }
    };

    const handlePickerChange = (value, index) => {
        setType(value);
        setText('');
        setCompleted(false);
        setMigrated(false);
        setCollection('Inbox');
        setSheduled(false);
        setDeadline(new Date());
    };
    const handleDeadline = (event, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setDeadline(currentDate);
    }
    

    return(
        <View className="AddRecordForm" style={styles.form}>
           
            <View style={styles.elementContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={handlePickerChange}
                    style={styles.pickerType}
                    itemStyle={{color:'white', height: 50}}
                >
                    <Picker.Item label="Task" value="Task" />
                    <Picker.Item label="Event" value="Event" />
                    <Picker.Item label="Note" value="Note" />
                </Picker>

                {(type == 'Task' || type == 'Event') ? <View style={styles.markerContainer}>
                    <View style={styles.markers}>
                        <Text style={migrated ? styles.markerPressed : styles.marker} onPress={handleMigration}>&gt; collection</Text>
                        <Text style={sheduled ? styles.markerPressed : styles.marker} onPress={handleShedule}>&lt; shedule</Text>
                    </View>
                    <View style={styles.aditionalFieldsContainer}>{migrated ? <Picker 
                                                                                    selectedValue={collection}
                                                                                    onValueChange={handleCollectionChange}
                                                                                    style={styles.pickerCollection}
                                                                                    textColor='#fff'
                                                                                    itemStyle={{color: 'white', height: 44}}>
                                                                                    <Picker.Item label="Inbox" value="Inbox" />
                                                                                    <Picker.Item label="Books" value="Books" />
                                                                                    <Picker.Item label="Work" value="Work" />
                                                                                    <Picker.Item label="Video" value="Video" />
                                                                                    <Picker.Item label="Drawing" value="Drawing" />
                                                                                    <Picker.Item label="Child" value="Child" />
                                                                                    <Picker.Item label="Shopping" value="Shopping" />        
                                                                                </Picker> : null}
                    {sheduled ? <DateTimePicker
                        value={deadline}
                        placeholder="Select date"
                        mode='date'
                        display='default'
                        themeVariant='dark'
                        style={styles.dateTimePickerStyle}
                        textColor='white'
                        onChange={handleDeadline}
                    /> : null}</View>
                    </View> : null}
                </View>

            <TextInput
                type="text"
                aria-label="Type your text here"
                placeholder="Type your text here"
                value={text}
                style={styles.textInput}
                onChangeText={handleTextChange}
                placeholderTextColor="#5b5b5b" />
            <Button type="submit" value="Add" title='Add' color='#c2ad65' onPress={handleSubmit}></Button>
        
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: '1%',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#1b1b1b',
    },
    elementContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5%',
    }, 
    pickerType: {
        padding: 0,
        width: '100%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    markerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    markers: {
        flexDirection: 'row', 
        minWidth: 200  
    },
    marker: {
        borderColor: 'grey', 
        borderWidth: 1, 
        textAlign: 'left',
        fontSize: 16,
        margin: '1%',
        height: 40,
        padding: '2%',
        borderRadius: 3,
        color: 'lightgrey',
    },
    markerPressed: {
        borderColor: '#c2ad65',
        borderWidth: 1,
        textAlign: 'left',
        fontSize: 16,
        margin: '1%',
        height: 40,
        padding: '2%',
        borderRadius: 3,
        color: '#c2ad65', 
    },
    aditionalFieldsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: 60
    },
    pickerCollection: {
        fontSize: 16,
        textAlign: 'center',
        width: 150,
    },
    dateTimePickerStyle: {
        fontSize: 16,
        overflow: 'hidden',
        width: 120,

    },
    textInput: {
        fontSize: 18,
        padding: '2%',
        backgroundColor: '#1b1b1b',
        textAlign: 'center', 
        height: '30%',
        color: '#fffef7',
        borderWidth: 1,
        borderColor: '#5b5b5b',
        marginHorizontal: '5%'
    }
})