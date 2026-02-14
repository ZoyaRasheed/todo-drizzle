import { logger } from '../../../shared/index.js';

export const exampleService = async (data) => {
  try {
    logger.info('Example service called', { data });

    // TODO: Add your business logic and database calls here
    const result = data;

    return result;
  } catch (error) {
    logger.error('Example service failed', {
      error: error.message,
      data
    });
    throw error;
  }
};
