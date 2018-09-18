import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFFFFF'}}>{this.props.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C2185B',
    width: 100,
    height: 100,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  }
});
