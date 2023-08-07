import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type AddProjectToTournamentInput = {
  project_id: Scalars['Int'];
  tournament_id: Scalars['Int'];
  track_id: Scalars['Int'];
};

export type Author = {
  __typename?: 'Author';
  avatar: Scalars['String'];
  id: Scalars['Int'];
  join_date: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Award = {
  __typename?: 'Award';
  id: Scalars['Int'];
  image: Scalars['String'];
  project: Project;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type BaseUser = {
  avatar: Scalars['String'];
  bio: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  in_tournament: Scalars['Boolean'];
  jobTitle: Maybe<Scalars['String']>;
  join_date: Scalars['Date'];
  last_seen_notification_time: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nostr_keys: Array<NostrKey>;
  primary_nostr_key: Maybe<Scalars['String']>;
  projects: Array<Project>;
  role: Maybe<Scalars['String']>;
  roles: Array<MakerRole>;
  similar_makers: Array<User>;
  skills: Array<MakerSkill>;
  stories: Array<Story>;
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};


export type BaseUserIn_TournamentArgs = {
  id: Scalars['Int'];
};

export type Bounty = PostBase & {
  __typename?: 'Bounty';
  applicants_count: Scalars['Int'];
  applications: Array<BountyApplication>;
  author: User;
  body: Scalars['String'];
  cover_image: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  deadline: Scalars['String'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  is_published: Maybe<Scalars['Boolean']>;
  reward_amount: Scalars['Int'];
  tags: Array<Tag>;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  votes_count: Scalars['Int'];
};

export type BountyApplication = {
  __typename?: 'BountyApplication';
  author: User;
  date: Scalars['String'];
  id: Scalars['Int'];
  workplan: Scalars['String'];
};

export type Capability = {
  __typename?: 'Capability';
  icon: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  apps_count: Scalars['Int'];
  cover_image: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  project: Array<Project>;
  title: Scalars['String'];
  votes_sum: Scalars['Int'];
};

export type CreateProjectInput = {
  capabilities: Array<Scalars['Int']>;
  category_id: Scalars['Int'];
  cover_image: ImageInput;
  description: Scalars['String'];
  discord?: InputMaybe<Scalars['String']>;
  figma?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  hashtag: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  launch_status: ProjectLaunchStatusEnum;
  lightning_address?: InputMaybe<Scalars['String']>;
  members: Array<TeamMemberInput>;
  npub?: InputMaybe<Scalars['String']>;
  recruit_roles: Array<Scalars['Int']>;
  replit?: InputMaybe<Scalars['String']>;
  screenshots: Array<ImageInput>;
  slack?: InputMaybe<Scalars['String']>;
  tagline: Scalars['String'];
  telegram?: InputMaybe<Scalars['String']>;
  thumbnail_image: ImageInput;
  title: Scalars['String'];
  tournaments: Array<Scalars['Int']>;
  twitter?: InputMaybe<Scalars['String']>;
  website: Scalars['String'];
};

export type CreateProjectResponse = {
  __typename?: 'CreateProjectResponse';
  project: Project;
};

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['Int'];
  by: Maybe<User>;
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  paid: Scalars['Boolean'];
  payment_hash: Scalars['String'];
  payment_request: Scalars['String'];
};

export type DonationsStats = {
  __typename?: 'DonationsStats';
  applications: Scalars['String'];
  donations: Scalars['String'];
  prizes: Scalars['String'];
  touranments: Scalars['String'];
};

export type GenericMakerRole = {
  __typename?: 'GenericMakerRole';
  icon: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Hackathon = {
  __typename?: 'Hackathon';
  cover_image: Scalars['String'];
  description: Scalars['String'];
  end_date: Scalars['Date'];
  id: Scalars['Int'];
  location: Scalars['String'];
  start_date: Scalars['Date'];
  tags: Array<Tag>;
  title: Scalars['String'];
  website: Scalars['String'];
};

export type ImageInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type LnurlDetails = {
  __typename?: 'LnurlDetails';
  commentAllowed: Maybe<Scalars['Int']>;
  maxSendable: Maybe<Scalars['Int']>;
  metadata: Maybe<Scalars['String']>;
  minSendable: Maybe<Scalars['Int']>;
};

export type MakerRole = {
  __typename?: 'MakerRole';
  icon: Scalars['String'];
  id: Scalars['Int'];
  level: RoleLevelEnum;
  title: Scalars['String'];
};

export type MakerRoleInput = {
  id: Scalars['Int'];
  level: RoleLevelEnum;
};

export type MakerSkill = {
  __typename?: 'MakerSkill';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type MakerSkillInput = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProjectToTournament: Maybe<ParticipationInfo>;
  confirmDonation: Donation;
  confirmVote: Vote;
  createProject: Maybe<CreateProjectResponse>;
  createStory: Maybe<Story>;
  deleteProject: Maybe<Project>;
  deleteStory: Maybe<Story>;
  donate: Donation;
  linkNostrKey: Maybe<User>;
  registerInTournament: Maybe<User>;
  setUserNostrKeyAsPrimary: Maybe<User>;
  unlinkNostrKey: Maybe<User>;
  updateLastSeenNotificationTime: Maybe<User>;
  updateProfileDetails: Maybe<User>;
  updateProfileRoles: Maybe<User>;
  updateProject: Maybe<CreateProjectResponse>;
  updateTournamentRegistration: Maybe<ParticipationInfo>;
  updateUserPreferences: User;
  vote: Vote;
};


export type MutationAddProjectToTournamentArgs = {
  input: InputMaybe<AddProjectToTournamentInput>;
};


export type MutationConfirmDonationArgs = {
  payment_request: Scalars['String'];
  preimage: Scalars['String'];
};


export type MutationConfirmVoteArgs = {
  payment_request: Scalars['String'];
  preimage: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: InputMaybe<CreateProjectInput>;
};


export type MutationCreateStoryArgs = {
  data: InputMaybe<StoryInputType>;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int'];
};


export type MutationDonateArgs = {
  amount_in_sat: Scalars['Int'];
};


export type MutationLinkNostrKeyArgs = {
  event: InputMaybe<NostrEventInput>;
};


export type MutationRegisterInTournamentArgs = {
  data: InputMaybe<RegisterInTournamentInput>;
  tournament_id: Scalars['Int'];
};


export type MutationSetUserNostrKeyAsPrimaryArgs = {
  key: Scalars['String'];
};


export type MutationUnlinkNostrKeyArgs = {
  key: Scalars['String'];
};


export type MutationUpdateLastSeenNotificationTimeArgs = {
  timestamp: Scalars['String'];
};


export type MutationUpdateProfileDetailsArgs = {
  data: InputMaybe<ProfileDetailsInput>;
};


export type MutationUpdateProfileRolesArgs = {
  data: InputMaybe<ProfileRolesInput>;
};


export type MutationUpdateProjectArgs = {
  input: InputMaybe<UpdateProjectInput>;
};


export type MutationUpdateTournamentRegistrationArgs = {
  data: InputMaybe<UpdateTournamentRegistrationInput>;
  tournament_id: Scalars['Int'];
};


export type MutationUpdateUserPreferencesArgs = {
  userKeys: InputMaybe<Array<UserKeyInputType>>;
};


export type MutationVoteArgs = {
  amount_in_sat: Scalars['Int'];
  item_id: Scalars['Int'];
  item_type: Vote_Item_Type;
};

export type NostrEventInput = {
  content: Scalars['String'];
  created_at: Scalars['Int'];
  id: Scalars['String'];
  kind: Scalars['Int'];
  pubkey: Scalars['String'];
  sig: Scalars['String'];
  tags: Array<Array<Scalars['String']>>;
};

export type NostrKey = {
  __typename?: 'NostrKey';
  createdAt: Scalars['Date'];
  is_primary: Scalars['Boolean'];
  key: Scalars['String'];
  label: Scalars['String'];
};

export type NostrKeyWithUser = {
  __typename?: 'NostrKeyWithUser';
  key: Scalars['String'];
  user: User;
};

export enum Post_Type {
  Bounty = 'Bounty',
  Question = 'Question',
  Story = 'Story'
}

export type ParticipationInfo = {
  __typename?: 'ParticipationInfo';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  hacking_status: TournamentMakerHackingStatusEnum;
  projects: Array<ProjectInTournament>;
};

export type Post = Bounty | Question | Story;

export type PostBase = {
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  is_published: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  votes_count: Scalars['Int'];
};

export type PostComment = {
  __typename?: 'PostComment';
  author: User;
  body: Scalars['String'];
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  parentId: Maybe<Scalars['Int']>;
  votes_count: Scalars['Int'];
};

export type ProfileDetailsInput = {
  avatar?: InputMaybe<ImageInput>;
  bio?: InputMaybe<Scalars['String']>;
  discord?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  jobTitle?: InputMaybe<Scalars['String']>;
  lightning_address?: InputMaybe<Scalars['String']>;
  linkedin?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type ProfileRolesInput = {
  roles: Array<MakerRoleInput>;
  skills: Array<MakerSkillInput>;
};

export type Project = {
  __typename?: 'Project';
  awards: Array<Award>;
  capabilities: Array<Capability>;
  category: Category;
  cover_image: Maybe<Scalars['String']>;
  description: Scalars['String'];
  discord: Maybe<Scalars['String']>;
  figma: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  launch_status: ProjectLaunchStatusEnum;
  lightning_address: Maybe<Scalars['String']>;
  lnurl_callback_url: Maybe<Scalars['String']>;
  members: Array<ProjectMember>;
  members_count: Scalars['Int'];
  npub: Maybe<Scalars['String']>;
  permissions: Array<ProjectPermissionEnum>;
  recruit_roles: Array<MakerRole>;
  replit: Maybe<Scalars['String']>;
  screenshots: Array<Scalars['String']>;
  slack: Maybe<Scalars['String']>;
  stories: Array<Story>;
  tagline: Scalars['String'];
  tags: Array<Tag>;
  telegram: Maybe<Scalars['String']>;
  thumbnail_image: Maybe<Scalars['String']>;
  title: Scalars['String'];
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  votes_count: Scalars['Int'];
  website: Scalars['String'];
};


export type ProjectMembersArgs = {
  take: InputMaybe<Scalars['Int']>;
};

export type ProjectInTournament = {
  __typename?: 'ProjectInTournament';
  project: Project;
  track: Maybe<TournamentTrack>;
};

export enum ProjectLaunchStatusEnum {
  Launched = 'Launched',
  Wip = 'WIP'
}

export type ProjectMember = {
  __typename?: 'ProjectMember';
  role: Team_Member_Role;
  user: User;
};

export enum ProjectPermissionEnum {
  DeleteProject = 'DeleteProject',
  UpdateAdmins = 'UpdateAdmins',
  UpdateInfo = 'UpdateInfo',
  UpdateMembers = 'UpdateMembers'
}

export type Query = {
  __typename?: 'Query';
  activeUsers: Array<User>;
  allCategories: Array<Category>;
  allProjects: Array<Project>;
  checkValidProjectHashtag: Scalars['Boolean'];
  getAllCapabilities: Array<Capability>;
  getAllHackathons: Array<Hackathon>;
  getAllMakersRoles: Array<GenericMakerRole>;
  getAllMakersSkills: Array<MakerSkill>;
  getCategory: Category;
  getDonationsStats: DonationsStats;
  getFeed: Array<Post>;
  getLnurlDetailsForProject: LnurlDetails;
  getMakersInTournament: TournamentMakersResponse;
  getMyDrafts: Array<Post>;
  getPostById: Post;
  getProject: Project;
  getProjectsById: Array<Project>;
  getProjectsInTournament: TournamentProjectsResponse;
  getTagInfo: Tag;
  getTournamentById: Tournament;
  getTournamentToRegister: Array<Tournament>;
  getTrendingPosts: Array<Post>;
  hottestProjects: Array<Project>;
  me: Maybe<User>;
  newProjects: Array<Project>;
  officialTags: Array<Tag>;
  popularTags: Array<Tag>;
  profile: Maybe<User>;
  projectsByCategory: Array<Project>;
  pubkeysOfMakersInTournament: Array<Scalars['String']>;
  pubkeysOfProjectsInTournament: Array<Scalars['String']>;
  recentProjectsInTag: Array<Project>;
  searchProjects: Array<Project>;
  searchUsers: Array<User>;
  similarMakers: Array<User>;
  similarProjects: Array<Project>;
  tournamentParticipationInfo: Maybe<ParticipationInfo>;
  usersByNostrKeys: Array<NostrKeyWithUser>;
};


export type QueryActiveUsersArgs = {
  lastDays?: InputMaybe<Scalars['Int']>;
  tagId: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryAllProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCheckValidProjectHashtagArgs = {
  hashtag: Scalars['String'];
  projectId: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllHackathonsArgs = {
  sortBy: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Int']>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryGetFeedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  sortBy: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLnurlDetailsForProjectArgs = {
  project_id: Scalars['Int'];
};


export type QueryGetMakersInTournamentArgs = {
  openToConnect: InputMaybe<Scalars['Boolean']>;
  roleId: InputMaybe<Scalars['Int']>;
  search: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  tournamentIdOrSlug: Scalars['String'];
};


export type QueryGetMyDraftsArgs = {
  type: Post_Type;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Int'];
  type: Post_Type;
};


export type QueryGetProjectArgs = {
  id: InputMaybe<Scalars['Int']>;
  tag: InputMaybe<Scalars['String']>;
};


export type QueryGetProjectsByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetProjectsInTournamentArgs = {
  lookingForMakers: InputMaybe<Scalars['Boolean']>;
  roleId: InputMaybe<Scalars['Int']>;
  search: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  tournamentId: Scalars['Int'];
  trackId: InputMaybe<Scalars['Int']>;
};


export type QueryGetTagInfoArgs = {
  tag: InputMaybe<Scalars['String']>;
};


export type QueryGetTournamentByIdArgs = {
  idOrSlug: Scalars['String'];
};


export type QueryHottestProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryNewProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryProfileArgs = {
  id: Scalars['Int'];
};


export type QueryProjectsByCategoryArgs = {
  category_id: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPubkeysOfMakersInTournamentArgs = {
  tournamentIdOrSlug: Scalars['String'];
};


export type QueryPubkeysOfProjectsInTournamentArgs = {
  tournamentIdOrSlug: Scalars['String'];
};


export type QueryRecentProjectsInTagArgs = {
  tagId: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchProjectsArgs = {
  search: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUsersArgs = {
  value: Scalars['String'];
};


export type QuerySimilarMakersArgs = {
  id: Scalars['Int'];
};


export type QuerySimilarProjectsArgs = {
  id: Scalars['Int'];
};


export type QueryTournamentParticipationInfoArgs = {
  tournamentId: Scalars['Int'];
};


export type QueryUsersByNostrKeysArgs = {
  keys: Array<Scalars['String']>;
};

export type Question = PostBase & {
  __typename?: 'Question';
  author: User;
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  is_published: Maybe<Scalars['Boolean']>;
  tags: Array<Tag>;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  votes_count: Scalars['Int'];
};

export type RegisterInTournamentInput = {
  email: Scalars['String'];
  hacking_status: TournamentMakerHackingStatusEnum;
};

export enum RoleLevelEnum {
  Advanced = 'Advanced',
  Beginner = 'Beginner',
  Hobbyist = 'Hobbyist',
  Intermediate = 'Intermediate',
  Pro = 'Pro'
}

export type Story = PostBase & {
  __typename?: 'Story';
  author: User;
  body: Scalars['String'];
  comments: Array<PostComment>;
  comments_count: Scalars['Int'];
  cover_image: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  is_published: Maybe<Scalars['Boolean']>;
  nostr_event_id: Maybe<Scalars['String']>;
  project: Maybe<Project>;
  tags: Array<Tag>;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  votes_count: Scalars['Int'];
};

export type StoryInputType = {
  body: Scalars['String'];
  cover_image?: InputMaybe<ImageInput>;
  id?: InputMaybe<Scalars['Int']>;
  is_published?: InputMaybe<Scalars['Boolean']>;
  project_id?: InputMaybe<Scalars['Int']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export enum Team_Member_Role {
  Admin = 'Admin',
  Maker = 'Maker',
  Owner = 'Owner'
}

export type Tag = {
  __typename?: 'Tag';
  description: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isOfficial: Maybe<Scalars['Boolean']>;
  links: Array<TagLink>;
  long_description: Maybe<Scalars['String']>;
  moderators: Array<User>;
  posts_count: Scalars['Int'];
  title: Scalars['String'];
};

export type TagLink = {
  __typename?: 'TagLink';
  name: Scalars['String'];
  url: Scalars['String'];
};

export type TeamMemberInput = {
  id: Scalars['Int'];
  role: Team_Member_Role;
};

export type Tournament = {
  __typename?: 'Tournament';
  config: TournamentConfig;
  contacts: Array<TournamentContact>;
  cover_image: Scalars['String'];
  description: Scalars['String'];
  end_date: Scalars['Date'];
  events: Array<TournamentEvent>;
  events_count: Scalars['Int'];
  faqs: Array<TournamentFaq>;
  id: Scalars['Int'];
  judges: Array<TournamentJudge>;
  location: Scalars['String'];
  makers_count: Scalars['Int'];
  makers_deals: Array<TournamentMakerDeal>;
  partners: Array<TournamentPartner>;
  prizes: Array<TournamentPrize>;
  projects_count: Scalars['Int'];
  schedule: Array<TournamentSchedule>;
  start_date: Scalars['Date'];
  thumbnail_image: Scalars['String'];
  title: Scalars['String'];
  tracks: Array<TournamentTrack>;
  website: Scalars['String'];
};

export type TournamentConfig = {
  __typename?: 'TournamentConfig';
  feedFilters: Maybe<Array<Scalars['String']>>;
  ideasRootNostrEventId: Maybe<Scalars['String']>;
  mainFeedHashtag: Maybe<Scalars['String']>;
  projectsSubmissionOpen: Scalars['Boolean'];
  registerationOpen: Scalars['Boolean'];
  showFeed: Scalars['Boolean'];
};

export type TournamentContact = {
  __typename?: 'TournamentContact';
  type: Scalars['String'];
  url: Scalars['String'];
};

export type TournamentEvent = {
  __typename?: 'TournamentEvent';
  description: Scalars['String'];
  ends_at: Scalars['Date'];
  id: Scalars['Int'];
  image: Scalars['String'];
  links: Array<Scalars['String']>;
  location: Scalars['String'];
  starts_at: Scalars['Date'];
  title: Scalars['String'];
  type: TournamentEventTypeEnum;
  website: Scalars['String'];
};

export enum TournamentEventTypeEnum {
  IrlMeetup = 'IRLMeetup',
  OnlineMeetup = 'OnlineMeetup',
  TwitterSpace = 'TwitterSpace',
  Workshop = 'Workshop'
}

export type TournamentFaq = {
  __typename?: 'TournamentFAQ';
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type TournamentJudge = {
  __typename?: 'TournamentJudge';
  avatar: Scalars['String'];
  company: Scalars['String'];
  name: Scalars['String'];
};

export type TournamentMakerDeal = {
  __typename?: 'TournamentMakerDeal';
  description: Scalars['String'];
  title: Scalars['String'];
  url: Maybe<Scalars['String']>;
};

export enum TournamentMakerHackingStatusEnum {
  OpenToConnect = 'OpenToConnect',
  Solo = 'Solo'
}

export type TournamentMakersResponse = {
  __typename?: 'TournamentMakersResponse';
  hasNext: Maybe<Scalars['Boolean']>;
  hasPrev: Maybe<Scalars['Boolean']>;
  makers: Array<TournamentParticipant>;
};

export type TournamentParticipant = {
  __typename?: 'TournamentParticipant';
  hacking_status: TournamentMakerHackingStatusEnum;
  is_registered: Maybe<Scalars['Boolean']>;
  user: User;
};

export type TournamentPartner = {
  __typename?: 'TournamentPartner';
  items: Array<TournamentPartnerItem>;
  title: Scalars['String'];
};

export type TournamentPartnerItem = {
  __typename?: 'TournamentPartnerItem';
  image: Scalars['String'];
  isBigImage: Maybe<Scalars['Boolean']>;
  url: Scalars['String'];
};

export type TournamentPrize = {
  __typename?: 'TournamentPrize';
  additional_prizes: Maybe<Array<TournamentPrizeAdditionalPrize>>;
  description: Scalars['String'];
  image: Scalars['String'];
  positions: Array<TournamentPrizePosition>;
  title: Scalars['String'];
};

export type TournamentPrizeAdditionalPrize = {
  __typename?: 'TournamentPrizeAdditionalPrize';
  text: Scalars['String'];
  url: Maybe<Scalars['String']>;
};

export type TournamentPrizePosition = {
  __typename?: 'TournamentPrizePosition';
  position: Scalars['String'];
  project: Maybe<Scalars['String']>;
  reward: Scalars['String'];
};

export type TournamentProjectsResponse = {
  __typename?: 'TournamentProjectsResponse';
  allItemsCount: Maybe<Scalars['Int']>;
  hasNext: Maybe<Scalars['Boolean']>;
  hasPrev: Maybe<Scalars['Boolean']>;
  projects: Array<Project>;
};

export type TournamentSchedule = {
  __typename?: 'TournamentSchedule';
  date: Scalars['String'];
  events: Array<TournamentScheduleEvent>;
};

export type TournamentScheduleEvent = {
  __typename?: 'TournamentScheduleEvent';
  location: Maybe<Scalars['String']>;
  time: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

export type TournamentTrack = {
  __typename?: 'TournamentTrack';
  icon: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type UpdateProjectInput = {
  capabilities: Array<Scalars['Int']>;
  category_id: Scalars['Int'];
  cover_image: ImageInput;
  description: Scalars['String'];
  discord?: InputMaybe<Scalars['String']>;
  figma?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  hashtag: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  launch_status: ProjectLaunchStatusEnum;
  lightning_address?: InputMaybe<Scalars['String']>;
  members: Array<TeamMemberInput>;
  npub?: InputMaybe<Scalars['String']>;
  recruit_roles: Array<Scalars['Int']>;
  replit?: InputMaybe<Scalars['String']>;
  screenshots: Array<ImageInput>;
  slack?: InputMaybe<Scalars['String']>;
  tagline: Scalars['String'];
  telegram?: InputMaybe<Scalars['String']>;
  thumbnail_image: ImageInput;
  title: Scalars['String'];
  tournaments: Array<Scalars['Int']>;
  twitter?: InputMaybe<Scalars['String']>;
  website: Scalars['String'];
};

export type UpdateTournamentRegistrationInput = {
  email?: InputMaybe<Scalars['String']>;
  hacking_status?: InputMaybe<TournamentMakerHackingStatusEnum>;
};

export type User = BaseUser & {
  __typename?: 'User';
  avatar: Scalars['String'];
  bio: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  in_tournament: Scalars['Boolean'];
  jobTitle: Maybe<Scalars['String']>;
  join_date: Scalars['Date'];
  last_seen_notification_time: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nostr_keys: Array<NostrKey>;
  primary_nostr_key: Maybe<Scalars['String']>;
  private_data: UserPrivateData;
  projects: Array<Project>;
  role: Maybe<Scalars['String']>;
  roles: Array<MakerRole>;
  similar_makers: Array<User>;
  skills: Array<MakerSkill>;
  stories: Array<Story>;
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};


export type UserIn_TournamentArgs = {
  id: Scalars['Int'];
};

export type UserKeyInputType = {
  key: Scalars['String'];
  name: Scalars['String'];
};

export type UserPrivateData = {
  __typename?: 'UserPrivateData';
  default_nostr_prv_key: Maybe<Scalars['String']>;
  default_nostr_pub_key: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  walletsKeys: Array<WalletKey>;
};

export enum Vote_Item_Type {
  Bounty = 'Bounty',
  PostComment = 'PostComment',
  Project = 'Project',
  Question = 'Question',
  Story = 'Story',
  User = 'User'
}

export type Vote = {
  __typename?: 'Vote';
  amount_in_sat: Scalars['Int'];
  id: Scalars['Int'];
  item_id: Scalars['Int'];
  item_type: Vote_Item_Type;
  paid: Scalars['Boolean'];
  payment_hash: Scalars['String'];
  payment_request: Scalars['String'];
};

export type WalletKey = {
  __typename?: 'WalletKey';
  createdAt: Scalars['Date'];
  is_current: Scalars['Boolean'];
  key: Scalars['String'];
  name: Scalars['String'];
};

export type OfficialTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficialTagsQuery = { __typename?: 'Query', officialTags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null, description: string | null }> };

export type SearchUsersQueryVariables = Exact<{
  value: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null }> };

export type NavCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type NavCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, title: string, icon: string | null, votes_sum: number }> };

export type UpdateLastSeenNotificationTimeMutationVariables = Exact<{
  timestamp: Scalars['String'];
}>;


export type UpdateLastSeenNotificationTimeMutation = { __typename?: 'Mutation', updateLastSeenNotificationTime: { __typename?: 'User', id: number, last_seen_notification_time: any } | null };

export type SearchProjectsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: Array<{ __typename?: 'Project', id: number, thumbnail_image: string | null, title: string, category: { __typename?: 'Category', title: string, id: number } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null, bio: string | null, primary_nostr_key: string | null, last_seen_notification_time: any } | null };

export type DonationsStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DonationsStatsQuery = { __typename?: 'Query', getDonationsStats: { __typename?: 'DonationsStats', prizes: string, touranments: string, donations: string, applications: string } };

export type DonateMutationVariables = Exact<{
  amountInSat: Scalars['Int'];
}>;


export type DonateMutation = { __typename?: 'Mutation', donate: { __typename?: 'Donation', id: number, amount: number, payment_request: string, payment_hash: string } };

export type ConfirmDonationMutationVariables = Exact<{
  paymentRequest: Scalars['String'];
  preimage: Scalars['String'];
}>;


export type ConfirmDonationMutation = { __typename?: 'Mutation', confirmDonation: { __typename?: 'Donation', id: number, amount: number, paid: boolean } };

export type GetHackathonsQueryVariables = Exact<{
  sortBy: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Int']>;
}>;


export type GetHackathonsQuery = { __typename?: 'Query', getAllHackathons: Array<{ __typename?: 'Hackathon', id: number, title: string, description: string, cover_image: string, start_date: any, end_date: any, location: string, website: string, tags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> }> };

export type GetActiveUsersQueryVariables = Exact<{
  tagId: InputMaybe<Scalars['Int']>;
  lastDays: InputMaybe<Scalars['Int']>;
}>;


export type GetActiveUsersQuery = { __typename?: 'Query', activeUsers: Array<{ __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null }> };

export type RecentProjectsInTagQueryVariables = Exact<{
  tagId: Scalars['Int'];
}>;


export type RecentProjectsInTagQuery = { __typename?: 'Query', recentProjectsInTag: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, hashtag: string, votes_count: number, category: { __typename?: 'Category', id: number, icon: string | null, title: string } }> };

export type TrendingPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type TrendingPostsQuery = { __typename?: 'Query', getTrendingPosts: Array<{ __typename?: 'Bounty', id: number, title: string, author: { __typename?: 'User', id: number, avatar: string } } | { __typename?: 'Question', id: number, title: string, author: { __typename?: 'User', id: number, avatar: string } } | { __typename?: 'Story', id: number, title: string, author: { __typename?: 'User', id: number, avatar: string } }> };

export type GetAllTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTopicsQuery = { __typename?: 'Query', officialTags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null, posts_count: number, long_description: string | null }> };

export type GetMyDraftsQueryVariables = Exact<{
  type: Post_Type;
}>;


export type GetMyDraftsQuery = { __typename?: 'Query', getMyDrafts: Array<{ __typename?: 'Bounty', id: number, title: string, updatedAt: any } | { __typename?: 'Question', id: number, title: string, updatedAt: any } | { __typename?: 'Story', id: number, title: string, updatedAt: any }> };

export type CreateStoryMutationVariables = Exact<{
  data: InputMaybe<StoryInputType>;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: number, title: string, createdAt: any, body: string, votes_count: number, is_published: boolean | null, type: string, cover_image: string | null, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, project: { __typename?: 'Project', id: number, title: string, hashtag: string, thumbnail_image: string | null } | null } | null };

export type DeleteStoryMutationVariables = Exact<{
  deleteStoryId: Scalars['Int'];
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory: { __typename?: 'Story', id: number } | null };

export type MyProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProjectsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, projects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, category: { __typename?: 'Category', id: number, icon: string | null, title: string } }> } | null };

export type FeedTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedTagsQuery = { __typename?: 'Query', officialTags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> };

export type FeedQueryVariables = Exact<{
  take: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sortBy: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Int']>;
}>;


export type FeedQuery = { __typename?: 'Query', getFeed: Array<{ __typename?: 'Bounty', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, deadline: string, reward_amount: number, applicants_count: number, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Question', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Story', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, comments_count: number, nostr_event_id: string | null, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, project: { __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, hashtag: string } | null }> };

export type PostDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
  type: Post_Type;
}>;


export type PostDetailsQuery = { __typename?: 'Query', getPostById: { __typename?: 'Bounty', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, cover_image: string | null, deadline: string, reward_amount: number, applicants_count: number, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null }, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, applications: Array<{ __typename?: 'BountyApplication', id: number, date: string, workplan: string, author: { __typename?: 'User', id: number, name: string, avatar: string } }> } | { __typename?: 'Question', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Story', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, cover_image: string | null, is_published: boolean | null, nostr_event_id: string | null, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null }, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, project: { __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, hashtag: string } | null } };

export type GetTagInfoQueryVariables = Exact<{
  tag: InputMaybe<Scalars['String']>;
}>;


export type GetTagInfoQuery = { __typename?: 'Query', getTagInfo: { __typename?: 'Tag', id: number, title: string, icon: string | null, description: string | null, long_description: string | null, links: Array<{ __typename?: 'TagLink', name: string, url: string }>, moderators: Array<{ __typename?: 'User', id: number, name: string, avatar: string }> } };

export type TagFeedQueryVariables = Exact<{
  take: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sortBy: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Int']>;
}>;


export type TagFeedQuery = { __typename?: 'Query', getFeed: Array<{ __typename?: 'Bounty', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, deadline: string, reward_amount: number, applicants_count: number, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Question', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Story', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, comments_count: number, nostr_event_id: string | null, author: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, project: { __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, hashtag: string } | null }> };

export type UserBasicInfoFragment = { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null, role: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, discord: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null, last_seen_notification_time: any };

export type MyProfileAboutQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileAboutQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null, role: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, discord: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null, last_seen_notification_time: any, private_data: { __typename?: 'UserPrivateData', email: string | null } } | null };

