import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Card from './Card';

export default class CardList extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: null
    };
  }

  render() {
    const values = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', 'Coffee'];
    const allCards = values.map(val => (
      <Card
        value={val}
        key={val}
        onPress={() => this.setState({ selected: val })}
      />
    ));
    return (
      <ScrollView
        contentContainerStyle={[styles.container, this.state.selected !== null ? styles.selectedCard : {}]}
        style={{ height: '100%', width: '100%'}}
      >
        {this.state.selected === null ?
          allCards :
          <Card
            value={this.state.selected}
            onPress={() => this.setState({ selected: null })}
            fullScreen
          />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF'
  },
  selectedCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
});
