export interface Country {
  iso_code?: string;
  data: Data[];
}

export interface Data {
  year: number;
  population?: number;
  cement_co2: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2: number;
}

export interface CountriesData {
  [index: string]: Country;
}
