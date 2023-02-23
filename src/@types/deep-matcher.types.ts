export type MatchResult =
  | {
      key: string;
      diff: object | string | number | object[] | string[] | number[] | MatchResult[] | null | undefined;
    }
  | undefined;
