// data.ts (or dataByYear.ts)
export const dataByYear: { [year: string]: string } = {
  "default": "A man, who lived for others, Padma Vibhushan Late Purno Agitok Sangma had worn many caps during his four decade long political career as Cabinet Minister, Chief Minister and Speaker of the Lok Sabha. He always stood up for the minorities and raised concern for their welfare. Hailing from a small village in the Garo Hills in Meghalaya, Late Sangma ji had championed the cause of not only the constituency he represented in the Parliament but for the entire nation. He had continuously engaged in guiding young Parliamentarians on the need for a quality debate and motivated them to dedicate themselves for the cause of building a resurgent India.",
  "2013": "foo",
  "2014": "bla",
  "2016": "bar",
  "2018": "baz",
  "2019": "baz",
  "2023": "baz",
  "2024": "baz",
};

// Function to get data by year
export const getDataByYear = (year: string): string | undefined => {
  return dataByYear[year];
};
