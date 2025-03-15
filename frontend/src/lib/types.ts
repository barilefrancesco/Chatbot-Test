export type Ask = {  
  query: string;
};

export type Answer = {
  response: string;
};

export type FactCheck = {
  documents: Document[];
}

export type Document = {
    title: string;
    content: string;
}