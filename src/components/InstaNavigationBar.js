import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import { Constants } from 'expo';
import Dimensions from 'Dimensions';
const navBarHeight = 88;
const window = Dimensions.get('window');
const iconSize = navBarHeight/3;


class InstaNavigationBar extends Component {

  constructor (props){
    super(props);
  }
  render(){
    return (


      <View style={viewStyles.container}>
        <Image
          resizeMode={'cover'}
          source={require('../Images/icons/camera.png')}
          style={[viewStyles.genericIcon, {width: iconSize * 1.2 , height: iconSize * 1.2}]}
        />


        <Image
        resizeMode={'cover'}
        source={require('../Images/instagram-logo-black.png')}
        style={viewStyles.instagramHeaderLogo}
        />

        <Image
        resizeMode={'cover'}
        source={require('../Images/icons/paper-plane.png')}
        style={viewStyles.genericIcon}
        />





      </View>
    );
  }


}

const viewStyles = {

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: window.width,
    height: navBarHeight,
    borderBottomWidth: 1,
    borderColor: 'rgb(220, 220, 220)',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 13,
    marginTop: 10
  },
  genericIcon: {
    width: iconSize,
    height: iconSize,
    paddingHorizontal: 10,
    backgroundColor: 'transparent'
  },
  instagramHeaderLogo: {
    width: 150,
    height: 45,
    backgroundColor: 'transparent'
  }
}

  export { InstaNavigationBar };
