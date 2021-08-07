import { Item } from '../../models';

import cloudinaryInstance from '../../services/cloudinary.service';
import { dataUri } from '../../middleware/upload.middleware';

const addItem = async (data, userId, file) => {
  let imageUrl = '';
  const { name } = data;
  const existed = await Item.findOne({ where: { name, ownerId: userId }, raw: true });
  if (existed) {
    throw new Error(`Item with ${name} already exists`);
  }
  if (file) {
    const fileUri = dataUri(file).content;
    const uploadedImage = await cloudinaryInstance().v2.uploader.upload(fileUri);
    imageUrl = uploadedImage.url;
  }
  const created = await Item.create({
    ...data,
    ownerId: userId,
    imageUrl: imageUrl
  });
  return created;
};

const updateItem = async (data, userId, file, itemId) => {
  let imageUrl = '';
  if (file) {
    const fileUri = dataUri(file).content;
    const uploadedImage = await cloudinaryInstance().v2.uploader.upload(fileUri);
    imageUrl = uploadedImage.url;
  }
  const created = await Item.update(
    { id: itemId },
    {
      ...data,
      ownerId: userId,
      imageUrl: imageUrl
    }
  );
  return created;
};

const getItems = async userId => {
  const response = await Item.findAll({ where: { ownerId: userId } });
  return response;
};

const getItemById = async id => {
  const response = await Item.findOne({ where: { id } });
  return response;
};

const deleteItem = async id => {
  await Item.destroy({ where: { id } });
  return id;
};

export { addItem, getItems, deleteItem, getItemById, updateItem };