export type UpdateProfileAboutMutationVariables = Exact<{
  data: InputMaybe<ProfileDetailsInput>;
}>;


export type UpdateProfileAboutMutation = { __typename?: 'Mutation', updateProfileDetails: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null, role: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, discord: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null, last_seen_notification_time: any, private_data: { __typename?: 'UserPrivateData', email: string | null } } | null };

export type MyNostrKeysQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNostrKeysQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, private_data: { __typename?: 'UserPrivateData', default_nostr_prv_key: string | null, default_nostr_pub_key: string | null } } | null };

export type MyNostrSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNostrSettingsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, nostr_keys: Array<{ __typename?: 'NostrKey', key: string, createdAt: any, label: string, is_primary: boolean }>, private_data: { __typename?: 'UserPrivateData', default_nostr_prv_key: string | null, default_nostr_pub_key: string | null } } | null };

export type LinkNewNostrKeyMutationVariables = Exact<{
  event: InputMaybe<NostrEventInput>;
}>;


export type LinkNewNostrKeyMutation = { __typename?: 'Mutation', linkNostrKey: { __typename?: 'User', id: number, primary_nostr_key: string | null, nostr_keys: Array<{ __typename?: 'NostrKey', key: string, createdAt: any, label: string, is_primary: boolean }> } | null };

