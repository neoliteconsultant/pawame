import { React, Text, View } from 'react';
import { Icon } from 'expo';



export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Icon.Ionicons
          name={this.props.name}
          size={32}
        />
      </View>

    );
  }
}