/**
 * Everything Maya's site says, and every photo, video, and song it uses.
 *
 * Photos live in  public/media/photos/
 * Videos live in  public/media/videos/
 * Music: drop a file at public/media/audio/atmosphere.mp3
 *        and the player will find it. Nothing plays until she presses it.
 */

export const music = {
  src: "/media/audio/atmosphere.mp3",
  label: "A little atmosphere",
};

export const chapters = [
  { id: "for-maya", label: "For Maya" },
  { id: "little-things", label: "The little things" },
  { id: "moment", label: "A moment" },
  { id: "deserve", label: "Things worth saying" },
  { id: "wish", label: "One wish" },
  { id: "photographs", label: "Photographs" },
  { id: "letter", label: "A letter" },
  { id: "last", label: "One last thing" },
] as const;

export const intro = {
  lineOne: "Some people become memories.",
  lineTwo: "Some memories become a part of us.",
  turn: "And then there's you, Maya.",
  title: "Happy Birthday.",
  enter: "Begin",
};

export const hero = {
  src: "/media/photos/maya-close.jpg",
  alt: "Maya, close, with a small smile",
  width: 1280,
  height: 960,
  objectPosition: "center 42%",
  kicker: "For Maya",
  salute: "Maya,",
  body: "today isn't really about saying everything perfectly. It's simply about reminding you that you are worth celebrating.",
  closing: "So here's a little corner of the internet made just for you.",
  hint: "keep scrolling",
};

export type Memory = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  objectPosition?: string;
};

export const memories: Memory[] = [
  {
    id: "soft",
    src: "/media/photos/maya-soft.jpg",
    alt: "Maya resting her head on her hand, looking at the camera",
    caption: "This one feels like a memory already.",
    width: 720,
    height: 1280,
    objectPosition: "center 32%",
  },
  {
    id: "teddy",
    src: "/media/photos/teddy.jpg",
    alt: "Maya and him holding a blue teddy between them at a cafe",
    caption: "The moments that probably seemed ordinary.",
    width: 720,
    height: 1280,
    objectPosition: "center 28%",
  },
  {
    id: "cafe",
    src: "/media/photos/cafe-lean.jpg",
    alt: "Him leaning toward Maya at a table under ring lights",
    caption: "The laughs that lasted a little longer.",
    width: 720,
    height: 1280,
    objectPosition: "center 34%",
  },
  {
    id: "night",
    src: "/media/photos/mirror-night.jpg",
    alt: "A mirror selfie of Maya and him by a pool at night",
    caption: "The random conversations.",
    width: 720,
    height: 1280,
    objectPosition: "center 42%",
  },
  {
    id: "rose",
    src: "/media/photos/rose.jpg",
    alt: "Maya in a birthday sash, holding a rose, confetti in the air",
    caption: "A little piece of happiness.",
    width: 720,
    height: 1280,
    objectPosition: "center 36%",
  },
  {
    id: "cheek",
    src: "/media/photos/cheek.jpg",
    alt: "Maya smiling with her eyes closed while he kisses her cheek",
    caption: "Some smiles need no explanation.",
    width: 720,
    height: 1280,
    objectPosition: "center 30%",
  },
  {
    id: "forehead",
    src: "/media/photos/forehead.jpg",
    alt: "Maya and him, foreheads touching, in black and white",
    caption: "The moments neither of you knew you'd miss someday.",
    width: 853,
    height: 1280,
    objectPosition: "center 42%",
  },
];

export const videos = [
  {
    id: "moment-one",
    src: "/media/videos/moment-one.mp4",
    poster: "/media/videos/moment-one-poster.jpg",
    label: "One moment",
  },
  {
    id: "moment-two",
    src: "/media/videos/moment-two.mp4",
    poster: "/media/videos/moment-two-poster.jpg",
    label: "Another",
  },
];

export const videoCopy = {
  before: "Some moments don't need a caption.",
  after: "They just need to be remembered.",
};

export const thingsToSay = {
  kicker: "Things that deserve to be said",
  lines: [
    "You deserve the kind of happiness that doesn't have to be questioned.",
    "You deserve people who make you feel chosen, not confused.",
    "You deserve laughter that comes naturally.",
    "You deserve moments that feel peaceful.",
    "And whatever this chapter looks like...",
    "I hope life is gentle with you.",
  ],
};

