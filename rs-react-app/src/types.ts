export interface Country {
  iso_code?: string;
  data: Data[];
}

export interface Data {
  [index: string]: number;
}

export interface CountriesData {
  [index: string]: Country;
}
