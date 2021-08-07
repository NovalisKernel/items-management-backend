import { addItem, getItems, deleteItem, getItemById, updateItem } from './service';

const addItemController = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await addItem(req.body, id, req.file);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateItemController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const response = await updateItem(req.body, userId, req.file, id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getItemsController = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await getItems(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getItemById(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteItem(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export {
  addItemController,
  getItemsController,
  deleteItemController,
  getItemByIdController,
  updateItemController
};
