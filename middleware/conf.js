import { createRouter } from 'next-connect';
import log4js from 'log4js';

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/server.log',
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} %p %c - %m',
      },
    },
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} %p %c - %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['file', 'console'],
      level: 'debug',
    },
  },
});

const logger = log4js.getLogger('server');

const conf = createRouter()
  .use((req, res, next) => {
    logger.info('Request received');
    next();
  })
  .use((req, res, next) => {
    if (req.method === 'GET') {
      logger.info(
        'GET request received from ' + req.headers['x-forwarded-for']
      );
      next();
    } else {
      logger.info(
        'POST request received from ' + req.headers['x-forwarded-for']
      );
      next();
    }
  });

export { conf, logger };
