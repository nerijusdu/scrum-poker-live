import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, Animated} from 'react-native';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: !!props.isHidden
    };
  }

  render() {
    const { fullScreen, value, onPress } = this.props;
    const rotateY = fullScreen ? '180deg' : '0deg';
    return (
      <TouchableNativeFeedback
        onPress={() => this.state.isHidden ? this.setState({ isHidden: false }) : onPress()}
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
            {this.state.isHidden ? null : value}
          </Text>
        </Animated.View>
      </TouchableNativeFeedback>
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
