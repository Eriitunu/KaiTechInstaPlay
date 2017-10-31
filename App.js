import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar, Linking, WebView, Alert, ActivityIndicator, StyleSheet,FlatList } from 'react-native';
import Dimensions from 'Dimensions';
import {LoginButton, TappableText, InstaNavigationBar, InstaFeedCell} from './src/components';
import {NetworkManager} from './src/model';
import {BlurView } from 'expo';



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
  forgottenInstagramLogin: 'https://www.instagram.com/accounts/password/reset' ,
  twitterLogin: 'https://www.twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLoginURL:'https://api.instagram.com/oauth/authorize/?client_id=082e4f7907564093b2d2df83b80718be&redirect_uri=http://kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/'
}

export default class App extends React.Component {

  constructor(props){

    super(props);
//initialise the golbal state object
    this.state = {
      authenticationURL: urls.instagramAuthLoginURL,
      retrievedAccessToken: '',
      isUserLoggedIn: false,
      displayAuthenticationWebView: false,
      feedDataArray: [],
      sessionData: null ,
      isDataLoading: false,
      successfullDataResponse: false,
      shouldDisplayLogInScreen: true,

    }

    this.isSuccesfullyLoggedInAlertPoppedUp = false;

  }

  loginButtonTapped = () => {
    this.setState({displayAuthenticationWebView: true, shouldDisplayLogInScreen: false});
  }

  onURLStateChange = (webViewState) => {

    let accessTokenSubString = 'access_token=';

    console.log("Current webViewState = " + webViewState.url)

    if(webViewState.url == urls.instagramBase){
      console.log("Aha! Yes this is instagramBase");
      this.setState({authenticationURL: urls.instagramAuthLoginURL});
    }
    else if(webViewState.url.includes(accessTokenSubString)){

      let startIndexOfAccessToken = webViewState.url.lastIndexOf(accessTokenSubString) + accessTokenSubString.length;
      if (this.state.retrievedAccessToken.length < 1) {
        // this.setState({retrievedAccessToken: webViewState.url.substr(startIndexOfAccessToken), displayAuthenticationWebView: false})

        if (this.isSuccesfullyLoggedInAlertPoppedUp == false) {

          Alert.alert(
            'Success',
            'Congratulations youve been successfully authenticated' ,
            [
              {text: 'Proceed' , onPress: () => this.beginFetchUserSessionData(webViewState.url.substr(startIndexOfAccessToken))}
            ]
          )
          this.isSuccesfullyLoggedInAlertPoppedUp = true;
        }

      }
    }

  }

  beginFetchUserSessionData = (accessToken) => {
    this.networkManager= new NetworkManager(accessToken);

     let self = this;

    this.networkManager.getSessionAndFeedData((sessionResponse) => {
      self.setState({sessionData: sessionResponse});
    }, (feedResponse) => {
      self.setState({feedDataArray: feedResponse, isDataLoading: false});
    });

    this.setState({retrievedAccessToken: accessToken, isDataLoading: true, displayAuthenticationWebView: false});
  }

  orSeperatorComponent = () => {
      return (
        <View style={viewStyles.orSeperatorComponent}>
          <View style={viewStyles.orSeperatorLine}/>
          <Text style={textStyles.orSeperatorText}> OR </Text>
          <View style={viewStyles.orSeperatorLine}/>
        </View>
      );
  }

  signUpFooter = () => {
    return (
      <View style={[viewStyles.forgottenLoginEncapsulationView,viewStyles.signUpFooterComponent]}>
        <Text style={textStyles.forgottenLogin}> Dont you have an account? </Text>
        <TappableText
          textStyle={[textStyles.forgottenLogin,textStyles.forgottenLoginBold]}
          textTapped={() => Linking.openURL(urls.instagramSignUp)}
        >
        Sign Up
        </TappableText>
      </View>
    );

  }

  loginWithTwitterTappableTextComponent = () => {
    return (
      <View style={viewStyles.twitterLoginEncapsulatingView}>
        <Image
        source={require('./src/Images/twitter_bird.png')}
        style={viewStyles.twitterIcon}
        resizeMode={'contain'}
        />
        <TappableText
        textStyle ={textStyles.twitterLoginText}
        textTapped={() => Linking.openURL(urls.twitterLogin)}
        >
          Log in with Twitter
        </TappableText>
      </View>
    )
  }

  authenticationWebViewComponent = () => {
    return(
      <WebView
        source={{  uri: this.state.authenticationURL }}
        startInLoadingState={true}
        onNavigationStateChange={this.onURLStateChange}

      />
    );
  }


  logInScreenComponent = () => {
    return(

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

          {this.orSeperatorComponent()}

          {this.loginWithTwitterTappableTextComponent()}

        </ScrollView>

        {this.signUpFooter()}

      </Image>
    );
  }

  instagramBackgroundScreen = () => {
    return(

      <Image source={require('./src/Images/instagramWallpaper.jpg')}
        resizeMode={'cover'}
        style = {{flex:1, width:null, height: null}}
      >
        <BlurView
          tint="dark"
          intensity={85}
          style={[StyleSheet.absoluteFill, {alignItems: 'center' , justifyContent: 'center'}]}
        >
          <ActivityIndicator
            size='large'
          />
          <Text style= {{ fontWeight: '600', fontSize: 15 }}> Data Loading... </Text>

        </BlurView>



      </Image>

    );

  }

  render() {

    let hasSuccesfullyLoggedIn = (this.state.retrievedAccessToken.length > 1 && this.state.isDataLoading == false);


    if(this.state.shouldDisplayLogInScreen){
      return (
        this.logInScreenComponent()
      );
    }

    else if (this.state.isDataLoading) {
      return(
        this.instagramBackgroundScreen()
      );
    }
    else if(this.state.displayAuthenticationWebView && !this.state.shouldDisplayLogInScreen) {
      return (
        this.authenticationWebViewComponent()
      );
    }
    else if(hasSuccesfullyLoggedIn){
      return (
        <View style={{alignItems: 'center' ,  flex: 1}}>
          <InstaNavigationBar />
          <FlatList
            data={this.state.feedDataArray}
            renderItem={({item}) => <InstaFeedCell cellData={item} />}
            keyExtractor={item => item.id}
            />
        </View>
      );
    }
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
    marginTop:10
  },

  orSeperatorComponent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 25,
    marginBottom: 15,
    alignItems: 'center'
  },
  orSeperatorLine: {
    height: 1,
    flex: 5,
    backgroundColor:colors.facebookButtonBorderColor,
    borderColor: colors.facebookButtonBorderColor,
    borderWidth: 0.5
  },
  twitterLoginEncapsulatingView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: standardComponentWidth,
    height: 30,
    justifyContent: 'center',

    alignItems: 'center'
  },
  twitterIcon: {
    width: 20,
    height: 20
  },
  signUpFooterComponent: {
    flex: 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
    height: null,
    width: window.width
  }

};

const textStyles = {

  forgottenLogin: {
    color: 'white',
    fontSize: loginButtonInfo.pageFontSize
  },

  forgottenLoginBold: {
    fontWeight: 'bold'
  },
  orSeperatorText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 4,
    flex: 1,
    backgroundColor: 'transparent',
    color: colors.facebookButtonBorderColor,
  },
  twitterLoginText: {
    fontWeight: 'bold',
    fontSize: 11.5,
    marginLeft: 5,
    color: 'white',
    backgroundColor:'transparent'
  }
};
