import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar } from 'react-native';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <Image source={require('./src/Images/insta_login_background.jpg')} style={viewStyles.container}>

        <StatusBar backgroundColor="transparent" barStyle="light-content"/>
        <ScrollView>

          <Image source={require('./src/Images/instagram-text-logo.png')}
            resizeMode={'contain'}
            style={viewStyles.instagramTextLogo}

          />
        </ScrollView>


      </Image>
    );
  }
}

const viewStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: null,
    height: null
  },

  scrollView: {
    flex: 1,
    flexDirection: 'column'
  },
  instagramTextLogo: {
    width: 145,
    height: 55,
    marginTop: (window.height * 0.20),
    marginBottom: 30,

  }
};
