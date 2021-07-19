import * as development from "./development";
import * as production from "./production";
import * as testing from "./testing";
import * as staging from "./staging";
import {BaseModel} from "../../model/BaseModel";

const envs : BaseModel = {
  development,
  testing,
  staging,
  production
};

export default envs;