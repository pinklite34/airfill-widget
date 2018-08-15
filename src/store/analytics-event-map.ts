// import { EventTypes } from 'redux-segment';

// import { getPlatform, getSource, isMobileApp } from '../lib/globals';
// import { selectIsUnregistered } from '../reducers/authentication';
// import { selectOrder } from './order';

// function getApp() {
//   return process.env.APP;
// }

// const eventTypeForOrderStatus = status => {
//   switch (status) {
//     case 'paid':
//       return 'Refill Payment Detected';
//     case 'confirmed':
//       return 'Refill Payment Confirmed';
//     case 'partial':
//       return 'Refill Partial Payment';
//     case 'expired':
//       return 'Refill Payment Expired';
//     case 'failed':
//       return 'Refill Delivery Error';
//     case 'delivered':
//       return 'Refill Delivered';
//     case 'balance-too-low':
//       return 'Refill Payment Failed';
//     default:
//       return 'Refill Unknown Status: ' + status;
//   }
// };

// const eventPropertiesForOrder = order => {
//   try {
//     const { id, eurPrice, paymentMethod, operator, itemDesc } = order;
//     return {
//       ...order,
//       order_id: id,
//       affiliation: getApp() || 'bitrefill',
//       value: eurPrice,
//       revenue: eurPrice,
//       label: paymentMethod,
//       currency: 'EUR',
//       products: [
//         {
//           product_id: operator,
//           sku: operator,
//           name: itemDesc,
//           price: eurPrice,
//           quantity: 1,
//           category: order.operatorType,
//         },
//       ],
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };

// function getCategory({ platform, source, app, isUnregistered }) {
//   return isMobileApp() ? platform : isUnregistered ? 'website' : app;
// }

// function createEvent(state, eventType, payload = { properties: {} }) {
//   const source = getSource();
//   const platform = getPlatform();
//   const app = getApp();
//   const isUnregistered = selectIsUnregistered(state);

//   const additionalKey = payload.traits ? 'traits' : 'properties';
//   const additionalProps = {
//     category: getCategory({ platform, source, app, isUnregistered }),
//     user_source: source,
//     user_source_platform: platform,
//     is_unregistered: isUnregistered,
//   };

//   return {
//     eventType,
//     eventPayload: {
//       ...payload,
//       [additionalKey]: {
//         ...additionalProps,
//         ...payload[additionalKey],
//       },
//     },
//   };
// }

// export default {
//   mapper: {
//     SET_AMOUNT: (getState, { payload }) => {
//       return payload
//         ? createEvent(getState(), EventTypes.track, {
//             event: 'Refill Package Selected',
//             properties: {
//               amount: payload,
//             },
//           })
//         : null;
//     },

//     LOAD_NUMBERLOOKUP: (getState, action) => {
//       return createEvent(getState(), EventTypes.track, {
//         event: 'Refill Number Lookup',
//         properties: action.payload.query,
//       });
//     },

//     LOAD_ORDER: (getState, action) => {
//       return createEvent(getState(), EventTypes.track, {
//         event: 'Refill Order Loaded',
//         properties: action.payload.body,
//       });
//     },

//     LOAD_ORDER_SUCCESS: (getState, action) => {
//       const properties = eventPropertiesForOrder(action.payload);
//       return (
//         properties &&
//         createEvent(getState(), EventTypes.track, {
//           event: 'Checkout Started',
//           properties,
//         })
//       );
//     },

//     UPDATE_PAYMENT_STATUS: (getState, { payload }) => {
//       const { status, data } = payload;
//       const isComplete = status === 'confirmed' && typeof data !== 'undefined';
//       const state = getState();

//       return [
//         createEvent(state, EventTypes.track, {
//           event: eventTypeForOrderStatus(status),
//           properties: payload,
//         }),
//         isComplete
//           ? createEvent(state, EventTypes.track, {
//               event: 'Order Completed',
//               properties: eventPropertiesForOrder(selectOrder(state).result),
//             })
//           : null,
//       ].filter(Boolean);
//     },

//     LOGIN_USER_SUCCESS: (getState, { payload }) => {
//       const { email } = payload.user;
//       const state = getState();
//       const isUnregistered = selectIsUnregistered(state);

//       return isUnregistered
//         ? null
//         : [
//             createEvent(state, EventTypes.identify, {
//               userId: email,
//               traits: {
//                 email,
//                 hasAccount: !isUnregistered,
//               },
//             }),
//             createEvent(state, EventTypes.track, {
//               event: 'Login Success',
//             }),
//           ];
//     },

//     LOGIN_USER_FAILURE: getState => {
//       return createEvent(getState(), EventTypes.track, {
//         event: 'Login Error',
//       });
//     },

//     REGISTER_USER_SUCCESS: (getState, action) => {
//       const state = getState();
//       return [
//         createEvent(state, EventTypes.identify, {
//           userId: action.payload.user.email,
//           traits: {
//             email: action.payload.user.email,
//             hasAccount: true,
//           },
//         }),
//         createEvent(state, EventTypes.track, {
//           event: 'Sign up Success',
//         }),
//       ];
//     },

//     REGISTER_USER_FAILURE: (getState, action) => {
//       return createEvent(getState(), EventTypes.track, {
//         event: 'Sign up Error',
//         properties: {
//           error: action.payload.message,
//         },
//       });
//     },

//     LOGOUT_USER: getState => {
//       const state = getState();
//       return [
//         createEvent(state, EventTypes.reset),
//         createEvent(state, EventTypes.track, {
//           event: 'Signed out',
//         }),
//       ];
//     },

//     TOKEN_TIMEOUT: getState => {
//       const state = getState();
//       return [
//         createEvent(state, EventTypes.reset),
//         createEvent(state, EventTypes.track, {
//           event: 'Session Expired',
//         }),
//       ];
//     },
//   },
// };
