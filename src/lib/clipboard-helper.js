export default text => {
  const element = document.createElement('textarea');
  element.style = 'display: none;';
  element.textContent = text;
  document.body.appendChild(element);
  element.select();

  try {
    document.execCommand('copy');
  } catch (e) {}

  document.body.removeChild(element);
};
