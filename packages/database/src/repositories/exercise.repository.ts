import { getRepository } from "fireorm";
import { Exercise } from "../models/exercise.model.ts";

export const exerciseRepository = getRepository(Exercise);