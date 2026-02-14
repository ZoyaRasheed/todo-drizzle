import { httpResponse, responseMessage, asyncHandler } from '../../../shared/index.js';
import config from '../../../config/index.js';

const healthCheck = asyncHandler(async (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      external: Math.round(process.memoryUsage().external / 1024 / 1024),
    },
  };

  return httpResponse(
    req,
    res,
    200,
    responseMessage.SUCCESS.HEALTH_CHECK,
    healthData
  );
});

const liveCheck = asyncHandler(async (req, res) => {
  return httpResponse(req, res, 200, responseMessage.SUCCESS.ALIVE, {
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export {
  healthCheck,
  liveCheck,
};
