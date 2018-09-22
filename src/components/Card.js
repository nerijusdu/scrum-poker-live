import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fullScreen } = this.props;
    const rotateY = fullScreen ? '180deg' : '0deg';
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <Animated.View
          style={[styles.card, {
            width: fullScreen ? 300 : 100,
            height: fullScreen ? 300 : 100,
            transform: [{ rotateY }]
          }]}
        >
          <Text style={[styles.cardText, {
            fontSize: fullScreen ? 100 : 25
          }]}>
            {this.props.value}
          </Text>
        </Animated.View>
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
  cardText: {
    color: '#FFFFFF',
    fontWeight: '900',
    width: '100%',
    textAlign: 'center'
  }
});
