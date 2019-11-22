import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default class EventThreeExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={335}
        renderForeground={() => (
          <View style={styles.foreground}>
            <View style={styles.container}>
              <MapView
                initialRegion={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle} 
              >

              <Marker
                coordinate={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                }}
                title="Mana `O ">
                <Image source = {Images.event1}/>
              </Marker>
            </MapView>
          
            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <Image source={Images.event3Pic} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>Mana `O Maunakea</Text>
            <Text style={styles.smallText}>Hosted by: Stanford Hui O Nā Moku</Text>
            <Text style={styles.smallText}>Oct. 30 | 6:30PM - 8:30PM</Text>
            <Text style={styles.smallText}>Native American Culture Center</Text>
            <Text></Text>
            <Text style={styles.description}>Stanford Hui O Nā Moku is excited to welcome Lanakila Mangauil 
            to the Stanford Native American Cultural Center on October 30th from 6:30-8:30PM. </Text>
            <Text></Text>
            <Text style={styles.description}>Lanakila will be teaching a workshop that will offer knowledge 
            on indigenous scientific perspectives through oral history and cultural knowledge-based future 
            planning. This is a once in a lifetime opportunity and we would love to have as many people join 
            us as possible!</Text>
            <View style={styles.bottombuttons}>
              <Button
                title="Interested"
                onPress={() => Alert.alert('You are interested in this event!')}
              />
              <Button
                title="Start a Rally"
                onPress={() => Alert.alert('Start a Rally!')}
              />
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foreground: {
    height: 700, 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 10,
  },
  map: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  info: {
    flex: 2.5,
  },
  eventImage: {
    width: Metrics.screenWidth,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
});
