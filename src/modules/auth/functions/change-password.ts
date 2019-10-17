import { User } from "../../../entity/User";
import { ForbiddenError } from "apollo-server";

import {
  minLengthEmail,
  maxLengthEmail,
  invalidEmail,
  minLengthPassword,
  failedToChangePassword
} from "../../../utils/messages";

import { formatYupError } from "../../../utils/format-yup-error";

import * as bcrypt from "bcryptjs";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(5, minLengthEmail)
    .max(255, maxLengthEmail)
    .email(invalidEmail),
  password: yup
    .string()
    .min(5, minLengthPassword)
    .max(255),
  newPassword: yup
    .string()
    .min(5, minLengthPassword)
    .max(255)
});

export const changePassword = async ({
  email,
  password,
  newPassword
}: GQL.IChangePasswordOnMutationArguments) => {
  try {
    await schema.validate(
      { email, password, newPassword },
      { abortEarly: false }
    );
  } catch (err) {
    formatYupError(err);
  }

  const user = await User.findOne({
    where: { email }
  });

  // verifica se o usuario existe
  if (!user) throw new ForbiddenError(invalidEmail);

  // Compara as senhas
  if (!(await bcrypt.compare(password, user.password)))
    throw new ForbiddenError(failedToChangePassword);

  // Encrypta a nova senha e altera a senha antiga
  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return true;
};