export type UnlinkNostrKeyMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type UnlinkNostrKeyMutation = { __typename?: 'Mutation', unlinkNostrKey: { __typename?: 'User', id: number, primary_nostr_key: string | null, nostr_keys: Array<{ __typename?: 'NostrKey', key: string, createdAt: any, label: string, is_primary: boolean }> } | null };

export type SetUserNostrKeyAsPrimaryMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type SetUserNostrKeyAsPrimaryMutation = { __typename?: 'Mutation', setUserNostrKeyAsPrimary: { __typename?: 'User', id: number, primary_nostr_key: string | null, nostr_keys: Array<{ __typename?: 'NostrKey', key: string, is_primary: boolean }> } | null };

export type MyProfilePreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfilePreferencesQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, private_data: { __typename?: 'UserPrivateData', default_nostr_prv_key: string | null, default_nostr_pub_key: string | null, walletsKeys: Array<{ __typename?: 'WalletKey', key: string, name: string, createdAt: any, is_current: boolean }> } } | null };

export type UpdateUserPreferencesMutationVariables = Exact<{
  walletsKeys: InputMaybe<Array<UserKeyInputType> | UserKeyInputType>;
}>;


export type UpdateUserPreferencesMutation = { __typename?: 'Mutation', updateUserPreferences: { __typename?: 'User', id: number, private_data: { __typename?: 'UserPrivateData', default_nostr_prv_key: string | null, default_nostr_pub_key: string | null, walletsKeys: Array<{ __typename?: 'WalletKey', key: string, name: string }> } } };

export type UserRolesSkillsFragment = { __typename?: 'User', skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> };

export type MyProfileRolesSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileRolesSkillsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null, getAllMakersRoles: Array<{ __typename?: 'GenericMakerRole', id: number, title: string, icon: string }>, getAllMakersSkills: Array<{ __typename?: 'MakerSkill', id: number, title: string }> };

export type UpdateUserRolesSkillsMutationVariables = Exact<{
  data: InputMaybe<ProfileRolesInput>;
}>;


export type UpdateUserRolesSkillsMutation = { __typename?: 'Mutation', updateProfileRoles: { __typename?: 'User', id: number, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null };

export type ProfileQueryVariables = Exact<{
  profileId: Scalars['Int'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, primary_nostr_key: string | null, role: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, discord: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null, last_seen_notification_time: any, stories: Array<{ __typename?: 'Story', id: number, title: string, createdAt: any, tags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> }>, tournaments: Array<{ __typename?: 'Tournament', id: number, title: string, thumbnail_image: string, start_date: any, end_date: any }>, projects: Array<{ __typename?: 'Project', id: number, hashtag: string, title: string, thumbnail_image: string | null, category: { __typename?: 'Category', id: number, icon: string | null, title: string } }>, similar_makers: Array<{ __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null }>, nostr_keys: Array<{ __typename?: 'NostrKey', key: string, createdAt: any, label: string, is_primary: boolean }>, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null };

export type CategoryPageQueryVariables = Exact<{
  categoryId: Scalars['Int'];
}>;


export type CategoryPageQuery = { __typename?: 'Query', projectsByCategory: Array<{ __typename?: 'Project', id: number, thumbnail_image: string | null, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, getCategory: { __typename?: 'Category', id: number, title: string, cover_image: string | null, apps_count: number } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, title: string, icon: string | null }> };

export type ExploreProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreProjectsQuery = { __typename?: 'Query', hottestProjects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, newProjects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string | null, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, allCategories: Array<{ __typename?: 'Category', id: number, title: string, project: Array<{ __typename?: 'Project', id: number, thumbnail_image: string | null, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }> }> };

export type HottestProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type HottestProjectsQuery = { __typename?: 'Query', hottestProjects: Array<{ __typename?: 'Project', id: number, thumbnail_image: string | null, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }> };

export type GetAllCapabilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCapabilitiesQuery = { __typename?: 'Query', getAllCapabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> };

export type ProjectDetailsFragment = { __typename?: 'Project', id: number, title: string, tagline: string, description: string, hashtag: string, cover_image: string | null, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, twitter: string | null, discord: string | null, github: string | null, slack: string | null, telegram: string | null, figma: string | null, replit: string | null, npub: string | null, screenshots: Array<string>, website: string, lightning_address: string | null, votes_count: number, permissions: Array<ProjectPermissionEnum>, category: { __typename?: 'Category', id: number, icon: string | null, title: string }, members: Array<{ __typename?: 'ProjectMember', role: Team_Member_Role, user: { __typename?: 'User', id: number, name: string, jobTitle: string | null, avatar: string } }>, awards: Array<{ __typename?: 'Award', title: string, image: string, url: string, id: number }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }>, capabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> };

export type CreateProjectMutationVariables = Exact<{
  input: InputMaybe<CreateProjectInput>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'CreateProjectResponse', project: { __typename?: 'Project', id: number, title: string, tagline: string, description: string, hashtag: string, cover_image: string | null, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, twitter: string | null, discord: string | null, github: string | null, slack: string | null, telegram: string | null, figma: string | null, replit: string | null, npub: string | null, screenshots: Array<string>, website: string, lightning_address: string | null, votes_count: number, permissions: Array<ProjectPermissionEnum>, category: { __typename?: 'Category', id: number, icon: string | null, title: string }, members: Array<{ __typename?: 'ProjectMember', role: Team_Member_Role, user: { __typename?: 'User', id: number, name: string, jobTitle: string | null, avatar: string } }>, awards: Array<{ __typename?: 'Award', title: string, image: string, url: string, id: number }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }>, capabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> } } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: InputMaybe<UpdateProjectInput>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'CreateProjectResponse', project: { __typename?: 'Project', id: number, title: string, tagline: string, description: string, hashtag: string, cover_image: string | null, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, twitter: string | null, discord: string | null, github: string | null, slack: string | null, telegram: string | null, figma: string | null, replit: string | null, npub: string | null, screenshots: Array<string>, website: string, lightning_address: string | null, votes_count: number, permissions: Array<ProjectPermissionEnum>, category: { __typename?: 'Category', id: number, icon: string | null, title: string }, members: Array<{ __typename?: 'ProjectMember', role: Team_Member_Role, user: { __typename?: 'User', id: number, name: string, jobTitle: string | null, avatar: string } }>, awards: Array<{ __typename?: 'Award', title: string, image: string, url: string, id: number }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }>, capabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> } } | null };

export type IsValidProjectHashtagQueryVariables = Exact<{
  hashtag: Scalars['String'];
  projectId: InputMaybe<Scalars['Int']>;
}>;


export type IsValidProjectHashtagQuery = { __typename?: 'Query', checkValidProjectHashtag: boolean };

export type GetTournamentsToRegisterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTournamentsToRegisterQuery = { __typename?: 'Query', getTournamentToRegister: Array<{ __typename?: 'Tournament', id: number, title: string }> };

export type ProjectDetailsQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['Int']>;
  projectTag: InputMaybe<Scalars['String']>;
}>;


export type ProjectDetailsQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: number, title: string, tagline: string, description: string, hashtag: string, cover_image: string | null, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, twitter: string | null, discord: string | null, github: string | null, slack: string | null, figma: string | null, replit: string | null, npub: string | null, telegram: string | null, screenshots: Array<string>, website: string, lightning_address: string | null, votes_count: number, permissions: Array<ProjectPermissionEnum>, category: { __typename?: 'Category', id: number, icon: string | null, title: string }, members: Array<{ __typename?: 'ProjectMember', role: Team_Member_Role, user: { __typename?: 'User', id: number, name: string, jobTitle: string | null, avatar: string } }>, awards: Array<{ __typename?: 'Award', title: string, image: string, url: string, id: number }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }>, stories: Array<{ __typename?: 'Story', id: number, title: string, createdAt: any, tags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> }>, tournaments: Array<{ __typename?: 'Tournament', id: number, title: string, thumbnail_image: string, start_date: any, end_date: any }>, capabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> } };

export type SimilarProjectsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type SimilarProjectsQuery = { __typename?: 'Query', similarProjects: Array<{ __typename?: 'Project', id: number, title: string, hashtag: string, thumbnail_image: string | null, category: { __typename?: 'Category', id: number, icon: string | null, title: string } }> };

export type ProjectDetailsModalQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['Int']>;
  projectTag: InputMaybe<Scalars['String']>;
}>;


export type ProjectDetailsModalQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: number, title: string, tagline: string, description: string, hashtag: string, cover_image: string | null, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, twitter: string | null, discord: string | null, github: string | null, slack: string | null, telegram: string | null, figma: string | null, replit: string | null, npub: string | null, screenshots: Array<string>, website: string, lightning_address: string | null, votes_count: number, permissions: Array<ProjectPermissionEnum>, category: { __typename?: 'Category', id: number, icon: string | null, title: string }, members: Array<{ __typename?: 'ProjectMember', role: Team_Member_Role, user: { __typename?: 'User', id: number, name: string, jobTitle: string | null, avatar: string } }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }>, capabilities: Array<{ __typename?: 'Capability', id: number, title: string, icon: string }> } };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { __typename?: 'Query', getAllMakersRoles: Array<{ __typename?: 'GenericMakerRole', id: number, title: string, icon: string }> };

export type GetMakersInTournamentQueryVariables = Exact<{
  tournamentIdOrSlug: Scalars['String'];
  take: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  search: InputMaybe<Scalars['String']>;
  roleId: InputMaybe<Scalars['Int']>;
  openToConnect: InputMaybe<Scalars['Boolean']>;
}>;


export type GetMakersInTournamentQuery = { __typename?: 'Query', getMakersInTournament: { __typename?: 'TournamentMakersResponse', hasNext: boolean | null, hasPrev: boolean | null, makers: Array<{ __typename?: 'TournamentParticipant', hacking_status: TournamentMakerHackingStatusEnum, user: { __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null, discord: string | null, twitter: string | null, linkedin: string | null, github: string | null, roles: Array<{ __typename?: 'MakerRole', id: number, icon: string, title: string }>, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }> } }> } };

export type GetProjectsInTournamentQueryVariables = Exact<{
  tournamentId: Scalars['Int'];
  take: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  trackId: InputMaybe<Scalars['Int']>;
  roleId: InputMaybe<Scalars['Int']>;
  search: InputMaybe<Scalars['String']>;
}>;


