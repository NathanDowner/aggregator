export type SortConfigDirection = 'ascending' | 'descending';

export type SortConfig = {
  key: string | number;
  direction: SortConfigDirection;
};
