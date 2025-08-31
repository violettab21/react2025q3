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

export interface CustomCountry {
  country: string;
  year: number | null;
  iso_code: string | null;
  countryYearData: { [index: string]: number | null };
}
