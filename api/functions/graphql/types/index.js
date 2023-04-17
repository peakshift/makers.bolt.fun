import * as scalars from "./_scalars";
import * as misc from "./misc";
import * as category from "./category";
import * as project from "./project";
import * as vote from "./vote";
import * as post from "./post";
import * as users from "./users";
import * as hackathon from "./hackathon";
import * as tournament from "./tournament";
import * as donation from "./donation";
import * as tag from "./tag";

export default {
  ...misc,
  ...tag,
  ...scalars,
  ...category,
  ...project,
  ...vote,
  ...post,
  ...users,
  ...hackathon,
  ...tournament,
  ...donation,
};
