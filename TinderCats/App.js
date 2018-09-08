import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CatImageView from './components/CatImageView';

export default class App extends React.Component {
  state = { "image": "https://78.media.tumblr.com/tumblr_m4b049gr5P1qhy6c9o1_500.gif" }
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  render() {
    return (
      <View style={styles.container}>
        <CatImageView />
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
  }
});
