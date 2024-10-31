import { TRelease } from "./models";

type TBuilderTypes = "changelog";

type TBuilder = {
  createDocument: (data: any) => string;
};

export function Fabric(type: TBuilderTypes) {
  const builders: { [k in TBuilderTypes]: TBuilder } = {
    changelog: new Changelog(),
  };
  return builders[type];
}

class Changelog implements TBuilder {
  constructor() {}

  versionChecker(tagname: string, tagnamePrevios?: string) {
    const getVersion = (t: string) => {
      const v = t.replace(/[a-zA-Z]/g, "");
      const [major, minor, patch] = v.split(".");
      return { major, minor, patch };
    };
    const current = getVersion(tagname);
    if (tagnamePrevios) {
      const previos = getVersion(tagnamePrevios);

      if (current.major > previos.major) return "New Version";
      if (current.minor > previos.minor) return "Feature";
      if (current.patch > previos.patch) return "Fix";
    }
    return "Description";
  }

  createDocument(data: TRelease[]) {
    if (Array.isArray(data)) {
      const releases = data.map((v, i, a) => {
        const { tag_name, created_at, author, description } = v;

        const d =
          i + 1 < a.length
            ? this.versionChecker(tag_name, a[i + 1].tag_name)
            : "Description";

        let header = `## ${tag_name} (${created_at.substring(0, 10)})\n`;
        let desc = `### ${d}\n ${description}\n\n`;
        let auth = `> Author:  [${author.username}](${author.web_url})\n`;
        return `${header} ${desc} ${auth}`;
      });

      return releases.join("");
    }
    return "";
  }
}
