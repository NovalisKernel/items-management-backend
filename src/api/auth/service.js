import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';
import { User } from '../../models';

const loginUser = async (email, password) => {
  const { jwtSecret, jwtTimeToLive } = config.auth;
  const user = await User.findOne({ where: { email }, raw: true, nest: true });
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Неверный пароль');
  }

  const token = jwt.sign(
    {
      userName: user.username,
      id: user.id
    },
    jwtSecret,
    { expiresIn: jwtTimeToLive }
  );
  const resObj = {
    token,
    username: user.username,
    email: user.email
  };
  return resObj;
};

const regUser = async (email, password, username) => {
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    throw new Error('Пользователь уже существует');
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashPassword, username });
  await user.save();
  return user;
};

export { loginUser, regUser };