export type GetProjectsInTournamentQuery = { __typename?: 'Query', getProjectsInTournament: { __typename?: 'TournamentProjectsResponse', allItemsCount: number | null, hasNext: boolean | null, hasPrev: boolean | null, projects: Array<{ __typename?: 'Project', id: number, title: string, description: string, thumbnail_image: string | null, members_count: number, category: { __typename?: 'Category', id: number, title: string, icon: string | null }, members: Array<{ __typename?: 'ProjectMember', user: { __typename?: 'User', id: number, avatar: string } }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> }> } };

export type UpdateTournamentRegistrationMutationVariables = Exact<{
  tournamentId: Scalars['Int'];
  data: InputMaybe<UpdateTournamentRegistrationInput>;
}>;


export type UpdateTournamentRegistrationMutation = { __typename?: 'Mutation', updateTournamentRegistration: { __typename?: 'ParticipationInfo', createdAt: any, email: string, hacking_status: TournamentMakerHackingStatusEnum } | null };

export type GetTournamentWinningProjectsQueryVariables = Exact<{
  winning_projects: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetTournamentWinningProjectsQuery = { __typename?: 'Query', getProjectsById: Array<{ __typename?: 'Project', id: number, hashtag: string, title: string, tagline: string, thumbnail_image: string | null, category: { __typename?: 'Category', id: number, title: string, icon: string | null } }> };

export type RegisterInTournamentMutationVariables = Exact<{
  tournamentId: Scalars['Int'];
  data: InputMaybe<RegisterInTournamentInput>;
}>;


export type RegisterInTournamentMutation = { __typename?: 'Mutation', registerInTournament: { __typename?: 'User', id: number, in_tournament: boolean } | null };

export type AddProjectToTournamentMutationVariables = Exact<{
  input: InputMaybe<AddProjectToTournamentInput>;
}>;


export type AddProjectToTournamentMutation = { __typename?: 'Mutation', addProjectToTournament: { __typename?: 'ParticipationInfo', projects: Array<{ __typename?: 'ProjectInTournament', track: { __typename?: 'TournamentTrack', id: number, title: string, icon: string } | null, project: { __typename?: 'Project', id: number, title: string, tagline: string, hashtag: string, thumbnail_image: string | null, launch_status: ProjectLaunchStatusEnum, category: { __typename?: 'Category', id: number, title: string, icon: string | null } } }> } | null };

export type MeTournamentQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MeTournamentQuery = { __typename?: 'Query', tournamentParticipationInfo: { __typename?: 'ParticipationInfo', createdAt: any, hacking_status: TournamentMakerHackingStatusEnum, projects: Array<{ __typename?: 'ProjectInTournament', project: { __typename?: 'Project', id: number, title: string, description: string, thumbnail_image: string | null, members_count: number, category: { __typename?: 'Category', id: number, title: string, icon: string | null }, members: Array<{ __typename?: 'ProjectMember', user: { __typename?: 'User', id: number, avatar: string } }>, recruit_roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> }, track: { __typename?: 'TournamentTrack', id: number, title: string, icon: string } | null }> } | null, me: { __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null, twitter: string | null, linkedin: string | null, github: string | null, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null };

export type GetTournamentByIdQueryVariables = Exact<{
  idOrSlug: Scalars['String'];
}>;


export type GetTournamentByIdQuery = { __typename?: 'Query', pubkeysOfMakersInTournament: Array<string>, pubkeysOfProjectsInTournament: Array<string>, getTournamentById: { __typename?: 'Tournament', id: number, title: string, description: string, thumbnail_image: string, cover_image: string, start_date: any, end_date: any, location: string, website: string, events_count: number, makers_count: number, projects_count: number, prizes: Array<{ __typename?: 'TournamentPrize', title: string, description: string, image: string, positions: Array<{ __typename?: 'TournamentPrizePosition', position: string, reward: string, project: string | null }>, additional_prizes: Array<{ __typename?: 'TournamentPrizeAdditionalPrize', text: string, url: string | null }> | null }>, tracks: Array<{ __typename?: 'TournamentTrack', id: number, title: string, icon: string }>, judges: Array<{ __typename?: 'TournamentJudge', name: string, company: string, avatar: string }>, events: Array<{ __typename?: 'TournamentEvent', id: number, title: string, image: string, description: string, starts_at: any, ends_at: any, location: string, website: string, type: TournamentEventTypeEnum, links: Array<string> }>, faqs: Array<{ __typename?: 'TournamentFAQ', question: string, answer: string }>, contacts: Array<{ __typename?: 'TournamentContact', type: string, url: string }>, partners: Array<{ __typename?: 'TournamentPartner', title: string, items: Array<{ __typename?: 'TournamentPartnerItem', image: string, url: string, isBigImage: boolean | null }> }>, schedule: Array<{ __typename?: 'TournamentSchedule', date: string, events: Array<{ __typename?: 'TournamentScheduleEvent', title: string, time: string | null, timezone: string | null, url: string | null, type: string | null, location: string | null }> }>, makers_deals: Array<{ __typename?: 'TournamentMakerDeal', title: string, description: string, url: string | null }>, config: { __typename?: 'TournamentConfig', registerationOpen: boolean, projectsSubmissionOpen: boolean, ideasRootNostrEventId: string | null, showFeed: boolean, mainFeedHashtag: string | null, feedFilters: Array<string> | null } }, getMakersInTournament: { __typename?: 'TournamentMakersResponse', makers: Array<{ __typename?: 'TournamentParticipant', user: { __typename?: 'User', id: number, avatar: string } }> } };

export type NostrKeysMetadataQueryVariables = Exact<{
  keys: Array<Scalars['String']> | Scalars['String'];
}>;


export type NostrKeysMetadataQuery = { __typename?: 'Query', usersByNostrKeys: Array<{ __typename?: 'NostrKeyWithUser', key: string, user: { __typename?: 'User', id: number, name: string, avatar: string } }> };

export type VoteMutationVariables = Exact<{
  itemType: Vote_Item_Type;
  itemId: Scalars['Int'];
  amountInSat: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Vote', id: number, amount_in_sat: number, payment_request: string, payment_hash: string, paid: boolean, item_type: Vote_Item_Type, item_id: number } };

export type ConfirmVoteMutationVariables = Exact<{
  paymentRequest: Scalars['String'];
  preimage: Scalars['String'];
}>;


export type ConfirmVoteMutation = { __typename?: 'Mutation', confirmVote: { __typename?: 'Vote', id: number, amount_in_sat: number, payment_request: string, payment_hash: string, paid: boolean, item_type: Vote_Item_Type, item_id: number } };

export const UserBasicInfoFragmentDoc = gql`
    fragment UserBasicInfo on BaseUser {
  id
  name
  avatar
  join_date
  primary_nostr_key
  role
  jobTitle
  lightning_address
  website
  twitter
  discord
  github
  linkedin
  bio
  location
  last_seen_notification_time
}
    `;
export const UserRolesSkillsFragmentDoc = gql`
    fragment UserRolesSkills on BaseUser {
  skills {
    id
    title
  }
  roles {
    id
    title
    icon
    level
  }
}
    `;
export const ProjectDetailsFragmentDoc = gql`
    fragment ProjectDetails on Project {
  id
  title
  tagline
  description
  hashtag
  cover_image
  thumbnail_image
  launch_status
  twitter
  discord
  github
  slack
  telegram
  figma
  replit
  npub
  screenshots
  website
  lightning_address
  votes_count
  category {
    id
    icon
    title
  }
  permissions
  members {
    role
    user {
      id
      name
      jobTitle
      avatar
    }
  }
  awards {
    title
    image
    url
    id
  }
  tags {
    id
    title
  }
  recruit_roles {
    id
    title
    icon
    level
  }
  capabilities {
    id
    title
    icon
  }
}
    `;
export const OfficialTagsDocument = gql`
    query OfficialTags {
  officialTags {
    id
    title
    icon
    description
  }
}
    `;

/**
 * __useOfficialTagsQuery__
 *
 * To run a query within a React component, call `useOfficialTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficialTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficialTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOfficialTagsQuery(baseOptions?: Apollo.QueryHookOptions<OfficialTagsQuery, OfficialTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OfficialTagsQuery, OfficialTagsQueryVariables>(OfficialTagsDocument, options);
      }
export function useOfficialTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OfficialTagsQuery, OfficialTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OfficialTagsQuery, OfficialTagsQueryVariables>(OfficialTagsDocument, options);
        }
export type OfficialTagsQueryHookResult = ReturnType<typeof useOfficialTagsQuery>;
export type OfficialTagsLazyQueryHookResult = ReturnType<typeof useOfficialTagsLazyQuery>;
export type OfficialTagsQueryResult = Apollo.QueryResult<OfficialTagsQuery, OfficialTagsQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($value: String!) {
  searchUsers(value: $value) {
    id
    name
    avatar
    jobTitle
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const NavCategoriesDocument = gql`
    query NavCategories {
  allCategories {
    id
    title
    icon
    votes_sum
  }
}
    `;

/**
 * __useNavCategoriesQuery__
 *
 * To run a query within a React component, call `useNavCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNavCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<NavCategoriesQuery, NavCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NavCategoriesQuery, NavCategoriesQueryVariables>(NavCategoriesDocument, options);
      }
export function useNavCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NavCategoriesQuery, NavCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NavCategoriesQuery, NavCategoriesQueryVariables>(NavCategoriesDocument, options);
        }
export type NavCategoriesQueryHookResult = ReturnType<typeof useNavCategoriesQuery>;
export type NavCategoriesLazyQueryHookResult = ReturnType<typeof useNavCategoriesLazyQuery>;
export type NavCategoriesQueryResult = Apollo.QueryResult<NavCategoriesQuery, NavCategoriesQueryVariables>;
export const UpdateLastSeenNotificationTimeDocument = gql`
    mutation UpdateLastSeenNotificationTime($timestamp: String!) {
  updateLastSeenNotificationTime(timestamp: $timestamp) {
    id
    last_seen_notification_time
  }
}
    `;
export type UpdateLastSeenNotificationTimeMutationFn = Apollo.MutationFunction<UpdateLastSeenNotificationTimeMutation, UpdateLastSeenNotificationTimeMutationVariables>;

/**
 * __useUpdateLastSeenNotificationTimeMutation__
 *
 * To run a mutation, you first call `useUpdateLastSeenNotificationTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastSeenNotificationTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastSeenNotificationTimeMutation, { data, loading, error }] = useUpdateLastSeenNotificationTimeMutation({
 *   variables: {
 *      timestamp: // value for 'timestamp'
 *   },
 * });
 */
export function useUpdateLastSeenNotificationTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLastSeenNotificationTimeMutation, UpdateLastSeenNotificationTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLastSeenNotificationTimeMutation, UpdateLastSeenNotificationTimeMutationVariables>(UpdateLastSeenNotificationTimeDocument, options);
      }
export type UpdateLastSeenNotificationTimeMutationHookResult = ReturnType<typeof useUpdateLastSeenNotificationTimeMutation>;
export type UpdateLastSeenNotificationTimeMutationResult = Apollo.MutationResult<UpdateLastSeenNotificationTimeMutation>;
export type UpdateLastSeenNotificationTimeMutationOptions = Apollo.BaseMutationOptions<UpdateLastSeenNotificationTimeMutation, UpdateLastSeenNotificationTimeMutationVariables>;
export const SearchProjectsDocument = gql`
    query SearchProjects($search: String!) {
  searchProjects(search: $search) {
    id
    thumbnail_image
    title
    category {
      title
      id
    }
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    avatar
    jobTitle
    bio
    primary_nostr_key
    last_seen_notification_time
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const DonationsStatsDocument = gql`
    query DonationsStats {
  getDonationsStats {
    prizes
    touranments
    donations
    applications
  }
}
    `;

/**
 * __useDonationsStatsQuery__
 *
 * To run a query within a React component, call `useDonationsStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationsStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationsStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDonationsStatsQuery(baseOptions?: Apollo.QueryHookOptions<DonationsStatsQuery, DonationsStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationsStatsQuery, DonationsStatsQueryVariables>(DonationsStatsDocument, options);
      }
export function useDonationsStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationsStatsQuery, DonationsStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationsStatsQuery, DonationsStatsQueryVariables>(DonationsStatsDocument, options);
        }
export type DonationsStatsQueryHookResult = ReturnType<typeof useDonationsStatsQuery>;
export type DonationsStatsLazyQueryHookResult = ReturnType<typeof useDonationsStatsLazyQuery>;
export type DonationsStatsQueryResult = Apollo.QueryResult<DonationsStatsQuery, DonationsStatsQueryVariables>;
export const DonateDocument = gql`
    mutation Donate($amountInSat: Int!) {
  donate(amount_in_sat: $amountInSat) {
    id
    amount
    payment_request
    payment_hash
  }
}
    `;
export type DonateMutationFn = Apollo.MutationFunction<DonateMutation, DonateMutationVariables>;

/**
 * __useDonateMutation__
 *
 * To run a mutation, you first call `useDonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [donateMutation, { data, loading, error }] = useDonateMutation({
 *   variables: {
 *      amountInSat: // value for 'amountInSat'
 *   },
 * });
 */
export function useDonateMutation(baseOptions?: Apollo.MutationHookOptions<DonateMutation, DonateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DonateMutation, DonateMutationVariables>(DonateDocument, options);
      }
export type DonateMutationHookResult = ReturnType<typeof useDonateMutation>;
export type DonateMutationResult = Apollo.MutationResult<DonateMutation>;
export type DonateMutationOptions = Apollo.BaseMutationOptions<DonateMutation, DonateMutationVariables>;
export const ConfirmDonationDocument = gql`
    mutation ConfirmDonation($paymentRequest: String!, $preimage: String!) {
  confirmDonation(payment_request: $paymentRequest, preimage: $preimage) {
    id
    amount
    paid
  }
}
    `;
export type ConfirmDonationMutationFn = Apollo.MutationFunction<ConfirmDonationMutation, ConfirmDonationMutationVariables>;

/**
 * __useConfirmDonationMutation__
 *
 * To run a mutation, you first call `useConfirmDonationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmDonationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmDonationMutation, { data, loading, error }] = useConfirmDonationMutation({
 *   variables: {
 *      paymentRequest: // value for 'paymentRequest'
 *      preimage: // value for 'preimage'
 *   },
 * });
 */
export function useConfirmDonationMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmDonationMutation, ConfirmDonationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmDonationMutation, ConfirmDonationMutationVariables>(ConfirmDonationDocument, options);
      }
