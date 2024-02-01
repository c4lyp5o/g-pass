import { createRouter } from 'next-connect';
import log4js from 'log4js';
import crypt from 'simple-crypto-js';

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

// const crypter = new crypt(process.env.SALT);
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
//   .post((req, res, next) => {
//     const { apikey } = req.header;
//     if (crypter.decrypt(apikey) === process.env.API_KEY) {
//       next();
//     } else {
//       logger.error('Invalid API key from ' + req.headers['x-forwarded-for']);
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   });

export { conf, logger };
