import React from 'react';
import {StyleSheet, View, ScrollView, Modal, Text} from 'react-native';
import Card from './Card';

export default class CardListModal extends React.Component {
  render() {
    const values = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'/*, 'Coffee'*/];
    const allCards = values.map(val => (
      <Card
        value={val}
        key={val}
        onPress={() => this.props.onSelectCard(val)}
      />
    ));

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            style={{ height: '100%', width: '100%'}}
          >
            <View style={styles.title}>
              <Text style={styles.titleText}>Select a card:</Text>
            </View>
            <View style={styles.container}>
              {allCards}
            </View>
          </ScrollView>
        </Modal>
      </View>
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
    padding: 10,
    justifyContent: 'space-evenly'
  },
  title: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