export type ConfirmDonationMutationHookResult = ReturnType<typeof useConfirmDonationMutation>;
export type ConfirmDonationMutationResult = Apollo.MutationResult<ConfirmDonationMutation>;
export type ConfirmDonationMutationOptions = Apollo.BaseMutationOptions<ConfirmDonationMutation, ConfirmDonationMutationVariables>;
export const GetHackathonsDocument = gql`
    query getHackathons($sortBy: String, $tag: Int) {
  getAllHackathons(sortBy: $sortBy, tag: $tag) {
    id
    title
    description
    cover_image
    start_date
    end_date
    location
    website
    tags {
      id
      title
      icon
    }
  }
}
    `;

/**
 * __useGetHackathonsQuery__
 *
 * To run a query within a React component, call `useGetHackathonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHackathonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHackathonsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useGetHackathonsQuery(baseOptions?: Apollo.QueryHookOptions<GetHackathonsQuery, GetHackathonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHackathonsQuery, GetHackathonsQueryVariables>(GetHackathonsDocument, options);
      }
export function useGetHackathonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHackathonsQuery, GetHackathonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHackathonsQuery, GetHackathonsQueryVariables>(GetHackathonsDocument, options);
        }
export type GetHackathonsQueryHookResult = ReturnType<typeof useGetHackathonsQuery>;
export type GetHackathonsLazyQueryHookResult = ReturnType<typeof useGetHackathonsLazyQuery>;
export type GetHackathonsQueryResult = Apollo.QueryResult<GetHackathonsQuery, GetHackathonsQueryVariables>;
export const GetActiveUsersDocument = gql`
    query GetActiveUsers($tagId: Int, $lastDays: Int) {
  activeUsers(tagId: $tagId, lastDays: $lastDays) {
    id
    name
    avatar
    jobTitle
  }
}
    `;

/**
 * __useGetActiveUsersQuery__
 *
 * To run a query within a React component, call `useGetActiveUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveUsersQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      lastDays: // value for 'lastDays'
 *   },
 * });
 */
export function useGetActiveUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveUsersQuery, GetActiveUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveUsersQuery, GetActiveUsersQueryVariables>(GetActiveUsersDocument, options);
      }
export function useGetActiveUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveUsersQuery, GetActiveUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveUsersQuery, GetActiveUsersQueryVariables>(GetActiveUsersDocument, options);
        }
export type GetActiveUsersQueryHookResult = ReturnType<typeof useGetActiveUsersQuery>;
export type GetActiveUsersLazyQueryHookResult = ReturnType<typeof useGetActiveUsersLazyQuery>;
export type GetActiveUsersQueryResult = Apollo.QueryResult<GetActiveUsersQuery, GetActiveUsersQueryVariables>;
export const RecentProjectsInTagDocument = gql`
    query recentProjectsInTag($tagId: Int!) {
  recentProjectsInTag(tagId: $tagId) {
    id
    title
    thumbnail_image
    hashtag
    category {
      id
      icon
      title
    }
    votes_count
  }
}
    `;

/**
 * __useRecentProjectsInTagQuery__
 *
 * To run a query within a React component, call `useRecentProjectsInTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentProjectsInTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentProjectsInTagQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useRecentProjectsInTagQuery(baseOptions: Apollo.QueryHookOptions<RecentProjectsInTagQuery, RecentProjectsInTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentProjectsInTagQuery, RecentProjectsInTagQueryVariables>(RecentProjectsInTagDocument, options);
      }
export function useRecentProjectsInTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentProjectsInTagQuery, RecentProjectsInTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentProjectsInTagQuery, RecentProjectsInTagQueryVariables>(RecentProjectsInTagDocument, options);
        }
export type RecentProjectsInTagQueryHookResult = ReturnType<typeof useRecentProjectsInTagQuery>;
export type RecentProjectsInTagLazyQueryHookResult = ReturnType<typeof useRecentProjectsInTagLazyQuery>;
export type RecentProjectsInTagQueryResult = Apollo.QueryResult<RecentProjectsInTagQuery, RecentProjectsInTagQueryVariables>;
export const TrendingPostsDocument = gql`
    query TrendingPosts {
  getTrendingPosts {
    ... on Story {
      id
      title
      author {
        id
        avatar
      }
    }
    ... on Bounty {
      id
      title
      author {
        id
        avatar
      }
    }
    ... on Question {
      id
      title
      author {
        id
        avatar
      }
    }
  }
}
    `;

/**
 * __useTrendingPostsQuery__
 *
 * To run a query within a React component, call `useTrendingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendingPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTrendingPostsQuery(baseOptions?: Apollo.QueryHookOptions<TrendingPostsQuery, TrendingPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrendingPostsQuery, TrendingPostsQueryVariables>(TrendingPostsDocument, options);
      }
export function useTrendingPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendingPostsQuery, TrendingPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrendingPostsQuery, TrendingPostsQueryVariables>(TrendingPostsDocument, options);
        }
export type TrendingPostsQueryHookResult = ReturnType<typeof useTrendingPostsQuery>;
export type TrendingPostsLazyQueryHookResult = ReturnType<typeof useTrendingPostsLazyQuery>;
export type TrendingPostsQueryResult = Apollo.QueryResult<TrendingPostsQuery, TrendingPostsQueryVariables>;
export const GetAllTopicsDocument = gql`
    query GetAllTopics {
  officialTags {
    id
    title
    icon
    posts_count
    long_description
  }
}
    `;

/**
 * __useGetAllTopicsQuery__
 *
 * To run a query within a React component, call `useGetAllTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTopicsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTopicsQuery, GetAllTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTopicsQuery, GetAllTopicsQueryVariables>(GetAllTopicsDocument, options);
      }
export function useGetAllTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTopicsQuery, GetAllTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTopicsQuery, GetAllTopicsQueryVariables>(GetAllTopicsDocument, options);
        }
export type GetAllTopicsQueryHookResult = ReturnType<typeof useGetAllTopicsQuery>;
export type GetAllTopicsLazyQueryHookResult = ReturnType<typeof useGetAllTopicsLazyQuery>;
export type GetAllTopicsQueryResult = Apollo.QueryResult<GetAllTopicsQuery, GetAllTopicsQueryVariables>;
export const GetMyDraftsDocument = gql`
    query GetMyDrafts($type: POST_TYPE!) {
  getMyDrafts(type: $type) {
    ... on Story {
      id
      title
      updatedAt
    }
    ... on Bounty {
      id
      title
      updatedAt
    }
    ... on Question {
      id
      title
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMyDraftsQuery__
 *
 * To run a query within a React component, call `useGetMyDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyDraftsQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetMyDraftsQuery(baseOptions: Apollo.QueryHookOptions<GetMyDraftsQuery, GetMyDraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyDraftsQuery, GetMyDraftsQueryVariables>(GetMyDraftsDocument, options);
      }
export function useGetMyDraftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyDraftsQuery, GetMyDraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyDraftsQuery, GetMyDraftsQueryVariables>(GetMyDraftsDocument, options);
        }
export type GetMyDraftsQueryHookResult = ReturnType<typeof useGetMyDraftsQuery>;
export type GetMyDraftsLazyQueryHookResult = ReturnType<typeof useGetMyDraftsLazyQuery>;
export type GetMyDraftsQueryResult = Apollo.QueryResult<GetMyDraftsQuery, GetMyDraftsQueryVariables>;
export const CreateStoryDocument = gql`
    mutation createStory($data: StoryInputType) {
  createStory(data: $data) {
    id
    title
    createdAt
    body
    tags {
      id
      title
    }
    votes_count
    is_published
    type
    cover_image
    project {
      id
      title
      hashtag
      thumbnail_image
    }
  }
}
    `;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const DeleteStoryDocument = gql`
    mutation deleteStory($deleteStoryId: Int!) {
  deleteStory(id: $deleteStoryId) {
    id
  }
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      deleteStoryId: // value for 'deleteStoryId'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, options);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
export const MyProjectsDocument = gql`
    query MyProjects {
  me {
    id
    projects {
      id
      title
      thumbnail_image
      category {
        id
        icon
        title
      }
    }
  }
}
    `;

/**
 * __useMyProjectsQuery__
 *
 * To run a query within a React component, call `useMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProjectsQuery, MyProjectsQueryVariables>(MyProjectsDocument, options);
      }
export function useMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProjectsQuery, MyProjectsQueryVariables>(MyProjectsDocument, options);
        }
export type MyProjectsQueryHookResult = ReturnType<typeof useMyProjectsQuery>;
export type MyProjectsLazyQueryHookResult = ReturnType<typeof useMyProjectsLazyQuery>;
export type MyProjectsQueryResult = Apollo.QueryResult<MyProjectsQuery, MyProjectsQueryVariables>;
export const FeedTagsDocument = gql`
    query FeedTags {
  officialTags {
    id
    title
    icon
  }
}
    `;

/**
 * __useFeedTagsQuery__
 *
 * To run a query within a React component, call `useFeedTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedTagsQuery(baseOptions?: Apollo.QueryHookOptions<FeedTagsQuery, FeedTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedTagsQuery, FeedTagsQueryVariables>(FeedTagsDocument, options);
      }
export function useFeedTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedTagsQuery, FeedTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedTagsQuery, FeedTagsQueryVariables>(FeedTagsDocument, options);
        }
export type FeedTagsQueryHookResult = ReturnType<typeof useFeedTagsQuery>;
export type FeedTagsLazyQueryHookResult = ReturnType<typeof useFeedTagsLazyQuery>;
export type FeedTagsQueryResult = Apollo.QueryResult<FeedTagsQuery, FeedTagsQueryVariables>;
export const FeedDocument = gql`
    query Feed($take: Int, $skip: Int, $sortBy: String, $tag: Int) {
  getFeed(take: $take, skip: $skip, sortBy: $sortBy, tag: $tag) {
    ... on Story {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      comments_count
      nostr_event_id
      project {
        id
        title
        thumbnail_image
        hashtag
      }
    }
    ... on Bounty {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      deadline
      reward_amount
      applicants_count
    }
    ... on Question {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      sortBy: // value for 'sortBy'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const PostDetailsDocument = gql`
    query PostDetails($id: Int!, $type: POST_TYPE!) {
  getPostById(id: $id, type: $type) {
    ... on Story {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
        primary_nostr_key
      }
      body
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      is_published
      nostr_event_id
      project {
        id
        title
        thumbnail_image
        hashtag
      }
    }
    ... on Bounty {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
        primary_nostr_key
      }
      body
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      deadline
      reward_amount
      applicants_count
      applications {
        id
        date
        workplan
        author {
          id
          name
          avatar
        }
      }
    }
    ... on Question {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
        primary_nostr_key
      }
      body
      tags {
        id
        title
      }
      votes_count
      type
    }
  }
}
    `;

/**
 * __usePostDetailsQuery__
 *
 * To run a query within a React component, call `usePostDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePostDetailsQuery(baseOptions: Apollo.QueryHookOptions<PostDetailsQuery, PostDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostDetailsQuery, PostDetailsQueryVariables>(PostDetailsDocument, options);
      }
export function usePostDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostDetailsQuery, PostDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostDetailsQuery, PostDetailsQueryVariables>(PostDetailsDocument, options);
        }
export type PostDetailsQueryHookResult = ReturnType<typeof usePostDetailsQuery>;
export type PostDetailsLazyQueryHookResult = ReturnType<typeof usePostDetailsLazyQuery>;
export type PostDetailsQueryResult = Apollo.QueryResult<PostDetailsQuery, PostDetailsQueryVariables>;
export const GetTagInfoDocument = gql`
    query GetTagInfo($tag: String) {
  getTagInfo(tag: $tag) {
    id
    title
    icon
    description
    long_description
    links {
      name
      url
    }
    moderators {
      id
      name
      avatar
    }
  }
}
    `;

/**
 * __useGetTagInfoQuery__
 *
 * To run a query within a React component, call `useGetTagInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagInfoQuery({
 *   variables: {
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useGetTagInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetTagInfoQuery, GetTagInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagInfoQuery, GetTagInfoQueryVariables>(GetTagInfoDocument, options);
      }
export function useGetTagInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagInfoQuery, GetTagInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagInfoQuery, GetTagInfoQueryVariables>(GetTagInfoDocument, options);
        }
export type GetTagInfoQueryHookResult = ReturnType<typeof useGetTagInfoQuery>;
export type GetTagInfoLazyQueryHookResult = ReturnType<typeof useGetTagInfoLazyQuery>;
export type GetTagInfoQueryResult = Apollo.QueryResult<GetTagInfoQuery, GetTagInfoQueryVariables>;
export const TagFeedDocument = gql`
    query TagFeed($take: Int, $skip: Int, $sortBy: String, $tag: Int) {
  getFeed(take: $take, skip: $skip, sortBy: $sortBy, tag: $tag) {
    ... on Story {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      comments_count
      nostr_event_id
      project {
        id
        title
        thumbnail_image
        hashtag
      }
    }
    ... on Bounty {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
      cover_image
      deadline
      reward_amount
      applicants_count
    }
    ... on Question {
      id
      title
      createdAt
      author {
        id
        name
        avatar
        join_date
      }
      excerpt
      tags {
        id
        title
      }
      votes_count
      type
    }
  }
}
    `;

/**
 * __useTagFeedQuery__
 *
 * To run a query within a React component, call `useTagFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagFeedQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      sortBy: // value for 'sortBy'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useTagFeedQuery(baseOptions?: Apollo.QueryHookOptions<TagFeedQuery, TagFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagFeedQuery, TagFeedQueryVariables>(TagFeedDocument, options);
      }
export function useTagFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagFeedQuery, TagFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagFeedQuery, TagFeedQueryVariables>(TagFeedDocument, options);
        }
export type TagFeedQueryHookResult = ReturnType<typeof useTagFeedQuery>;
export type TagFeedLazyQueryHookResult = ReturnType<typeof useTagFeedLazyQuery>;
export type TagFeedQueryResult = Apollo.QueryResult<TagFeedQuery, TagFeedQueryVariables>;
export const MyProfileAboutDocument = gql`
    query MyProfileAbout {
  me {
    private_data {
      email
    }
    ...UserBasicInfo
  }
}
    ${UserBasicInfoFragmentDoc}`;

/**
 * __useMyProfileAboutQuery__
 *
 * To run a query within a React component, call `useMyProfileAboutQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileAboutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileAboutQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileAboutQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileAboutQuery, MyProfileAboutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileAboutQuery, MyProfileAboutQueryVariables>(MyProfileAboutDocument, options);
      }
export function useMyProfileAboutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileAboutQuery, MyProfileAboutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileAboutQuery, MyProfileAboutQueryVariables>(MyProfileAboutDocument, options);
        }
export type MyProfileAboutQueryHookResult = ReturnType<typeof useMyProfileAboutQuery>;
export type MyProfileAboutLazyQueryHookResult = ReturnType<typeof useMyProfileAboutLazyQuery>;
export type MyProfileAboutQueryResult = Apollo.QueryResult<MyProfileAboutQuery, MyProfileAboutQueryVariables>;
export const UpdateProfileAboutDocument = gql`
    mutation updateProfileAbout($data: ProfileDetailsInput) {
  updateProfileDetails(data: $data) {
    private_data {
      email
    }
    ...UserBasicInfo
  }
}
    ${UserBasicInfoFragmentDoc}`;
export type UpdateProfileAboutMutationFn = Apollo.MutationFunction<UpdateProfileAboutMutation, UpdateProfileAboutMutationVariables>;

/**
 * __useUpdateProfileAboutMutation__
 *
 * To run a mutation, you first call `useUpdateProfileAboutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileAboutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileAboutMutation, { data, loading, error }] = useUpdateProfileAboutMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileAboutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileAboutMutation, UpdateProfileAboutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileAboutMutation, UpdateProfileAboutMutationVariables>(UpdateProfileAboutDocument, options);
      }
export type UpdateProfileAboutMutationHookResult = ReturnType<typeof useUpdateProfileAboutMutation>;
export type UpdateProfileAboutMutationResult = Apollo.MutationResult<UpdateProfileAboutMutation>;
export type UpdateProfileAboutMutationOptions = Apollo.BaseMutationOptions<UpdateProfileAboutMutation, UpdateProfileAboutMutationVariables>;
export const MyNostrKeysDocument = gql`
    query MyNostrKeys {
  me {
    id
    private_data {
      default_nostr_prv_key
      default_nostr_pub_key
    }
  }
}
    `;

/**
 * __useMyNostrKeysQuery__
 *
 * To run a query within a React component, call `useMyNostrKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNostrKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNostrKeysQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNostrKeysQuery(baseOptions?: Apollo.QueryHookOptions<MyNostrKeysQuery, MyNostrKeysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNostrKeysQuery, MyNostrKeysQueryVariables>(MyNostrKeysDocument, options);
      }
export function useMyNostrKeysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNostrKeysQuery, MyNostrKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNostrKeysQuery, MyNostrKeysQueryVariables>(MyNostrKeysDocument, options);
        }
export type MyNostrKeysQueryHookResult = ReturnType<typeof useMyNostrKeysQuery>;
export type MyNostrKeysLazyQueryHookResult = ReturnType<typeof useMyNostrKeysLazyQuery>;
export type MyNostrKeysQueryResult = Apollo.QueryResult<MyNostrKeysQuery, MyNostrKeysQueryVariables>;
export const MyNostrSettingsDocument = gql`
    query MyNostrSettings {
  me {
    id
    nostr_keys {
      key
      createdAt
      label
      is_primary
    }
    private_data {
      default_nostr_prv_key
      default_nostr_pub_key
    }
  }
}
    `;

/**
 * __useMyNostrSettingsQuery__
 *
 * To run a query within a React component, call `useMyNostrSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNostrSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNostrSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNostrSettingsQuery(baseOptions?: Apollo.QueryHookOptions<MyNostrSettingsQuery, MyNostrSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNostrSettingsQuery, MyNostrSettingsQueryVariables>(MyNostrSettingsDocument, options);
      }
export function useMyNostrSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNostrSettingsQuery, MyNostrSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNostrSettingsQuery, MyNostrSettingsQueryVariables>(MyNostrSettingsDocument, options);
        }
export type MyNostrSettingsQueryHookResult = ReturnType<typeof useMyNostrSettingsQuery>;
export type MyNostrSettingsLazyQueryHookResult = ReturnType<typeof useMyNostrSettingsLazyQuery>;
export type MyNostrSettingsQueryResult = Apollo.QueryResult<MyNostrSettingsQuery, MyNostrSettingsQueryVariables>;
export const LinkNewNostrKeyDocument = gql`
    mutation LinkNewNostrKey($event: NostrEventInput) {
  linkNostrKey(event: $event) {
    id
    primary_nostr_key
    nostr_keys {
      key
      createdAt
      label
      is_primary
    }
  }
}
    `;
export type LinkNewNostrKeyMutationFn = Apollo.MutationFunction<LinkNewNostrKeyMutation, LinkNewNostrKeyMutationVariables>;

/**
 * __useLinkNewNostrKeyMutation__
 *
 * To run a mutation, you first call `useLinkNewNostrKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkNewNostrKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkNewNostrKeyMutation, { data, loading, error }] = useLinkNewNostrKeyMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useLinkNewNostrKeyMutation(baseOptions?: Apollo.MutationHookOptions<LinkNewNostrKeyMutation, LinkNewNostrKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkNewNostrKeyMutation, LinkNewNostrKeyMutationVariables>(LinkNewNostrKeyDocument, options);
      }
export type LinkNewNostrKeyMutationHookResult = ReturnType<typeof useLinkNewNostrKeyMutation>;
export type LinkNewNostrKeyMutationResult = Apollo.MutationResult<LinkNewNostrKeyMutation>;
export type LinkNewNostrKeyMutationOptions = Apollo.BaseMutationOptions<LinkNewNostrKeyMutation, LinkNewNostrKeyMutationVariables>;
export const UnlinkNostrKeyDocument = gql`
    mutation UnlinkNostrKey($key: String!) {
  unlinkNostrKey(key: $key) {
    id
    primary_nostr_key
    nostr_keys {
      key
      createdAt
      label
      is_primary
    }
  }
}
    `;
export type UnlinkNostrKeyMutationFn = Apollo.MutationFunction<UnlinkNostrKeyMutation, UnlinkNostrKeyMutationVariables>;

/**
 * __useUnlinkNostrKeyMutation__
 *
 * To run a mutation, you first call `useUnlinkNostrKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkNostrKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkNostrKeyMutation, { data, loading, error }] = useUnlinkNostrKeyMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useUnlinkNostrKeyMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkNostrKeyMutation, UnlinkNostrKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkNostrKeyMutation, UnlinkNostrKeyMutationVariables>(UnlinkNostrKeyDocument, options);
      }
export type UnlinkNostrKeyMutationHookResult = ReturnType<typeof useUnlinkNostrKeyMutation>;
export type UnlinkNostrKeyMutationResult = Apollo.MutationResult<UnlinkNostrKeyMutation>;
export type UnlinkNostrKeyMutationOptions = Apollo.BaseMutationOptions<UnlinkNostrKeyMutation, UnlinkNostrKeyMutationVariables>;
export const SetUserNostrKeyAsPrimaryDocument = gql`
    mutation SetUserNostrKeyAsPrimary($key: String!) {
  setUserNostrKeyAsPrimary(key: $key) {
    id
    primary_nostr_key
    nostr_keys {
      key
      is_primary
    }
  }
}
    `;
export type SetUserNostrKeyAsPrimaryMutationFn = Apollo.MutationFunction<SetUserNostrKeyAsPrimaryMutation, SetUserNostrKeyAsPrimaryMutationVariables>;

/**
 * __useSetUserNostrKeyAsPrimaryMutation__
 *
 * To run a mutation, you first call `useSetUserNostrKeyAsPrimaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserNostrKeyAsPrimaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserNostrKeyAsPrimaryMutation, { data, loading, error }] = useSetUserNostrKeyAsPrimaryMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useSetUserNostrKeyAsPrimaryMutation(baseOptions?: Apollo.MutationHookOptions<SetUserNostrKeyAsPrimaryMutation, SetUserNostrKeyAsPrimaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserNostrKeyAsPrimaryMutation, SetUserNostrKeyAsPrimaryMutationVariables>(SetUserNostrKeyAsPrimaryDocument, options);
      }
export type SetUserNostrKeyAsPrimaryMutationHookResult = ReturnType<typeof useSetUserNostrKeyAsPrimaryMutation>;
export type SetUserNostrKeyAsPrimaryMutationResult = Apollo.MutationResult<SetUserNostrKeyAsPrimaryMutation>;
export type SetUserNostrKeyAsPrimaryMutationOptions = Apollo.BaseMutationOptions<SetUserNostrKeyAsPrimaryMutation, SetUserNostrKeyAsPrimaryMutationVariables>;
export const MyProfilePreferencesDocument = gql`
    query MyProfilePreferences {
  me {
    id
    private_data {
      walletsKeys {
        key
        name
        createdAt
        is_current
      }
      default_nostr_prv_key
      default_nostr_pub_key
    }
  }
}
    `;

/**
 * __useMyProfilePreferencesQuery__
 *
 * To run a query within a React component, call `useMyProfilePreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfilePreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfilePreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfilePreferencesQuery(baseOptions?: Apollo.QueryHookOptions<MyProfilePreferencesQuery, MyProfilePreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfilePreferencesQuery, MyProfilePreferencesQueryVariables>(MyProfilePreferencesDocument, options);
      }
export function useMyProfilePreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfilePreferencesQuery, MyProfilePreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfilePreferencesQuery, MyProfilePreferencesQueryVariables>(MyProfilePreferencesDocument, options);
        }
export type MyProfilePreferencesQueryHookResult = ReturnType<typeof useMyProfilePreferencesQuery>;
export type MyProfilePreferencesLazyQueryHookResult = ReturnType<typeof useMyProfilePreferencesLazyQuery>;
export type MyProfilePreferencesQueryResult = Apollo.QueryResult<MyProfilePreferencesQuery, MyProfilePreferencesQueryVariables>;
export const UpdateUserPreferencesDocument = gql`
    mutation UpdateUserPreferences($walletsKeys: [UserKeyInputType!]) {
  updateUserPreferences(userKeys: $walletsKeys) {
    id
    private_data {
      walletsKeys {
        key
        name
      }
      default_nostr_prv_key
      default_nostr_pub_key
    }
  }
}
    `;
export type UpdateUserPreferencesMutationFn = Apollo.MutationFunction<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;

/**
 * __useUpdateUserPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateUserPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPreferencesMutation, { data, loading, error }] = useUpdateUserPreferencesMutation({
 *   variables: {
 *      walletsKeys: // value for 'walletsKeys'
 *   },
 * });
 */
