declare global {
  interface Attachment {
    name: string;
    url: string;
    contentType: string;
  }

  interface PaginatedOptions {
    page?: number;
    pageSize?: number;
  }
  interface PaginatedResults {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }
}

export {};
