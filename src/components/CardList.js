import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Card from './Card';

export default class CardList extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={{ height: '100%', width: '100%'}}
      >
        <Card value={0}/>
        <Card value={0.5}/>
        <Card value={1}/>
        <Card value={2}/>
        <Card value={3}/>
        <Card value={5}/>
        <Card value={8}/>
        <Card value={13}/>
        <Card value={20}/>
        <Card value={40}/>
        <Card value={100}/>
        <Card value={'?'}/>
        <Card value={'Coffee'}/>
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
  }
});
