export type TestCenter = {
  name: string;
  city: string;
  region: string;
  address: string;
  notes?: string;
};

// Sample directory data. In production this would be sourced from the
// official test provider's location feed, keyed by app slug.
const testCenters: Record<string, TestCenter[]> = {
  britpass: [
    {
      name: "Learndirect Test Centre",
      city: "London",
      region: "Greater London",
      address: "1 Kemble Street, London WC2B 4AN",
      notes: "Wheelchair accessible. Book at least 3 days in advance.",
    },
    {
      name: "PSI Test Centre Manchester",
      city: "Manchester",
      region: "Greater Manchester",
      address: "82 King Street, Manchester M2 4WQ",
    },
    {
      name: "PSI Test Centre Birmingham",
      city: "Birmingham",
      region: "West Midlands",
      address: "17 Waterloo Street, Birmingham B2 5TB",
    },
    {
      name: "PSI Test Centre Edinburgh",
      city: "Edinburgh",
      region: "Scotland",
      address: "58 Constitution Street, Edinburgh EH6 6RS",
    },
    {
      name: "PSI Test Centre Cardiff",
      city: "Cardiff",
      region: "Wales",
      address: "6 Cathedral Road, Cardiff CF11 9LJ",
    },
    {
      name: "PSI Test Centre Belfast",
      city: "Belfast",
      region: "Northern Ireland",
      address: "26 Wellington Place, Belfast BT1 6GE",
    },
  ],
  canadapass: [
    {
      name: "IRCC Case Processing Centre",
      city: "Toronto",
      region: "Ontario",
      address: "6900 Airport Road, Mississauga, ON L4V 1E8",
      notes: "Testing location assigned by IRCC in your notice to appear.",
    },
    {
      name: "IRCC Local Office",
      city: "Vancouver",
      region: "British Columbia",
      address: "300 West Georgia Street, Vancouver, BC V6B 6C9",
    },
    {
      name: "IRCC Local Office",
      city: "Calgary",
      region: "Alberta",
      address: "220 4 Avenue SE, Calgary, AB T2G 4X3",
    },
    {
      name: "IRCC Local Office",
      city: "Montreal",
      region: "Quebec",
      address: "1010 Rue Saint-Antoine, Montreal, QC H3C 5N3",
    },
    {
      name: "IRCC Local Office",
      city: "Halifax",
      region: "Nova Scotia",
      address: "1801 Hollis Street, Halifax, NS B3J 3N4",
    },
  ],
};

export function getTestCenters(appSlug: string): TestCenter[] {
  return testCenters[appSlug] ?? [];
}
