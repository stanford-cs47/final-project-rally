import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, TextInput, Button, Alert } from 'react-native';
import firestore from '../../firebase';
import firebase from 'firebase';
import { Images } from '../Themes';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      signUpName: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: '',
      errorMessageLogin: '',
    }
  }

  static navigationOptions = {
    header: null,
  };

  // Check out this link to learn more about firebase.auth()
  // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
  signUp = async () => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword);
      if(response.user) {
        const user = firebase.auth().currentUser;
        var userDocRef = firestore.doc('users/' + user.uid);

        // Since my document doesn't exist, userDocRef.set will
        // create the document for me
        userDocRef.set({
          name: this.state.signUpName
        });

        this.props.navigation.navigate('Home');
      }
    } catch (err) {
      Alert.alert('Sign Up Error', err.message)
      console.log(err);
    }
  }
  
  // Check out this link to learn more about firebase.auth()
  // https://firebase.google.com/docs/reference/node/firebase.auth.Auth
  login = async () => {
    try {
      // Note that we don't have to tell the app that the user has logged in.
      // firebase.auth().onAuthStateChanged() in App.js communicates this for us!
      await firebase.auth().signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPassword)
      this.props.navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Login Error', err.message)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.rallyLogo}>
          <Image source={Images.rally} style={styles.logo}/>
        </View>
        <TextInput
          style={styles.input}
          value={this.state.signUpName}
          onChangeText={(signUpName) => this.setState({ signUpName })}
          placeholder="Name" 
        />
        <TextInput
          style={styles.input}
          value={this.state.signUpEmail}
          onChangeText={(signUpEmail) => this.setState({ signUpEmail })}
          placeholder="Email" 
        />
        <TextInput
          style={styles.input}
          value={this.state.signUpPassword}
          secureTextEntry={true}
          onChangeText={(signUpPassword) => this.setState({ signUpPassword })}
          placeholder="Password"
        />
        <Button
          title="Sign Up"
          onPress={()=> this.signUp()}
          color='black'
        />


        <TextInput
          style={[styles.input, {marginTop: 50}]}
          value={this.state.loginEmail}
          onChangeText={(loginEmail) => this.setState({ loginEmail })}
          placeholder="Email" 
        />
        <TextInput
          style={styles.input}
          value={this.state.loginPassword}
          secureTextEntry={true}
          onChangeText={(loginPassword) => this.setState({ loginPassword })}
          placeholder="Password" 
        />
        <Button
          title='Login'
          onPress={()=> this.login()}
          color='black'
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rallyLogo: {
    position: 'absolute',
    top: '7.2%',
  },
  logo: {
    resizeMode: 'contain',
    height: 30,
    marginLeft: 15,
  },
  input: {
    width: '90%',
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: 'whitesmoke',
    padding: 5,
    borderRadius: 5,
  },
  button: {
    marginBottom: 50
  }
});