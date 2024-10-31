import axios, { AxiosInstance } from "axios";
import { TConfig, TRelease } from "./models";
import { endpoints } from "./endpoints";

export class Client {
  constructor(c: TConfig) {
    this.instance = axios.create({
      baseURL: c.gitlab_host,
      headers: {
        "PRIVATE-TOKEN": c.key,
      },
    });
    this.project = c.project_url.replace(/\//g, "%2F");
  }
  private instance: AxiosInstance;
  private project: string;

  getReleases() {
    return this.instance.get<TRelease[]>(endpoints.getReleases(this.project));
  }
}
