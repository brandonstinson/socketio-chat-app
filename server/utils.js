const formatMessage = (name, text) => {
  return {
    name,
    text,
    time: Date.now(),
  }
}

module.exports = formatMessage;
