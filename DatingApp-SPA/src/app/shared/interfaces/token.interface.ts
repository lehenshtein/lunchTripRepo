export interface IToken {
  unique_name: string;
  nameid: string | number;
  exp: number;
  iat: number;
  nbf: number;
}
