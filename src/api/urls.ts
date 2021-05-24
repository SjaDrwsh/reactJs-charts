export function getBaseUrl(): string {
  return 'https://api.corona-zahlen.org';
}

export function getDistrictsURL(): string {
  return `/districts`;
}

export function getGermanURL(): string {
  return `/germany`;
}

export function getVaccinationURL(): string {
  return `/vaccinations`;
}

export function getGermanHistoryURL(type: string, days?: string): string {
  return days ? `/germany/history/${type}/${days}` : `/germany/history/${type}`;
}
