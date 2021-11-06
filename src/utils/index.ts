export function stripHttp(url: string): string {
  return url.replace('https://', '').replace('http://', '');
}