export function useUpdateUserPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>(UpdateUserPreferencesDocument, options);
      }
export type UpdateUserPreferencesMutationHookResult = ReturnType<typeof useUpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationResult = Apollo.MutationResult<UpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;
export const MyProfileRolesSkillsDocument = gql`
    query MyProfileRolesSkills {
  me {
    id
    ...UserRolesSkills
  }
  getAllMakersRoles {
    id
    title
    icon
  }
  getAllMakersSkills {
    id
    title
  }
}
    ${UserRolesSkillsFragmentDoc}`;

/**
 * __useMyProfileRolesSkillsQuery__
 *
 * To run a query within a React component, call `useMyProfileRolesSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileRolesSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileRolesSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileRolesSkillsQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileRolesSkillsQuery, MyProfileRolesSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileRolesSkillsQuery, MyProfileRolesSkillsQueryVariables>(MyProfileRolesSkillsDocument, options);
      }
export function useMyProfileRolesSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileRolesSkillsQuery, MyProfileRolesSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileRolesSkillsQuery, MyProfileRolesSkillsQueryVariables>(MyProfileRolesSkillsDocument, options);
        }
export type MyProfileRolesSkillsQueryHookResult = ReturnType<typeof useMyProfileRolesSkillsQuery>;
export type MyProfileRolesSkillsLazyQueryHookResult = ReturnType<typeof useMyProfileRolesSkillsLazyQuery>;
export type MyProfileRolesSkillsQueryResult = Apollo.QueryResult<MyProfileRolesSkillsQuery, MyProfileRolesSkillsQueryVariables>;
export const UpdateUserRolesSkillsDocument = gql`
    mutation UpdateUserRolesSkills($data: ProfileRolesInput) {
  updateProfileRoles(data: $data) {
    id
    skills {
      id
      title
    }
    roles {
      id
      title
      icon
      level
    }
  }
}
    `;
export type UpdateUserRolesSkillsMutationFn = Apollo.MutationFunction<UpdateUserRolesSkillsMutation, UpdateUserRolesSkillsMutationVariables>;

/**
 * __useUpdateUserRolesSkillsMutation__
 *
 * To run a mutation, you first call `useUpdateUserRolesSkillsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRolesSkillsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRolesSkillsMutation, { data, loading, error }] = useUpdateUserRolesSkillsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserRolesSkillsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRolesSkillsMutation, UpdateUserRolesSkillsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRolesSkillsMutation, UpdateUserRolesSkillsMutationVariables>(UpdateUserRolesSkillsDocument, options);
      }
export type UpdateUserRolesSkillsMutationHookResult = ReturnType<typeof useUpdateUserRolesSkillsMutation>;
export type UpdateUserRolesSkillsMutationResult = Apollo.MutationResult<UpdateUserRolesSkillsMutation>;
export type UpdateUserRolesSkillsMutationOptions = Apollo.BaseMutationOptions<UpdateUserRolesSkillsMutation, UpdateUserRolesSkillsMutationVariables>;
export const ProfileDocument = gql`
    query profile($profileId: Int!) {
  profile(id: $profileId) {
    stories {
      id
      title
      createdAt
      tags {
        id
        title
        icon
      }
    }
    tournaments {
      id
      title
      thumbnail_image
      start_date
      end_date
    }
    projects {
      id
      hashtag
      title
      thumbnail_image
      category {
        id
        icon
        title
      }
    }
    similar_makers {
      id
      name
      avatar
      jobTitle
    }
    nostr_keys {
      key
      createdAt
      label
      is_primary
    }
    ...UserBasicInfo
    ...UserRolesSkills
  }
}
    ${UserBasicInfoFragmentDoc}
${UserRolesSkillsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const CategoryPageDocument = gql`
    query CategoryPage($categoryId: Int!) {
  projectsByCategory(category_id: $categoryId) {
    id
    thumbnail_image
    title
    votes_count
    category {
      title
      id
    }
  }
  getCategory(id: $categoryId) {
    id
    title
    cover_image
    apps_count
  }
}
    `;

/**
 * __useCategoryPageQuery__
 *
 * To run a query within a React component, call `useCategoryPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryPageQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryPageQuery(baseOptions: Apollo.QueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, options);
      }
export function useCategoryPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryPageQuery, CategoryPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryPageQuery, CategoryPageQueryVariables>(CategoryPageDocument, options);
        }
export type CategoryPageQueryHookResult = ReturnType<typeof useCategoryPageQuery>;
export type CategoryPageLazyQueryHookResult = ReturnType<typeof useCategoryPageLazyQuery>;
export type CategoryPageQueryResult = Apollo.QueryResult<CategoryPageQuery, CategoryPageQueryVariables>;
export const AllCategoriesDocument = gql`
    query AllCategories {
  allCategories {
    id
    title
    icon
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const ExploreProjectsDocument = gql`
    query ExploreProjects {
  hottestProjects(take: 10, skip: 0) {
    id
    title
    thumbnail_image
    votes_count
    category {
      title
      id
    }
  }
  newProjects {
    id
    title
    thumbnail_image
    votes_count
    category {
      title
      id
    }
  }
  allCategories {
    id
    title
    project {
      id
      thumbnail_image
      title
      votes_count
      category {
        title
        id
      }
    }
  }
}
    `;

/**
 * __useExploreProjectsQuery__
 *
 * To run a query within a React component, call `useExploreProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExploreProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ExploreProjectsQuery, ExploreProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExploreProjectsQuery, ExploreProjectsQueryVariables>(ExploreProjectsDocument, options);
      }
export function useExploreProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExploreProjectsQuery, ExploreProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExploreProjectsQuery, ExploreProjectsQueryVariables>(ExploreProjectsDocument, options);
        }
export type ExploreProjectsQueryHookResult = ReturnType<typeof useExploreProjectsQuery>;
export type ExploreProjectsLazyQueryHookResult = ReturnType<typeof useExploreProjectsLazyQuery>;
export type ExploreProjectsQueryResult = Apollo.QueryResult<ExploreProjectsQuery, ExploreProjectsQueryVariables>;
export const HottestProjectsDocument = gql`
    query HottestProjects {
  hottestProjects {
    id
    thumbnail_image
    title
    votes_count
    category {
      title
      id
    }
  }
}
    `;

/**
 * __useHottestProjectsQuery__
 *
 * To run a query within a React component, call `useHottestProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHottestProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHottestProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHottestProjectsQuery(baseOptions?: Apollo.QueryHookOptions<HottestProjectsQuery, HottestProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HottestProjectsQuery, HottestProjectsQueryVariables>(HottestProjectsDocument, options);
      }
export function useHottestProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HottestProjectsQuery, HottestProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HottestProjectsQuery, HottestProjectsQueryVariables>(HottestProjectsDocument, options);
        }
export type HottestProjectsQueryHookResult = ReturnType<typeof useHottestProjectsQuery>;
export type HottestProjectsLazyQueryHookResult = ReturnType<typeof useHottestProjectsLazyQuery>;
export type HottestProjectsQueryResult = Apollo.QueryResult<HottestProjectsQuery, HottestProjectsQueryVariables>;
export const GetAllCapabilitiesDocument = gql`
    query GetAllCapabilities {
  getAllCapabilities {
    id
    title
    icon
  }
}
    `;

/**
 * __useGetAllCapabilitiesQuery__
 *
 * To run a query within a React component, call `useGetAllCapabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCapabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCapabilitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCapabilitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCapabilitiesQuery, GetAllCapabilitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCapabilitiesQuery, GetAllCapabilitiesQueryVariables>(GetAllCapabilitiesDocument, options);
      }
export function useGetAllCapabilitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCapabilitiesQuery, GetAllCapabilitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCapabilitiesQuery, GetAllCapabilitiesQueryVariables>(GetAllCapabilitiesDocument, options);
        }
export type GetAllCapabilitiesQueryHookResult = ReturnType<typeof useGetAllCapabilitiesQuery>;
export type GetAllCapabilitiesLazyQueryHookResult = ReturnType<typeof useGetAllCapabilitiesLazyQuery>;
export type GetAllCapabilitiesQueryResult = Apollo.QueryResult<GetAllCapabilitiesQuery, GetAllCapabilitiesQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput) {
  createProject(input: $input) {
    project {
      ...ProjectDetails
    }
  }
}
    ${ProjectDetailsFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput) {
  updateProject(input: $input) {
    project {
      ...ProjectDetails
    }
  }
}
    ${ProjectDetailsFragmentDoc}`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const IsValidProjectHashtagDocument = gql`
    query IsValidProjectHashtag($hashtag: String!, $projectId: Int) {
  checkValidProjectHashtag(hashtag: $hashtag, projectId: $projectId)
}
    `;

/**
 * __useIsValidProjectHashtagQuery__
 *
 * To run a query within a React component, call `useIsValidProjectHashtagQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsValidProjectHashtagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsValidProjectHashtagQuery({
 *   variables: {
 *      hashtag: // value for 'hashtag'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useIsValidProjectHashtagQuery(baseOptions: Apollo.QueryHookOptions<IsValidProjectHashtagQuery, IsValidProjectHashtagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsValidProjectHashtagQuery, IsValidProjectHashtagQueryVariables>(IsValidProjectHashtagDocument, options);
      }
export function useIsValidProjectHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsValidProjectHashtagQuery, IsValidProjectHashtagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsValidProjectHashtagQuery, IsValidProjectHashtagQueryVariables>(IsValidProjectHashtagDocument, options);
        }
export type IsValidProjectHashtagQueryHookResult = ReturnType<typeof useIsValidProjectHashtagQuery>;
export type IsValidProjectHashtagLazyQueryHookResult = ReturnType<typeof useIsValidProjectHashtagLazyQuery>;
export type IsValidProjectHashtagQueryResult = Apollo.QueryResult<IsValidProjectHashtagQuery, IsValidProjectHashtagQueryVariables>;
export const GetTournamentsToRegisterDocument = gql`
    query GetTournamentsToRegister {
  getTournamentToRegister {
    id
    title
  }
}
    `;

/**
 * __useGetTournamentsToRegisterQuery__
 *
 * To run a query within a React component, call `useGetTournamentsToRegisterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentsToRegisterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentsToRegisterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTournamentsToRegisterQuery(baseOptions?: Apollo.QueryHookOptions<GetTournamentsToRegisterQuery, GetTournamentsToRegisterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentsToRegisterQuery, GetTournamentsToRegisterQueryVariables>(GetTournamentsToRegisterDocument, options);
      }
export function useGetTournamentsToRegisterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentsToRegisterQuery, GetTournamentsToRegisterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentsToRegisterQuery, GetTournamentsToRegisterQueryVariables>(GetTournamentsToRegisterDocument, options);
        }
export type GetTournamentsToRegisterQueryHookResult = ReturnType<typeof useGetTournamentsToRegisterQuery>;
export type GetTournamentsToRegisterLazyQueryHookResult = ReturnType<typeof useGetTournamentsToRegisterLazyQuery>;
export type GetTournamentsToRegisterQueryResult = Apollo.QueryResult<GetTournamentsToRegisterQuery, GetTournamentsToRegisterQueryVariables>;
export const ProjectDetailsDocument = gql`
    query ProjectDetails($projectId: Int, $projectTag: String) {
  getProject(id: $projectId, tag: $projectTag) {
    id
    title
    tagline
    description
    hashtag
    cover_image
    thumbnail_image
    launch_status
    twitter
    discord
    github
    slack
    figma
    replit
    npub
    telegram
    screenshots
    website
    lightning_address
    votes_count
    category {
      id
      icon
      title
    }
    permissions
    members {
      role
      user {
        id
        name
        jobTitle
        avatar
      }
    }
    awards {
      title
      image
      url
      id
    }
    tags {
      id
      title
    }
    recruit_roles {
      id
      title
      icon
      level
    }
    stories {
      id
      title
      createdAt
      tags {
        id
        title
        icon
      }
    }
    tournaments {
      id
      title
      thumbnail_image
      start_date
      end_date
    }
    capabilities {
      id
      title
      icon
    }
  }
}
    `;

/**
 * __useProjectDetailsQuery__
 *
 * To run a query within a React component, call `useProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      projectTag: // value for 'projectTag'
 *   },
 * });
 */
