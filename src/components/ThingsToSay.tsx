import { thingsToSay } from "../content/site";
import { ScrollStory } from "./ScrollStory";

export function ThingsToSay() {
  return (
    <ScrollStory
      id="deserve"
      kicker={thingsToSay.kicker}
      lines={thingsToSay.lines}
      hint="keep scrolling"
    />
  );
}
