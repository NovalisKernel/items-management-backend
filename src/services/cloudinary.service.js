import cloudinary from 'cloudinary';
import config from '../config/environment';

const { cloudinaryEnv } = config;

const cloudinaryInstance = () => {
  cloudinary.config({
    cloud_name: cloudinaryEnv.cloudinaryCloudName,
    api_key: cloudinaryEnv.cloudinaryApiKey,
    api_secret: cloudinaryEnv.cloudinaryApiSecret,
    secure: true
  });
  return cloudinary;
};

export default cloudinaryInstance;
