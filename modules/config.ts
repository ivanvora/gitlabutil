import { Config } from "./models";
import fs from "node:fs";
import { input } from "@inquirer/prompts";
import chalk from "chalk";

const FILE_PATH = "./config.json";

export async function initConfig() {
  let m = await checkConfigExists();
  if (!m) {
    await createConfigFile();
  }
  return await getConfig();
}

async function checkConfigExists() {
  return fs.existsSync(FILE_PATH);
}

async function createConfigFile() {
  let config: Config = new Config();

  for await (const k of Object.keys(config)) {
    config[k as keyof Config] = await readConfigKeyFromConsole(
      k as keyof Config
    );
  }

  writeConfig(config);
}

async function getConfig(): Promise<Config> {
  let config: Config = new Config();

  for (const k of Object.keys(config)) {
    config[k as keyof Config] = await readConfigKey(k as keyof Config);
  }

  return config;
}

async function writeConfig(c: Config) {
  fs.writeFile(FILE_PATH, JSON.stringify(c), (e) => {
    if (e) console.log(chalk.redBright("Error"), chalk.red(e));
  });
}

async function readConfigKey(k: keyof Config): Promise<string> {
  let e = process.env[k.toUpperCase()];
  if (e) return Promise.resolve(e);

  const configFromFile = await readConfigFromFile();
  e = configFromFile[k];
  if (e) return Promise.resolve(e);

  e = await readConfigKeyFromConsole(k);
  return e;
}

function readConfigFromFile(): Promise<Config> {
  return new Promise((resolve, reject) => {
    let c: Config;
    fs.readFile(FILE_PATH, "utf8", (e, data) => {
      if (e) {
        reject(e);
      } else c = JSON.parse(data);
      resolve(c);
    });
  });
}

async function readConfigKeyFromConsole(k: keyof Config): Promise<string> {
  return input({ message: `Enter ${k}` });
}
