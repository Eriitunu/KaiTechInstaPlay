import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar, Linking } from 'react-native';
import Dimensions from 'Dimensions';
import {LoginButton, TappableText } from './src/components';


const window = Dimensions.get('window');

const standardComponentWidth = window.width * 0.82;

const colors = {
  facebook: 'rgb(59, 89, 152)',
  text: 'rgba(255, 255, 255, 0.75)',
  instagramButtonBorderColor: 'rgba( 255, 255, 255, 0.35)',
  facebookButtonBorderColor: 'rgba( 255, 255, 255, 0.35)',

}

const loginButtonInfo = {
  height: 45,
  pageFontSize: 11,
  borderWidth: 0.8,
  borderRadius: 5,
}

const urls = {
  forgottenInstagramLogin: 'https://www.instagram.com/accounts/password/reset'
}

export default class App extends React.Component {

  loginButtonTapped = () => {
    console.log('button was just tapped');
  }

  render() {
    return (
      <Image source={require('./src/Images/insta_login_background.jpg')} style={viewStyles.container}>

        <StatusBar backgroundColor="transparent" barStyle="light-content"/>
        <ScrollView>

          <Image source={require('./src/Images/instagram-text-logo.png')}
            resizeMode={'contain'}
            style={viewStyles.instagramTextLogo}
          />

          <LoginButton
          buttonViewStyle ={viewStyles.instagramLoginButtonView}
          touchableHighlightStyle= {viewStyles.instagramLoginButtonHghlightStyle}
          buttonTextStyle= {viewStyles.buttonTextStyle}
          buttonTapped={this.loginButtonTapped}
          activeOpacity={0.75}
          >



            Log  Into Erigram
          </LoginButton>

          <LoginButton
          buttonViewStyle ={[viewStyles.instagramLoginButtonView, viewStyles.facebookLoginButtonView]}
          touchableHighlightStyle= {viewStyles.facebookLoginButtonHighlightStyle}
          buttonTextStyle= {viewStyles.buttonTextStyle}
          buttonTapped={this.loginButtonTapped}
          activeOpacity={0.75}
          >



            Facebook Login
          </LoginButton>

          <View style={viewStyles.forgottenLoginEncapsulationView}>
            <Text style={textStyles.forgottenLogin}> Forgotten your login details? </Text>
            <TappableText
              textStyle={[textStyles.forgottenLogin, textStyles.forgottenLoginBold]}
              textTapped={() => Linking.openURL(urls.forgottenInstagramLogin)}
            >
              Get Help Signing In
              </TappableText>
          </View>


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
    width: (window.height* 0.25),
    height: (window.height* 0.12),
    marginTop: (window.height * 0.15),
    marginBottom: 30,
    alignSelf:'center'
  },

  instagramLoginButtonView: {
    backgroundColor: 'transparent',
    borderColor: colors.instagramButtonBorderColor,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    justifyContent: 'center',
    alignItems: 'center'
  },

  facebookLoginButtonView: {
    backgroundColor:colors.facebook,
  },

  instagramLoginButtonHghlightStyle: {
    backgroundColor: 'transparent',
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    marginTop: 5,
  },

  facebookLoginButtonHighlightStyle: {
    backgroundColor: colors.facebook,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    borderColor: loginButtonInfo.facebookButtonBorderColor
  },

  buttonTextStyle: {
    color: colors.text
  },
  forgottenLoginEncapsulationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop:10,
    marginBottom: window.height * 0.15


  }

};

const textStyles = {

  forgottenLogin: {
    color: 'white',
    fontSize: loginButtonInfo.pageFontSize
  },

  forgottenLoginBold: {
    fontWeight: 'bold'
  }
};
