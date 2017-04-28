import { Component } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';

const pusherClient = new Pusher('0837b617cfe786c32a91', {
  encrypted: true
});

export default class PusherSubscription extends Component {
  constructor(props) {
    super(props);
    this.bindPusherEvents(props.channel, props.events);
  }

  componentWillReceiveProps({ channel: newChannel, events: newEvents }) {
    const { channel, events } = this.props;
    if (channel === newChannel && events === newEvents) {
      return;
    }

    this.unbindPusherEvents(channel);
    this.bindPusherEvents(newChannel, newEvents);
  }

  componentWillUnmount() {
    this.unbindPusherEvents(this.props.channel);
  }

  unbindPusherEvents(channel) {
    this.channelInstance.unbind();
    pusherClient.unsubscribe(channel);
  }

  bindPusherEvents(channel, events) {
    this.channelInstance = pusherClient.subscribe(channel);

    events.forEach(event =>
      this.channelInstance.bind(event, payload =>
        this.props.onUpdate(event, payload))
    );
  }

  render() {
    return null;
  }
}

PusherSubscription.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};
