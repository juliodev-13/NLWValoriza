import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"
import { Subject } from "typeorm/persistence/Subject"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService{
  async execute({email, password} : IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    });
    if(!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch = await compare (password, user.password)
    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }
    const token = sign({
      email: user.email
    },"1e1612481c5f48936a1d0232317c344d", {
       subject : user.id,
       expiresIn: "1d"
    } 
  );
  return token;

  }
}

export { AuthenticateUserService }