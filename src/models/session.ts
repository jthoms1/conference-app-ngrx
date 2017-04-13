export interface Session {
  id: string;
  date: string;
  timeStart: string;
  timeEnd: string
  name: string;
  location: string;
  description: string;
  speakerNames: string[];
  tracks: string[];
}
