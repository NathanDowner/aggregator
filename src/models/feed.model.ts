export interface Feed {
  name: string;
  sources: Source[];
}

export interface Source {
  name: string;
  link: string;
}

export interface Article {
  categories: string[];
  content: string;
  'content:encoded': string;
  contentSnippet: string;
  'content:encodedSnippet': string;
  creator: string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}

export interface FeedImage {
  height: string;
  link: string;
  title: string;
  url: string;
  width: string;
}

export interface RSSBase {
  description: string;
  fedUrl: string;
  generator: string;
  image: FeedImage;
  items: Article[];
  language: string;
  lastBuildDate: string;
  link: string;
  paginationLinks: { self: string };
  title: string;
}
