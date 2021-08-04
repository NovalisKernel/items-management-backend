import { loginUser, regUser } from './service';

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resObj = await loginUser(email, password);
    res.status(200).json(resObj);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const regController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log('BODY', req.body);
    const newUser = await regUser(email, password, username);
    res.status(200).json({
      message: 'Success'
    });
  } catch (e) {
    console.log('ERROR', e);
    res.status(500).json({ message: e.message || 'Something went wrong' });
  }
};

export { loginController, regController };
