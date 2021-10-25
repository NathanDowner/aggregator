export interface Feed {
  id?: number;
  name: string;
  sources: Source[];
}

export interface Source {
  name: string;
  link: string;
}

export type SourceFilter = {
  source: Source;
  rssFeedTitle?: string;
  isEnabled: boolean;
};

export interface FeedArticle {
  categories?: string[];
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
  title: string;
  description: string;
  link: string;
  items: FeedArticle[];
  feedUrl?: string;
  generator?: string;
  image?: FeedImage;
  language?: string;
  lastBuildDate?: string;
  paginationLinks?: { self: string };
}