export function useProjectDetailsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectDetailsQuery, ProjectDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailsQuery, ProjectDetailsQueryVariables>(ProjectDetailsDocument, options);
      }
export function useProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailsQuery, ProjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailsQuery, ProjectDetailsQueryVariables>(ProjectDetailsDocument, options);
        }
export type ProjectDetailsQueryHookResult = ReturnType<typeof useProjectDetailsQuery>;
export type ProjectDetailsLazyQueryHookResult = ReturnType<typeof useProjectDetailsLazyQuery>;
export type ProjectDetailsQueryResult = Apollo.QueryResult<ProjectDetailsQuery, ProjectDetailsQueryVariables>;
export const SimilarProjectsDocument = gql`
    query SimilarProjects($projectId: Int!) {
  similarProjects(id: $projectId) {
    id
    title
    hashtag
    thumbnail_image
    category {
      id
      icon
      title
    }
  }
}
    `;

/**
 * __useSimilarProjectsQuery__
 *
 * To run a query within a React component, call `useSimilarProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimilarProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimilarProjectsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useSimilarProjectsQuery(baseOptions: Apollo.QueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, options);
      }
export function useSimilarProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimilarProjectsQuery, SimilarProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimilarProjectsQuery, SimilarProjectsQueryVariables>(SimilarProjectsDocument, options);
        }
export type SimilarProjectsQueryHookResult = ReturnType<typeof useSimilarProjectsQuery>;
export type SimilarProjectsLazyQueryHookResult = ReturnType<typeof useSimilarProjectsLazyQuery>;
export type SimilarProjectsQueryResult = Apollo.QueryResult<SimilarProjectsQuery, SimilarProjectsQueryVariables>;
export const ProjectDetailsModalDocument = gql`
    query ProjectDetailsModal($projectId: Int, $projectTag: String) {
  getProject(id: $projectId, tag: $projectTag) {
    id
    title
    tagline
    description
    hashtag
    cover_image
    thumbnail_image
    launch_status
    twitter
    discord
    github
    slack
    telegram
    figma
    replit
    npub
    screenshots
    website
    lightning_address
    votes_count
    category {
      id
      icon
      title
    }
    permissions
    members {
      role
      user {
        id
        name
        jobTitle
        avatar
      }
    }
    tags {
      id
      title
    }
    recruit_roles {
      id
      title
      icon
      level
    }
    capabilities {
      id
      title
      icon
    }
  }
}
    `;

/**
 * __useProjectDetailsModalQuery__
 *
 * To run a query within a React component, call `useProjectDetailsModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailsModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailsModalQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      projectTag: // value for 'projectTag'
 *   },
 * });
 */
export function useProjectDetailsModalQuery(baseOptions?: Apollo.QueryHookOptions<ProjectDetailsModalQuery, ProjectDetailsModalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailsModalQuery, ProjectDetailsModalQueryVariables>(ProjectDetailsModalDocument, options);
      }
export function useProjectDetailsModalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailsModalQuery, ProjectDetailsModalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailsModalQuery, ProjectDetailsModalQueryVariables>(ProjectDetailsModalDocument, options);
        }
export type ProjectDetailsModalQueryHookResult = ReturnType<typeof useProjectDetailsModalQuery>;
export type ProjectDetailsModalLazyQueryHookResult = ReturnType<typeof useProjectDetailsModalLazyQuery>;
export type ProjectDetailsModalQueryResult = Apollo.QueryResult<ProjectDetailsModalQuery, ProjectDetailsModalQueryVariables>;
export const GetAllRolesDocument = gql`
    query GetAllRoles {
  getAllMakersRoles {
    id
    title
    icon
  }
}
    `;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
      }
export function useGetAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<typeof useGetAllRolesLazyQuery>;
export type GetAllRolesQueryResult = Apollo.QueryResult<GetAllRolesQuery, GetAllRolesQueryVariables>;
export const GetMakersInTournamentDocument = gql`
    query GetMakersInTournament($tournamentIdOrSlug: String!, $take: Int, $skip: Int, $search: String, $roleId: Int, $openToConnect: Boolean) {
  getMakersInTournament(
    tournamentIdOrSlug: $tournamentIdOrSlug
    take: $take
    skip: $skip
    search: $search
    roleId: $roleId
    openToConnect: $openToConnect
  ) {
    hasNext
    hasPrev
    makers {
      hacking_status
      user {
        id
        name
        avatar
        jobTitle
        discord
        twitter
        linkedin
        github
        roles {
          id
          icon
          title
        }
        skills {
          id
          title
        }
      }
    }
  }
}
    `;

/**
 * __useGetMakersInTournamentQuery__
 *
 * To run a query within a React component, call `useGetMakersInTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMakersInTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMakersInTournamentQuery({
 *   variables: {
 *      tournamentIdOrSlug: // value for 'tournamentIdOrSlug'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      search: // value for 'search'
 *      roleId: // value for 'roleId'
 *      openToConnect: // value for 'openToConnect'
 *   },
 * });
 */
export function useGetMakersInTournamentQuery(baseOptions: Apollo.QueryHookOptions<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>(GetMakersInTournamentDocument, options);
      }
export function useGetMakersInTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>(GetMakersInTournamentDocument, options);
        }