export const wish = {
  lines: [
    "If I could wish you just one thing...",
    "...it wouldn't be that everything goes exactly the way you planned.",
    "It would be that wherever life takes you...",
    "...you never forget how worthy you are of being loved, understood, and happy.",
    "Happy Birthday, Maya.",
  ],
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  objectPosition?: string;
  frame: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "forehead",
    src: "/media/photos/forehead.jpg",
    alt: "Maya and him, foreheads touching, in black and white",
    width: 853,
    height: 1280,
    objectPosition: "center 40%",
    frame: "col-span-2 lg:col-span-5 aspect-[3/4]",
  },
  {
    id: "close",
    src: "/media/photos/maya-close.jpg",
    alt: "Maya, close, with a small smile",
    width: 1280,
    height: 960,
    caption: "Some smiles need no explanation.",
    objectPosition: "40% center",
    frame: "col-span-2 lg:col-span-7 aspect-[4/3]",
  },
  {
    id: "cheek",
    src: "/media/photos/cheek.jpg",
    alt: "Maya smiling with her eyes closed while he kisses her cheek",
    width: 720,
    height: 1280,
    caption: "A little piece of happiness.",
    objectPosition: "center 28%",
    frame: "col-span-1 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "wink",
    src: "/media/photos/maya-wink.jpg",
    alt: "Maya winking at the camera, him resting beside her",
    width: 1280,
    height: 1280,
    caption: "This one feels like a memory already.",
    objectPosition: "center 30%",
    frame: "col-span-1 lg:col-span-4 aspect-square",
  },
  {
    id: "rose",
    src: "/media/photos/rose.jpg",
    alt: "Maya in a birthday sash, holding a rose, confetti in the air",
    width: 720,
    height: 1280,
    objectPosition: "center 34%",
    frame: "col-span-2 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "cafe",
    src: "/media/photos/cafe-lean.jpg",
    alt: "Him leaning toward Maya at a table under ring lights",
    width: 720,
    height: 1280,
    objectPosition: "center 32%",
    frame: "col-span-1 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "teddy",
    src: "/media/photos/teddy.jpg",
    alt: "Maya and him holding a blue teddy between them at a cafe",
    width: 720,
    height: 1280,
    objectPosition: "center 28%",
    frame: "col-span-1 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "soft",
    src: "/media/photos/maya-soft.jpg",
    alt: "Maya resting her head on her hand, looking at the camera",
    width: 720,
    height: 1280,
    caption: "A moment worth keeping.",
    objectPosition: "center 30%",
    frame: "col-span-2 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "window",
    src: "/media/photos/maya-window.jpg",
    alt: "Maya standing by a window in a red and white shirt",
    width: 959,
    height: 1280,
    objectPosition: "center 22%",
    frame: "col-span-1 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "floral",
    src: "/media/photos/mirror-floral.jpg",
    alt: "A mirror selfie of Maya in a floral dress, him behind her",
    width: 720,
    height: 1280,
    objectPosition: "center 24%",
    frame: "col-span-1 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "night",
    src: "/media/photos/mirror-night.jpg",
    alt: "A mirror selfie of Maya and him by a pool at night",
    width: 720,
    height: 1280,
    objectPosition: "center 40%",
    frame: "col-span-2 lg:col-span-4 aspect-[3/4]",
  },
  {
    id: "saree",
    src: "/media/photos/saree.jpg",
    alt: "Maya in a green saree, his arm around her waist",
    width: 744,
    height: 997,
    objectPosition: "center",
    frame: "col-span-1 lg:col-span-7 aspect-[3/4]",
  },
  {
    id: "car",
    src: "/media/photos/car-night.jpg",
    alt: "A quiet moment in the back of a car at night",
    width: 720,
    height: 1280,
    objectPosition: "center",
    frame: "col-span-1 lg:col-span-5 aspect-[3/4]",
  },
];

export const galleryCopy = {
  kicker: "Photographs",
  line: "You can stay with any of them.",
};

export type LetterBlock =
  | { type: "salute"; text: string }
  | { type: "p"; text: string }
  | { type: "lines"; text: string[] }
  | { type: "close"; text: string }
  | { type: "sign"; text: string };

export const letterHeading = "A little letter for Maya";

export const letter: LetterBlock[] = [
  { type: "salute", text: "Maya," },
  {
    type: "p",
    text: "Birthdays have a strange way of reminding us how quickly time moves.",
  },
  {
    type: "p",
    text: "Somewhere between ordinary days, random conversations, stupid laughs, beautiful moments, and the things we never quite figured out how to say, memories were made.",
  },
  {
    type: "p",
    text: "And maybe not every chapter is meant to be perfectly written.",
  },
  {
    type: "lines",
    text: [
      "Maybe some chapters are messy.",
      "Maybe some are uncertain.",
      "Maybe some are only meant to teach us how deeply we can feel.",
    ],
  },
  {
    type: "p",
    text: "But none of that takes away from the beauty of the moments that were real.",
  },
  {
    type: "p",
    text: "So today, I hope you pause for a moment and look at yourself with the same kindness that the people who love you see in you.",
  },
  { type: "p", text: "I hope you laugh a little louder." },
  {
    type: "p",
    text: "I hope you find reasons to smile without having to search for them.",
  },
  {
    type: "p",
    text: "I hope the coming year brings you peace where there has been confusion, warmth where there has been distance, and happiness that doesn't need an explanation.",
  },
  { type: "p", text: "And whatever life decides to write next..." },
  { type: "p", text: "I hope it is kind to you." },
  { type: "close", text: "Happy Birthday, Maya." },
  { type: "p", text: "You deserve beautiful things." },
  { type: "sign", text: "With love" },
];

export const ending = {
  lines: [
    "Maybe some stories don't need a perfect ending.",
    "Maybe it's enough that, somewhere along the way...",
    "...they gave us something beautiful to remember.",
    "Happy Birthday, Maya.",
    "May this year be softer, brighter, and kinder to you.",
  ],
  credit: "for maya",
};
