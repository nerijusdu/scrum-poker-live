import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
import * as appActions from '../store/actions/AppActions';
import showIf from '../helpers/showIf';
import { MessageType, MessageTimeout } from '../constants';

class Message extends React.Component {
  componentWillUpdate(nextProps) {
    if (!this.props.message.text && nextProps.message.text) {
      setTimeout(this.hideMessage, MessageTimeout);
    }
  }

  hideMessage = () => {
    clearTimeout();
    this.props.showMessage(null);
  }

  render() {
    const { type, text } = this.props.message;
    const backgroundColor = type === MessageType.Error
      ? '#d50000'
      : '#00a152';
    return (
      <View style={[style.container, showIf(text)]}>
        <TouchableNativeFeedback
          onPress={this.hideMessage}
        >
          <View style={[style.innerContainer, { backgroundColor }]}>
            <Text style={style.text}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    borderRadius: 5
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({
  message: state.app.message
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