export type GetMakersInTournamentQueryHookResult = ReturnType<typeof useGetMakersInTournamentQuery>;
export type GetMakersInTournamentLazyQueryHookResult = ReturnType<typeof useGetMakersInTournamentLazyQuery>;
export type GetMakersInTournamentQueryResult = Apollo.QueryResult<GetMakersInTournamentQuery, GetMakersInTournamentQueryVariables>;
export const GetProjectsInTournamentDocument = gql`
    query GetProjectsInTournament($tournamentId: Int!, $take: Int, $skip: Int, $trackId: Int, $roleId: Int, $search: String) {
  getProjectsInTournament(
    tournamentId: $tournamentId
    take: $take
    skip: $skip
    trackId: $trackId
    roleId: $roleId
    search: $search
  ) {
    allItemsCount
    hasNext
    hasPrev
    projects {
      id
      title
      description
      thumbnail_image
      members_count
      category {
        id
        title
        icon
      }
      members(take: 4) {
        user {
          id
          avatar
        }
      }
      recruit_roles {
        id
        title
        icon
        level
      }
    }
  }
}
    `;

/**
 * __useGetProjectsInTournamentQuery__
 *
 * To run a query within a React component, call `useGetProjectsInTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsInTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsInTournamentQuery({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      trackId: // value for 'trackId'
 *      roleId: // value for 'roleId'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetProjectsInTournamentQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsInTournamentQuery, GetProjectsInTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsInTournamentQuery, GetProjectsInTournamentQueryVariables>(GetProjectsInTournamentDocument, options);
      }
export function useGetProjectsInTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsInTournamentQuery, GetProjectsInTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsInTournamentQuery, GetProjectsInTournamentQueryVariables>(GetProjectsInTournamentDocument, options);
        }
export type GetProjectsInTournamentQueryHookResult = ReturnType<typeof useGetProjectsInTournamentQuery>;
export type GetProjectsInTournamentLazyQueryHookResult = ReturnType<typeof useGetProjectsInTournamentLazyQuery>;
export type GetProjectsInTournamentQueryResult = Apollo.QueryResult<GetProjectsInTournamentQuery, GetProjectsInTournamentQueryVariables>;
export const UpdateTournamentRegistrationDocument = gql`
    mutation UpdateTournamentRegistration($tournamentId: Int!, $data: UpdateTournamentRegistrationInput) {
  updateTournamentRegistration(tournament_id: $tournamentId, data: $data) {
    createdAt
    email
    hacking_status
  }
}
    `;
export type UpdateTournamentRegistrationMutationFn = Apollo.MutationFunction<UpdateTournamentRegistrationMutation, UpdateTournamentRegistrationMutationVariables>;

/**
 * __useUpdateTournamentRegistrationMutation__
 *
 * To run a mutation, you first call `useUpdateTournamentRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTournamentRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTournamentRegistrationMutation, { data, loading, error }] = useUpdateTournamentRegistrationMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTournamentRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTournamentRegistrationMutation, UpdateTournamentRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTournamentRegistrationMutation, UpdateTournamentRegistrationMutationVariables>(UpdateTournamentRegistrationDocument, options);
      }
export type UpdateTournamentRegistrationMutationHookResult = ReturnType<typeof useUpdateTournamentRegistrationMutation>;
export type UpdateTournamentRegistrationMutationResult = Apollo.MutationResult<UpdateTournamentRegistrationMutation>;
export type UpdateTournamentRegistrationMutationOptions = Apollo.BaseMutationOptions<UpdateTournamentRegistrationMutation, UpdateTournamentRegistrationMutationVariables>;
export const GetTournamentWinningProjectsDocument = gql`
    query GetTournamentWinningProjects($winning_projects: [String!]!) {
  getProjectsById(ids: $winning_projects) {
    id
    hashtag
    title
    tagline
    thumbnail_image
    category {
      id
      title
      icon
    }
  }
}
    `;

/**
 * __useGetTournamentWinningProjectsQuery__
 *
 * To run a query within a React component, call `useGetTournamentWinningProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentWinningProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentWinningProjectsQuery({
 *   variables: {
 *      winning_projects: // value for 'winning_projects'
 *   },
 * });
 */
export function useGetTournamentWinningProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetTournamentWinningProjectsQuery, GetTournamentWinningProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentWinningProjectsQuery, GetTournamentWinningProjectsQueryVariables>(GetTournamentWinningProjectsDocument, options);
      }
export function useGetTournamentWinningProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentWinningProjectsQuery, GetTournamentWinningProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentWinningProjectsQuery, GetTournamentWinningProjectsQueryVariables>(GetTournamentWinningProjectsDocument, options);
        }
export type GetTournamentWinningProjectsQueryHookResult = ReturnType<typeof useGetTournamentWinningProjectsQuery>;
export type GetTournamentWinningProjectsLazyQueryHookResult = ReturnType<typeof useGetTournamentWinningProjectsLazyQuery>;
export type GetTournamentWinningProjectsQueryResult = Apollo.QueryResult<GetTournamentWinningProjectsQuery, GetTournamentWinningProjectsQueryVariables>;
export const RegisterInTournamentDocument = gql`
    mutation RegisterInTournament($tournamentId: Int!, $data: RegisterInTournamentInput) {
  registerInTournament(tournament_id: $tournamentId, data: $data) {
    id
    in_tournament(id: $tournamentId)
  }
}
    `;
export type RegisterInTournamentMutationFn = Apollo.MutationFunction<RegisterInTournamentMutation, RegisterInTournamentMutationVariables>;

/**
 * __useRegisterInTournamentMutation__
 *
 * To run a mutation, you first call `useRegisterInTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterInTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerInTournamentMutation, { data, loading, error }] = useRegisterInTournamentMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterInTournamentMutation(baseOptions?: Apollo.MutationHookOptions<RegisterInTournamentMutation, RegisterInTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterInTournamentMutation, RegisterInTournamentMutationVariables>(RegisterInTournamentDocument, options);
      }
export type RegisterInTournamentMutationHookResult = ReturnType<typeof useRegisterInTournamentMutation>;
export type RegisterInTournamentMutationResult = Apollo.MutationResult<RegisterInTournamentMutation>;
export type RegisterInTournamentMutationOptions = Apollo.BaseMutationOptions<RegisterInTournamentMutation, RegisterInTournamentMutationVariables>;
export const AddProjectToTournamentDocument = gql`
    mutation AddProjectToTournament($input: AddProjectToTournamentInput) {
  addProjectToTournament(input: $input) {
    projects {
      track {
        id
        title
        icon
      }
      project {
        id
        title
        tagline
        hashtag
        thumbnail_image
        launch_status
        category {
          id
          title
          icon
        }
      }
    }
  }
}
    `;
export type AddProjectToTournamentMutationFn = Apollo.MutationFunction<AddProjectToTournamentMutation, AddProjectToTournamentMutationVariables>;

/**
 * __useAddProjectToTournamentMutation__
 *
 * To run a mutation, you first call `useAddProjectToTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectToTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectToTournamentMutation, { data, loading, error }] = useAddProjectToTournamentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProjectToTournamentMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectToTournamentMutation, AddProjectToTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectToTournamentMutation, AddProjectToTournamentMutationVariables>(AddProjectToTournamentDocument, options);
      }
export type AddProjectToTournamentMutationHookResult = ReturnType<typeof useAddProjectToTournamentMutation>;
export type AddProjectToTournamentMutationResult = Apollo.MutationResult<AddProjectToTournamentMutation>;
export type AddProjectToTournamentMutationOptions = Apollo.BaseMutationOptions<AddProjectToTournamentMutation, AddProjectToTournamentMutationVariables>;
export const MeTournamentDocument = gql`
    query MeTournament($id: Int!) {
  tournamentParticipationInfo(tournamentId: $id) {
    createdAt
    hacking_status
    projects {
      project {
        id
        title
        description
        thumbnail_image
        members_count
        category {
          id
          title
          icon
        }
        members(take: 4) {
          user {
            id
            avatar
          }
        }
        recruit_roles {
          id
          title
          icon
          level
        }
      }
      track {
        id
        title
        icon
      }
    }
  }
  me {
    id
    name
    avatar
    jobTitle
    twitter
    linkedin
    github
    ...UserRolesSkills
  }
}
    ${UserRolesSkillsFragmentDoc}`;

/**
 * __useMeTournamentQuery__
 *
 * To run a query within a React component, call `useMeTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeTournamentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMeTournamentQuery(baseOptions: Apollo.QueryHookOptions<MeTournamentQuery, MeTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeTournamentQuery, MeTournamentQueryVariables>(MeTournamentDocument, options);
      }
export function useMeTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeTournamentQuery, MeTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeTournamentQuery, MeTournamentQueryVariables>(MeTournamentDocument, options);
        }
export type MeTournamentQueryHookResult = ReturnType<typeof useMeTournamentQuery>;
export type MeTournamentLazyQueryHookResult = ReturnType<typeof useMeTournamentLazyQuery>;
export type MeTournamentQueryResult = Apollo.QueryResult<MeTournamentQuery, MeTournamentQueryVariables>;
export const GetTournamentByIdDocument = gql`
    query GetTournamentById($idOrSlug: String!) {
  getTournamentById(idOrSlug: $idOrSlug) {
    id
    title
    description
    thumbnail_image
    cover_image
    start_date
    end_date
    location
    website
    events_count
    makers_count
    projects_count
    prizes {
      title
      description
      image
      positions {
        position
        reward
        project
      }
      additional_prizes {
        text
        url
      }
    }
    tracks {
      id
      title
      icon
    }
    judges {
      name
      company
      avatar
    }
    events {
      id
      title
      image
      description
      starts_at
      ends_at
      location
      website
      type
      links
    }
    faqs {
      question
      answer
    }
    contacts {
      type
      url
    }
    partners {
      title
      items {
        image
        url
        isBigImage
      }
    }
    schedule {
      date
      events {
        title
        time
        timezone
        url
        type
        location
      }
    }
    makers_deals {
      title
      description
      url
    }
    config {
      registerationOpen
      projectsSubmissionOpen
      ideasRootNostrEventId
      showFeed
      mainFeedHashtag
      feedFilters
    }
  }
  getMakersInTournament(tournamentIdOrSlug: $idOrSlug, take: 4) {
    makers {
      user {
        id
        avatar
      }
    }
  }
  pubkeysOfMakersInTournament(tournamentIdOrSlug: $idOrSlug)
  pubkeysOfProjectsInTournament(tournamentIdOrSlug: $idOrSlug)
}
    `;

/**
 * __useGetTournamentByIdQuery__
 *
 * To run a query within a React component, call `useGetTournamentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentByIdQuery({
 *   variables: {
 *      idOrSlug: // value for 'idOrSlug'
 *   },
 * });
 */
export function useGetTournamentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>(GetTournamentByIdDocument, options);
      }
export function useGetTournamentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>(GetTournamentByIdDocument, options);
        }
export type GetTournamentByIdQueryHookResult = ReturnType<typeof useGetTournamentByIdQuery>;
export type GetTournamentByIdLazyQueryHookResult = ReturnType<typeof useGetTournamentByIdLazyQuery>;
export type GetTournamentByIdQueryResult = Apollo.QueryResult<GetTournamentByIdQuery, GetTournamentByIdQueryVariables>;
export const NostrKeysMetadataDocument = gql`
    query NostrKeysMetadata($keys: [String!]!) {
  usersByNostrKeys(keys: $keys) {
    key
    user {
      id
      name
      avatar
    }
  }
}
    `;

/**
 * __useNostrKeysMetadataQuery__
 *
 * To run a query within a React component, call `useNostrKeysMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useNostrKeysMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNostrKeysMetadataQuery({
 *   variables: {
 *      keys: // value for 'keys'
 *   },
 * });
 */
export function useNostrKeysMetadataQuery(baseOptions: Apollo.QueryHookOptions<NostrKeysMetadataQuery, NostrKeysMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NostrKeysMetadataQuery, NostrKeysMetadataQueryVariables>(NostrKeysMetadataDocument, options);
      }
export function useNostrKeysMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NostrKeysMetadataQuery, NostrKeysMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NostrKeysMetadataQuery, NostrKeysMetadataQueryVariables>(NostrKeysMetadataDocument, options);
        }
export type NostrKeysMetadataQueryHookResult = ReturnType<typeof useNostrKeysMetadataQuery>;
export type NostrKeysMetadataLazyQueryHookResult = ReturnType<typeof useNostrKeysMetadataLazyQuery>;
export type NostrKeysMetadataQueryResult = Apollo.QueryResult<NostrKeysMetadataQuery, NostrKeysMetadataQueryVariables>;
export const VoteDocument = gql`
    mutation Vote($itemType: VOTE_ITEM_TYPE!, $itemId: Int!, $amountInSat: Int!) {
  vote(item_type: $itemType, item_id: $itemId, amount_in_sat: $amountInSat) {
    id
    amount_in_sat
    payment_request
    payment_hash
    paid
    item_type
    item_id
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      itemType: // value for 'itemType'
 *      itemId: // value for 'itemId'
 *      amountInSat: // value for 'amountInSat'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const ConfirmVoteDocument = gql`
    mutation ConfirmVote($paymentRequest: String!, $preimage: String!) {
  confirmVote(payment_request: $paymentRequest, preimage: $preimage) {
    id
    amount_in_sat
    payment_request
    payment_hash
    paid
    item_type
    item_id
  }
}
    `;
export type ConfirmVoteMutationFn = Apollo.MutationFunction<ConfirmVoteMutation, ConfirmVoteMutationVariables>;

/**
 * __useConfirmVoteMutation__
 *
 * To run a mutation, you first call `useConfirmVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmVoteMutation, { data, loading, error }] = useConfirmVoteMutation({
 *   variables: {
 *      paymentRequest: // value for 'paymentRequest'
 *      preimage: // value for 'preimage'
 *   },
 * });
 */
export function useConfirmVoteMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmVoteMutation, ConfirmVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmVoteMutation, ConfirmVoteMutationVariables>(ConfirmVoteDocument, options);
      }
export type ConfirmVoteMutationHookResult = ReturnType<typeof useConfirmVoteMutation>;
export type ConfirmVoteMutationResult = Apollo.MutationResult<ConfirmVoteMutation>;
export type ConfirmVoteMutationOptions = Apollo.BaseMutationOptions<ConfirmVoteMutation, ConfirmVoteMutationVariables>;