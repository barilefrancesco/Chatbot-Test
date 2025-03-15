export type Ask = {  
  query: string;
};

export type Answer = {
  query: string;
  answer: string;
};

export type FactCheck = {
  documents: Document[];
}

export type Document = {
    title: string;
    content: string;
}