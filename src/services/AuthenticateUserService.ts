import { getRepository } from "typeorm";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/User";

interface RequestDTO {
  email: string;
  password: string;
}
class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Incorrect email/password combination");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password combination");
    }

    const token = sign({}, "kasij1uh321ujo23i21h3u21h", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
