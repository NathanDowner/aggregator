export function stripHttp(url: string): string {
  return url.replace('https://', '').replace('http://', '');
}

export function compareFeedUrls(url1: string, url2: string) {
  return stripHttp(url1) === stripHttp(url2);
}
