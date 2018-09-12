
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';


export default class Card extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.card}>
                <Image source=
                    {{ uri: this.props.item.url }} resizeMode="contain" style={{ width: 350, height: 350 }} />

                
                <View style={{ flexDirection: 'row',  justifyContent: 'space-around' }}>
                    <View>
                        <Text>{this.props.likes}</Text>
                        <Icon name='thumb-up' size={20} color="#777" />
                    </View>


                    <View>
                        <Text>{this.props.dislikes}</Text>
                        <Icon name='thumb-down' size={20} color="#777" />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.saveLikeCallback(this.props.item)}>
                        <Iconz name='ios-heart-outline' size={36} color="#888" style={{ marginTop: 5 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.saveDislikeCallback(this.props.item)}>
                        <Iconz name='ios-close' size={45} color="#888" style={{}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        // alignItems: 'center',
        // alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        width: 350,
        height: 400,
    },
    buttons: {
        width: 80,
        height: 80,
        borderWidth: 10,
        borderColor: '#e7e7e7',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 40
    },
    buttonSmall: {
        width: 50,
        height: 50,
        borderWidth: 10,
        borderColor: '#e7e7e7',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 25
    },

});
