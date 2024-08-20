import { Adapter, Low, Memory } from "lowdb";
import { createDefaultData, Database } from "./schema";
import { JSONFile } from "lowdb/node";
import fs from "node:fs";

const isTest = "test";
const dirname = "/mock/path";
const cliPathIndex = dirname.indexOf("/apps/cli");
const webPathIndex = dirname.indexOf("/apps/web");

if (cliPathIndex === -1 && webPathIndex === -1 && !isTest) {
  throw new Error("DB path not found");
}

const rootIndex = cliPathIndex > 0 ? cliPathIndex : webPathIndex;
const basePath = dirname.slice(0, rootIndex);
const dbFilePath = `${basePath}/db.json`;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "test" | "dev" | "prod";
    }
  }
}

const adapter: Adapter<Database> = isTest
  ? new Memory<Database>()
  : new JSONFile<Database>(dbFilePath);
const db = new Low<Database>(adapter, createDefaultData());
const dbFileExists = fs.existsSync(dbFilePath);

const createDb = async () => {
  await db.write();
};

const resetDb = async () => {
  const newDb = new Low<Database>(adapter, createDefaultData());
  await newDb.write();
};

export { adapter, db, dbFileExists, createDb, resetDb };
