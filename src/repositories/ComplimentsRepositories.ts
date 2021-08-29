import { EntityRepository, Repository } from "typeorm";
import { compliment } from "../entities/Compliments";

@EntityRepository(compliment)
class ComplimentsRepositories extends Repository<compliment> {}

export { ComplimentsRepositories }