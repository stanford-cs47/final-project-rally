'use strict'
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StatusBar,
  FlatList,
  View
} from 'react-native';
import { BackButtonMessages } from '../components';
import firestore from '../../firebase';
import firebase from 'firebase';
import styles from './styles.js';

class GiftedChat extends Component {
  static navigationOptions = {
    title: 'Messages',
    header: null
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.roomsRef = firestore.collection('users/' + user.uid  + '/rooms');
    this.state = {
      rooms: [],
      newRoom: ''
    }
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.get().then((querySnapshot)=> {
      var roomsFB = [];
      querySnapshot.forEach((doc) => {
        roomsFB.push({
          name: doc.data().name,
          key: doc.id,
        });
      });
      this.setState({ rooms: roomsFB });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  addRoom() {
    if (this.state.newRoom === '') {
      return;
    }
    this.roomsRef.add({ name: this.state.newRoom });
    this.setState({ newRoom: '' });
    this.listenForRooms(this.roomsRef);
  }

  openMessages(room) {
    this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: room.name});
  }

  renderRow(item) {
    return (
      <TouchableHighlight style={styles.roomLi}
      underlayColor="#fff"
      onPress={() => this.openMessages(item)}
      >
        <Text style={styles.roomLiText}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.roomsContainer}>
        <BackButtonMessages navigation={this.props.navigation} />
        <StatusBar barStyle="dark-content"/>
        <Text style={styles.roomsHeader}>Messages</Text>
        <View style={styles.roomsListContainer}>
          <FlatList
            data={this.state.rooms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (this.renderRow(item))}
          />
        </View>
      </View>
    );
  }
}

export default GiftedChat;
