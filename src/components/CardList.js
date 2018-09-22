import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Card from './Card';

export default class CardList extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: null,
      spinValue: new Animated.Value(0)
    };
  }

  selectCard = (selected) => {
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 90,
        duration: 1000
      }
    ).start(() => {
      this.setState({ selected });
      Animated.timing(
        this.state.spinValue,
        {
          toValue: selected ? 180 : 0,
          duration: 1000
        }
      ).start();
    });
  }

  render() {
    const values = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', 'Coffee'];
    const allCards = values.map(val => (
      <Card
        value={val}
        key={val}
        onPress={() => this.selectCard(val)}
      />
    ));
    const { selected } = this.state;
    const interpolateValue = {
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    };
    const spin = this.state.spinValue.interpolate(interpolateValue);
    return (
      <Animated.ScrollView
        contentContainerStyle={[styles.container, selected !== null ? styles.selectedCard : {}]}
        style={{ height: '100%', width: '100%', transform: [{ rotateY: spin }]}}
      >
        <View style={[styles.container, { display: selected === null ? 'flex' : 'none'}]}>
          {allCards}
        </View>
        {selected ?
          <Card
            value={selected}
            onPress={() => this.selectCard(null)}
            fullScreen
            isHidden
          /> :
          null
        }
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  selectedCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
});
