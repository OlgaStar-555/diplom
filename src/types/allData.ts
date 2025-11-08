export interface MovieFilm  {
  film_description: string;
  film_duration: number;
  film_name: string;
  film_origin: string;
  film_poster: string;
  id: number;
};

export interface MovieHall {
  hall_config: Array<Array<string>>;
  hall_name: string;
  hall_open: number;
  hall_places: number;
  hall_price_standart: number;
  hall_price_vip: number;
  hall_rows: number;
  id: number;
};

export interface MovieSeance {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
};

export interface AllData {
  films?: MovieFilm[];
  halls?: MovieHall[];
  seances?: MovieSeance[];
};