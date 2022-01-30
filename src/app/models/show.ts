import { Externals } from "./externals";
import { Network } from "./network";
import { Rating } from "./rating";
import { Schedule } from "./schedule";
import { Image } from "./image";
import { Links } from "./links";

export interface Shows {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network;
    webChannel?: any;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: Links;
  }