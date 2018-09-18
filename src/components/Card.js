import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.card, this.props.fullScreen ? styles.fullScreen : styles.small]}
        onPress={this.props.onPress}
        >
        <Text style={{ color: '#FFFFFF'}}>
          {this.props.value}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C2185B',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  fullScreen: {
    width: 300,
    height: 300,
  },
  small: {
    width: 100,
    height: 100
  }
});
