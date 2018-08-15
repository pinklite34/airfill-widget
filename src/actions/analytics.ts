import { EventTypes } from 'redux-segment';

export const trackEvent = (event, payload) => ({
  type: 'SEGMENT_TRACK',
  payload: {},
  meta: {
    analytics: {
      eventType: EventTypes.track,
      eventPayload: {
        event,
        properties: payload,
      },
    },
  },
});
