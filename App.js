import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView ,} from 'react-native';

sampleNames = [
  {firstName : 'Jerome', lastName: 'Bulaklak'},
  {firstName : 'Random', lastName: 'Name'}
]

export default function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [arrNames, setArrNames] = useState([{firstName : 'Jerome', lastName: 'Bulaklak'}])
  const [action, setAction] = useState('save')
  const [editedArr, setEditArr] = useState([])
  const [editedIndex, setEditedIndex] = useState(0)

  useEffect(() => {
    setArrNames(sampleNames)
  },[]);

  const addName = () => {
    if( firstName == '' || lastName == ''){
      alert('Input Name')
    }else if (action == 'edit') {
      const item = {firstName, lastName}
      let array = [...arrNames];
      array[editedIndex] = item;
      setArrNames(array)
      setFirstName('')
      setLastName('')
      setAction('save')
    }else{
      setArrNames(oldArray => [...oldArray, {firstName, lastName}] );
      setFirstName('')
      setLastName('')
      setAction('save')
    }
  }

  const editName = (item, index) => {
    setFirstName(item.firstName)
    setLastName(item.lastName)
    var array = [...arrNames];
    array.splice(index, 1);
    setAction('edit')
    setEditArr(array)
    setEditedIndex(index)
  }


  const deleteName = (index) => {
    var array = [...arrNames];
    array.splice(index, 1);
    setArrNames(array);
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style = {{flexDirection: 'row',paddingTop:40}}>
        <View style ={{flex: 1}}>
          <Text>Input First Name</Text>
          <TextInput placeholder='First Name' value={firstName} onChangeText={(text) => {setFirstName(text)}}/>
        </View>
        <View style ={{flex: 1}}>
          <Text>Input Last Name</Text>
          <TextInput placeholder='Last Name' value={lastName} onChangeText={(text) => {setLastName(text)}}/>
        </View>
        <Button  title='Save' onPress={() => {addName()}}/>
      </View>
      

      <ScrollView style ={{borderWidth: 1, marginTop: 25}}>
       {
        arrNames.map((i, index) => {
          return(
            <View key = {index} style = {{flexDirection: 'row', marginTop: 15}}>
              <Text style = {{flex: 1}}> {i.firstName} </Text>
              <Text style = {{flex: 1}}> {i.lastName} </Text>
              <Button  title='Edit' color={'blue'} onPress={() => {editName(i, index)}}/>
              <Button  title='Delete' color={'red'} onPress={() => {deleteName(index)}}/>
            </View>
          )
        })
       }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
