import dotenv from "dotenv";

const localEnv = "prod";
function getEnv() {
  dotenv.config({ path: `.env.${localEnv}` });
}

getEnv();
