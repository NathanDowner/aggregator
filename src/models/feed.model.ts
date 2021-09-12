export interface Feed {
  name: string;
  sources: Source[];
}

export interface Source {
  name: string;
  link: string;
}
