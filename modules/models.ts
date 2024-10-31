export type TConfig = {
  key: string;
  project_url: string;
  gitlab_host: string;
};

export class Config implements TConfig {
  constructor(v?: TConfig) {
    this.key = v?.key ?? "";
    this.project_url = v?.project_url ?? "";
    this.gitlab_host = v?.gitlab_host ?? "";
  }

  key: string;
  project_url: string;
  gitlab_host: string;
}

type TAuthor = {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
};

type TCommit = {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  trailers: {};
  extended_trailers: {};
  web_url: string;
};

type TSource = {
  format: string;
  url: string;
};

type TEvidance = {
  sha: string;
  filepath: string;
  collected_at: string;
};

export type TRelease = {
  name: string;
  tag_name: string;
  description: string;
  created_at: string;
  released_at: string;
  upcoming_release: boolean;
  author: TAuthor;
  commit: TCommit;
  commit_path: string;
  tag_path: string;
  assets: {
    count: number;
    sources: TSource[];
    links: [];
  };
  evidences: TEvidance[];
  _links: {
    closed_issues_url: string;
    closed_merge_requests_url: string;
    edit_url: string;
    merged_merge_requests_url: string;
    opened_issues_url: string;
    opened_merge_requests_url: string;
    self: string;
  };
};
