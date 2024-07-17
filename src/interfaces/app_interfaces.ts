export interface Author {
  id?: number;
  name: string;
}

export interface Post {
  userId?: number;
  id?: number;
  title: string;
  body: string;
  name?: string;
}
