import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal} from 'react-native';
import axios from 'axios';
import { TrackingStates } from 'expo/build/AR';

export default function App() {
  const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=70468a66';
  const [state, setState] = useState({
    s: "Enter a movie..",
    results: [],
    selected:{}
  })

  const search = () => {
    axios(apiurl + "&s=" + TrackingStates.s).then(({data}) => {
      let results = data.search
      setState(prevState =>{
        return {...prevState, results: results}
      })
    })
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({data}) => {
      let result = data;

      setState(prevState =>{
        return {...prevState, results: results}
      })
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie list!</Text>
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState =>{
          return{...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />

      <ScrollView style={style.results}>
        {state.results.map(result => (
          <TouchableHighlight 
          key={result.imbdID} 
          onPress={() => openPopup(result.imbdID)}>
          <View key={result.imdnID} style={styles.result}>
            <Image 
              source ={{uri: result.Poster}}
              style={{
                width:'100%',
                height:300,
              }}
              resizeMode="cover"
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal 
      animationType='fade'
      transparent={false}
      visible={(typeof state.selected.Title != 'undefined') ? ture : false}
      >
      <View>
        <Text style={styles.poptitle}>{state.selected.Title}</Text>
        <Text style={{marginBottom:20}}>Rating: {state.selected.imdbRating}</Text>
        <Text>{state.selected.Plot}</Text>
      </View>

      <TouchableHighlight 
        onPress={() => setStates(prevState => {
          return { ...prevState, selected: {} }
        })}
      >
        <Text style={styles.closeBtn}>Close</Text>
      </TouchableHighlight>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingHorizontal: 20, 
  },
  title: {
    color: '#FFF',
    fontSize: 32, 
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20, 
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF', 
    boarderRadius: 8,
    marginBottom: 40,
  }, results: {
      flex: 1,
  },
    result: {
      flex: 1, 
      width: '100%',
      marginBottom: 20
    },
    heading: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: '700',
      padding: 20,
      backgroundColor: '#445565'
    },
    popup: {
      padding: 20
    }, 
    poptitle: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 5
    },
    closeBtn: {
      padding: 20,
      fontSize: 20,
      color: '#FFF',
      fontWeight: '700',
      backgroundColor: '#2484C4'
    }
});
