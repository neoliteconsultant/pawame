import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Home from './components/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  render() {
    return (
      <View style={styles.container}>
        <Home />
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
