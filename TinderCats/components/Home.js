import React from 'react';
import { AsyncStorage } from "react-native"
import CatApi from '../constants/CatApi';
import Card from './Card'
import Nav from './Nav'
import SwipeCards from 'react-native-swipe-cards';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
export default class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, likes: 0, dislikes: 0
    }
  }


  handleYup(card) {
    console.log(`Yup for ${card.id}`)

  }

  handleNope(card) {
    console.log(`Nope for ${card.id}`)

  }
  noMore() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'center', backgroundColor: '#f7f7f7' }}>
        <Text>No More Cats</Text>
      </View>
    )
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
        this.setState({
          isLoading: false,
          cards: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  saveLikes = (card) => {
    try {
      let cardId = card.id;
      const asyncKey = CatApi.likeKey + cardId;
      AsyncStorage.getItem(asyncKey).then((count) => {
        let value = Number(count);
        value += 1; //increment the number of likes
        // console.log(value);
        this.setState({
          id:cardId,
          likes: value
        });


        console.log("Saving Card Id", cardId);
        console.log("Saving Like count", value);
        AsyncStorage.setItem(asyncKey, String(value));

      });

    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Get count of likes and dislikes.
   */
  getStatistics = (card) => {
    let cardId = card.id;
    let asyncKeyLike = CatApi.likeKey + cardId;
    let asyncKeyDislike = CatApi.dislikeKey + cardId

    AsyncStorage.getItem(asyncKeyDislike).then((dislikeCountVal) => {
      try {
        const dislikeCount = Number(dislikeCountVal);

        console.log("Card Id", cardId);
        console.log("Dislike count", dislikeCount);

        this.setState({
          dislikes: dislikeCount
        });
      } catch (error) {
        console.error(error);
      }
    });

    AsyncStorage.getItem(asyncKeyLike).then((likeCountVal) => {
      try {
        const likeCount = Number(likeCountVal);
      

        console.log("Card Id", cardId);
        console.log("Like count", likeCount);
      
        this.setState({
          likes: likeCount
        });
      } catch (error) {
        console.error(error);
      }
    });
  }


  saveDislikes = (card) => {
    try {
      let cardId = card.id;
      const asyncKey = CatApi.dislikeKey + cardId;
      AsyncStorage.getItem(asyncKey).then((count) => {
        let value = Number(count);

        value += 1; //increment the number of dislikes
        //console.log(value);
        AsyncStorage.setItem(asyncKey, String(value));

        console.log("Saving Card Id", cardId);
        console.log("Saving Dislike count", value);

        this.setState({
          id:cardId,
          dislikes: value
        });
        this.getStatistics(card);
      })

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
          renderCard={(cardData) => <Card item={cardData}
            likes={this.state.likes}
            dislikes={this.state.dislikes}
            saveLikeCallback={this.saveLikes}
            saveDislikeCallback={this.saveDislikes}
          ></Card>}
          renderNoMoreCards={() => this.noMore()}
          handleYup={(cardData) => this.getStatistics(cardData)}
          handleNope={(cardData) => this.getStatistics(cardData)} />


      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
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
