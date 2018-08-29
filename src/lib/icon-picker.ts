import { Operator } from '../types';

import EmailIcon from '../assets/email.svg';
import PhoneIcon from '../assets/phone.svg';

export function getRecipientIcon(operator: Operator) {
  switch (operator.recipientType) {
    case 'phone_number':
      return PhoneIcon;
    case 'email':
    default:
      return EmailIcon;
  }
}
