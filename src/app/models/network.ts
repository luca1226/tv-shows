export interface Network {
    id: number;
    name: string;
    country: Country;
  }

export interface Country {
    name: string;
    code: string;
    timezone: string;
  }