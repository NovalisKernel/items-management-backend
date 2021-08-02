import app from './app';

import config from './config/environment';
import logger from './config/logger';

const {
  app: { port }
} = config;

app.listen(process.env.PORT || port, () => {
  logger.info(`Server running on port ${port}`);
});
