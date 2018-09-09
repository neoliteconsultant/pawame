import React from 'react';
import { AsyncStorage } from "react-native"
import CatApi from '../constants/CatApi';
import Nav from './Nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
export default class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, likes: 0, dislikes: 0
    }
  }

  Card(item) {
    return (
      <View style={styles.card}>
        <Image source=
          {{ uri: item.url }} resizeMode="contain" style={{ width: 350, height: 350 }} />

      </View>
    )
  }
  handleYup(card) {
    console.log(`Yup for ${card.id}`)
  }

  handleNope(card) {
    console.log(`Nope for ${card.id}`)
  }
  noMore() {
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup() {
    console.log(this.refs['swiper'])
    this.refs['swiper']._goToNextCard()
  }

  nope() {
    console.log(this.refs['swiper'])
    this.refs['swiper']._goToNextCard()
  }


  componentDidMount() {
    fetch(CatApi.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': CatApi.apiKey
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("Cats ", JSON.stringify(responseJson))

        this.setState({
          isLoading: false,
          cards: responseJson
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  retrieveLikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(CatApi.likeKey + imageId);
      if (value !== null) {
        // We have data!!
        console.log(value);
        // this.setState({
        //   likes: value
        // });
      }
    } catch (error) {
      console.error(error);
    }
  }

  saveLikes = async (imageId) => {
    try {
      const asyncKey = CatApi.likeKey + imageId;
      const value = await AsyncStorage.getItem(asyncKey);

      console.log("Saving likes for " + asyncKey);

      if (value !== null) {
        value += 1 //increment the number of likes
        console.log(value);

      } else {
        value = 1;
      }
      await AsyncStorage.setItem(asyncKey, value);

    } catch (error) {
      console.error(error);
    }
  }

  retrieveDislikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(CatApi.dislikeKey + imageId);
      if (value !== null) {
        console.log(value);
        // this.setState({
        //   dislikes: value
        // });
      }
    } catch (error) {
      console.error(error);
    }
  }

  saveDislikes = async (imageId) => {
    try {
      const asyncKey = CatApi.likeKey + imageId;
      const value = await AsyncStorage.getItem(asyncKey);

      if (value !== null) {
        value += 1 //increment the number of dislikes
        console.log(value);


      } else {
        value = 1
      }
      await AsyncStorage.setItem(asyncKey, value);
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Nav />
        <SwipeCards
          ref={'swiper'}
          cards={this.state.cards}
          containerStyle={{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          handleNope={this.handleNope} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.buttons} onPress={() => this.nope()}>
            <Iconz name='ios-close' size={45} color="#888" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSmall}>
            <Iconz name='ios-information' size={25} color="#888" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => this.yup()}>
            <Iconz name='ios-heart-outline' size={36} color="#888" style={{ marginTop: 5 }} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  buttons: {
    width: 80,
    height: 80,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonSmall: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width: 350,
    height: 420,
  }

});
