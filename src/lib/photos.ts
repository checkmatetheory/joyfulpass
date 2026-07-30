// Brand "film" photos (shot on Instax-style instant film) used to give the
// site a warmer, more human personality. Hosted remotely for now; move to a
// CDN later by swapping these URLs in one place.
export type FilmPhoto = { src: string; alt: string };

export const FILM_PHOTOS = {
  one: {
    src: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1QSMeIb79oNABjrk7uT3qcHRwtGP0zEXxbleK",
    alt: "The people behind Joyful",
  },
  two: {
    src: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1yLR64rsXwEBiOhuc0T7Nqn2QPr3xDg1Z9paH",
    alt: "A moment from building Joyful",
  },
  three: {
    src: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1QwWTsv9oNABjrk7uT3qcHRwtGP0zEXxbleKm",
    alt: "Behind the scenes at Joyful",
  },
  four: {
    src: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1EyG9xN5CJjQwsV28Kp1l4qIZWuxH6iTkzGhr",
    alt: "The Joyful team at work",
  },
} as const satisfies Record<string, FilmPhoto>;
