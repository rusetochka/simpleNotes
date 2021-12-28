import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import moment from 'moment';

export function Record(props) {
    const { record, removeRecord, changeRecord } = props;
    const [editing, setEditing] = useState(false);
    const [completed, setCompleted] = useState(record.completed);
    const [migrated, setMigrated] = useState(record.migrated);
    const [collection, setCollection] = useState(record.collection);
    const [sheduled, setShedule] = useState(record.sheduled);
    const [deadline, setDeadline] = useState(record.deadline);

    const handleRemoveClick = () => {
        removeRecord(record.id);
    };

    const handleCompletion = () => {
        record.completed ? setCompleted(false) : setCompleted(true);
        const newValues = {
            completed: completed,
      };
      changeRecord(record.id, newValues);
    };

    const handleMigration = () => {
        record.migrated ? setMigrated(false) : setMigrated(true);
        let newValues;
        if (migrated) {
            newValues = {
                migrated: migrated,
                collection: collection
            };
        } else {
            newValues = {
                migrated: false,
                collection: ''
            }
        }       
        changeRecord(record.id, newValues);
    };
    const handleShedule = () => {
        record.sheduled ? setShedule(false) : setShedule(true);
        const newValues = {
            sheduled: sheduled
        }
        changeRecord(record.id, newValues);
    };

    const handleDeadline = (event, selectedDate) => {
        setDeadline(selectedDate);
        const newValues = {
            deadline: selectedDate,
        };
        changeRecord(record.id, newValues);

    };

    const handleCollection = (param) => {
        setCollection(param);
        const newValues = {
                collection: param
            };
        changeRecord(record.id, newValues);
        
    };


    let sign;
    if(record.type === 'Event') {
        sign = <Text>&#9633; </Text>;
    } else if(record.type === 'Task') {
        sign = <Text>&bull; </Text>
    } else {
        sign = <Text>- </Text>
    };

    const handleEditing = () => {
        if(record.type === 'Task' || record.type === 'Event') {
            editing === false ? setEditing(true): setEditing(false);
        };      
    };

    

    return (
        <View style={styles.record}>
            <Text style={styles.card}>
                <Text
                    aria-label="Remove record"
                    style={styles.removeButton}
                    className="remove-button"
                    onPress={handleRemoveClick}>&times;  {"\n"}
                </Text>
                <View style={styles.textString}>
                    {completed ? <Text onPress={handleCompletion} style={styles.completed}>x</Text> : <Text onPress={handleCompletion} style={styles.text}>{sign}</Text>}<Text style={completed ? styles.completed : styles.text}>{record.text} </Text>
                </View>
                
                {migrated ? <View><Text style={styles.tag}>{record.collection}</Text></View> : null}
                {sheduled && !completed ? <View><Text style={styles.dateTag}> {moment.utc(record.deadline).format('DD.MM.YY')}</Text></View> : null}

                {!editing ? <Text style={styles.moreInfo} onPress={handleEditing}>{"\n"}&darr;</Text> : null}
                {editing ? <Text style={styles.moreInfo} onPress={handleEditing}>{"\n"}&uarr;</Text> : null}

                {editing === true ? <View style={styles.moreInfoContainer}>
                                <View style={styles.buttonContainer}>
                                    <Text style={completed ? styles.actionButtonPressed : styles.actionButton} onPress={handleCompletion}>&#10003;</Text>
                                    <Text style={migrated ? styles.actionButtonPressed : styles.actionButton} onPress={handleMigration}>&gt;</Text> 
                                    <Text style={sheduled ? styles.actionButtonPressed : styles.actionButton} onPress={handleShedule}>&lt;</Text>
                                </View>

                                {sheduled ? <View style={styles.deadline}>
                                                <Text style={styles.sheduled}>due to: </Text>
                                                <DateTimePicker
                                                    value={deadline}
                                                    placeholder="Select date"
                                                    mode='date'
                                                    style={styles.dateTimePickerStyle}
                                                    textColor='white'
                                                    onChange={handleDeadline}
                                                />
                                            </View> : null}

                                {migrated ? <Picker 
                                                    selectedValue={collection}
                                                    onValueChange={handleCollection}
                                                    style={styles.pickerCollection}
                                                    itemStyle={{color: 'white', height: 44}}>
                                                        <Picker.Item label="Inbox" value="Inbox" />
                                                        <Picker.Item label="Books" value="Books" />
                                                        <Picker.Item label="Work" value="Work" />
                                                        <Picker.Item label="Video" value="Video" />
                                                        <Picker.Item label="Drawing" value="Drawing" />
                                                        <Picker.Item label="Kids" value="Kids" />
                                                        <Picker.Item label="Shopping" value="Shopping" />        
                                            </Picker> : null}
                            </View> : null} 
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    record: {
        borderRadius: 3,
        width: '100%',
        borderWidth: 1,
        borderColor: '#c2ad65',
        paddingLeft: 10,
    },
    card: {
        flexDirection: 'column',
        fontSize: 16,
        color: '#fdfdfd',
    },
    removeButton: {
        borderRadius: 3,
        backgroundColor: 'transparent',
        textAlign: 'right',
        flex: 1,
        color: '#fdfdfd',
        fontSize: 18
    },
    textString: {
        flexDirection: 'row'
    },
    completed: {
        padding: '1%',
        color: '#33cc33',
        fontSize: 18
    },
    text: {
        color: '#fdfdfd',
        fontSize: 18
    },
    tag: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        backgroundColor: 'grey',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 14,
        paddingHorizontal: 3
    },
    dateTag: {
        color: '#c2ad65'
    },
    moreInfo: {
        textAlign: 'center',
        color: 'grey',
    },
    moreInfoContainer: {
    },
    buttonContainer: {
        flexDirection: "row",
        margin: 10,
        color: '#fdfdfd'
    },
    actionButton: {
        borderColor: '#fdfdfd',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        textAlign: 'center',
        margin: '2%',
        fontSize: 20,
        color: '#fdfdfd'
    },
    actionButtonPressed: {
        borderColor: '#c2ad65',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        textAlign: 'center',
        margin: '2%',
        fontSize: 20,
        color: '#c2ad65'
    },
    pickerCollection: {
        fontSize: 16,
        textAlign: 'center',
        width: 200,
        overflow: 'hidden',
        margin: '1%',
        height: 44,
    },
    deadline: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 44
    },
    sheduled: {
        fontSize: 14,
        color: '#c2ad65',

    },
    dateTimePickerStyle: {
        width: 100,
        height: 44,
        color: '#fdfdfd',
        overflow: 'hidden',
    },
});