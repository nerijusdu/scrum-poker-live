import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import CardList from './src/components/CardList';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
