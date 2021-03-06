import { getRepository } from "typeorm";
import path from "path";
import User from "../models/User";
import uploadConfig from "../config/upload";
import fs from "fs";
import AppError from "../errors/AppError";


interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user){
        throw new AppError("Only authenticated users can change avatar.", 401);
    }

    if (user.avatar){

        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

        const userAvatarFileExists  = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists){
            await fs.promises.unlink(userAvatarFilePath);
        }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}
