import PhoneIcon from '../assets/phone.svg';
import EmailIcon from '../assets/email.svg';

export function getRecipientIcon(operator) {
  switch (operator.recipientType) {
    case 'phone_number':
      return PhoneIcon;
    case 'email':
    default:
      return EmailIcon;
  }
}
