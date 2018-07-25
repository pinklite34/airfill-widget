export default text => {
  const element = document.createElement('textarea');
  element.textContent = text;
  document.body.appendChild(element);
  element.select();

  try {
    document.execCommand('copy');
  } catch (e) {}

  document.body.removeChild(element);
  window.alert('Copied to clipboard!');
};
