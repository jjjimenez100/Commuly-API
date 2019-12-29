const {
  createLogger,
  format,
  transports,
} = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.label({
      label: path.basename(process.mainModule.filename),
    }),
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss',
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = logger;
