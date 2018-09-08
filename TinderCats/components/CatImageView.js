import React from 'react';
import { AsyncStorage, Platform } from "react-native"
import CatApi from '../constants/CatApi';
import TabBarIcon from "./TabBarIcon"
import { FlatList, ActivityIndicator, StyleSheet, Text, Image, View } from 'react-native';
const LIKES_KEY = "likes" //AsyncStorage key for storing likes count
const DISLIKES_KEY = "dislikes" //AsyncStorage key for storing dislikes count
export default class CatImageView extends React.Component {


  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch(CatApi.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': CatApi.apiKey
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        //console.log("Cats ", JSON.stringify(responseJson))

        this.setState({
          isLoading: false,
          cats: responseJson
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  retrieveLikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(LIKES_KEY + imageId);
      if (value !== null) {
        // We have data!!
        console.log(value);

        this.setState({
          likes: 20
        });

        return value;
      }
    } catch (error) {
      console.error(error);
    }

    return 0;
  }

  saveLikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(LIKES_KEY + imageId);
      if (value !== null) {
        value += 1 //increment the number of likes
        console.log(value);

      } else {
        value = 1;
      }
      await AsyncStorage.setItem(LIKES_KEY + imageId, 1);

    } catch (error) {
      console.error(error);
    }
  }

  retrieveDislikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(DISLIKES_KEY + imageId);
      if (value !== null) {
        console.log(value);
        this.setState({
          dislikes: 20
        });

        return value;

      }
    } catch (error) {
      console.error(error);
    }

    return 0;
  }

  saveDislikes = async (imageId) => {
    try {
      const value = await AsyncStorage.getItem(DISLIKES_KEY + imageId);
      if (value !== null) {
        value += 1 //increment the number of likes
        console.log(value);


      } else {
        value = 1
      }
      await AsyncStorage.setItem(DISLIKES_KEY + imageId, 1);
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
        <FlatList
          data={this.state.cats}
          renderItem={({ item }) =>
            <View style={{ flex: 1, flexDirection: 'column' }} >
              <Image style={styles.logo} source=
                {{ uri: item.url }} />

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <TabBarIcon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-thumbs-up'
                      : 'md-thumbs-up'
                  }
                />
                <Text>{this.retrieveLikes(item.id)}</Text>
                <TabBarIcon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-thumbs-down'
                      : 'md-thumbs-down'
                  }
                />
                <Text>{this.retrieveLikes(item.id)}</Text>
              </View>
            </View>
          }
          keyExtractor={(item, index) => item.id}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  logo: {
    height: 400,
    width: 350,
  }
});