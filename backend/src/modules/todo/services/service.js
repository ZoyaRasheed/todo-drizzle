import { logger } from '../../../../../src/shared/index.js';

export const exampleService = async (data) => {
  try {
    logger.info('Service called', { data });

    // TODO: Add your business logic and database calls here
    const result = data;

    return result;
  } catch (error) {
    logger.error('Service failed', {
      error: error.message,
      data
    });
    throw error;
  }
};
