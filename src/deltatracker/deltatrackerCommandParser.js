const parser = (async message => {
  var messageSanitized = message.content.toLowerCase();
  return messageSanitized.replace(`${prefix}delta `, '');
});

module.exports = parser;
