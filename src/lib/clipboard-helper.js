export default text => {
  const element = document.createElement('textarea');
  element.style = 'display: none;';
  element.textContent = text;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};
