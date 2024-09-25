import { Redis } from "ioredis";
import configs from "./configs";


const redis = new Redis(configs.redis.uri!)


export default redis