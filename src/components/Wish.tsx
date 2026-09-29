import { wish } from "../content/site";
import { ScrollStory } from "./ScrollStory";

export function Wish() {
  return (
    <ScrollStory
      id="wish"
      lines={wish.lines}
      emphasizeLast
      className="bg-[#08070b]"
    />
  );
}
