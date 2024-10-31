import { initConfig } from "./modules/config";
import { Client } from "./modules/api";
import { Fabric } from "./modules/documents-fabric";
import { writefile } from "./modules/io";

async function start() {
  const config = await initConfig();
  const client = new Client(config);
  let x = await client.getReleases();
  console.log(x);
  const doc = Fabric("changelog").createDocument(x.data);

  writefile(doc, "./changelog.md");
}

start();
