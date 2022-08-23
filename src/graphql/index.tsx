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
  email: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  jobTitle: Maybe<Scalars['String']>;
  join_date: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Maybe<Scalars['String']>;
  roles: Array<MakerRole>;
  similar_makers: Array<User>;
  skills: Array<MakerSkill>;
  stories: Array<Story>;
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

export type Bounty = PostBase & {
  __typename?: 'Bounty';
  applicants_count: Scalars['Int'];
  applications: Array<BountyApplication>;
  author: Author;
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
  author: Author;
  date: Scalars['String'];
  id: Scalars['Int'];
  workplan: Scalars['String'];
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
  confirmDonation: Donation;
  confirmVote: Vote;
  createStory: Maybe<Story>;
  deleteStory: Maybe<Story>;
  donate: Donation;
  updateProfileDetails: Maybe<MyProfile>;
  updateProfileRoles: Maybe<MyProfile>;
  updateUserPreferences: MyProfile;
  vote: Vote;
};


export type MutationConfirmDonationArgs = {
  payment_request: Scalars['String'];
  preimage: Scalars['String'];
};


export type MutationConfirmVoteArgs = {
  payment_request: Scalars['String'];
  preimage: Scalars['String'];
};


export type MutationCreateStoryArgs = {
  data: InputMaybe<StoryInputType>;
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int'];
};


export type MutationDonateArgs = {
  amount_in_sat: Scalars['Int'];
};


export type MutationUpdateProfileDetailsArgs = {
  data: InputMaybe<ProfileDetailsInput>;
};


export type MutationUpdateProfileRolesArgs = {
  data: InputMaybe<ProfileRolesInput>;
};


export type MutationUpdateUserPreferencesArgs = {
  userKeys: InputMaybe<Array<UserKeyInputType>>;
};


export type MutationVoteArgs = {
  amount_in_sat: Scalars['Int'];
  item_id: Scalars['Int'];
  item_type: Vote_Item_Type;
};

export type MyProfile = BaseUser & {
  __typename?: 'MyProfile';
  avatar: Scalars['String'];
  bio: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  jobTitle: Maybe<Scalars['String']>;
  join_date: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nostr_prv_key: Maybe<Scalars['String']>;
  nostr_pub_key: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
  roles: Array<MakerRole>;
  similar_makers: Array<User>;
  skills: Array<MakerSkill>;
  stories: Array<Story>;
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  walletsKeys: Array<WalletKey>;
  website: Maybe<Scalars['String']>;
};

export enum Post_Type {
  Bounty = 'Bounty',
  Question = 'Question',
  Story = 'Story'
}

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
  author: Author;
  body: Scalars['String'];
  created_at: Scalars['Date'];
  id: Scalars['Int'];
  parentId: Maybe<Scalars['Int']>;
  votes_count: Scalars['Int'];
};

export type ProfileDetailsInput = {
  avatar: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  jobTitle: InputMaybe<Scalars['String']>;
  lightning_address: InputMaybe<Scalars['String']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};

export type ProfileRolesInput = {
  roles: Array<MakerRoleInput>;
  skills: Array<MakerSkillInput>;
};

export type Project = {
  __typename?: 'Project';
  awards: Array<Award>;
  category: Category;
  cover_image: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  lightning_address: Maybe<Scalars['String']>;
  lnurl_callback_url: Maybe<Scalars['String']>;
  screenshots: Array<Scalars['String']>;
  tags: Array<Tag>;
  thumbnail_image: Scalars['String'];
  title: Scalars['String'];
  votes_count: Scalars['Int'];
  website: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<Category>;
  allProjects: Array<Project>;
  getAllHackathons: Array<Hackathon>;
  getAllMakersRoles: Array<GenericMakerRole>;
  getAllMakersSkills: Array<MakerSkill>;
  getCategory: Category;
  getDonationsStats: DonationsStats;
  getFeed: Array<Post>;
  getLnurlDetailsForProject: LnurlDetails;
  getMyDrafts: Array<Post>;
  getPostById: Post;
  getProject: Project;
  getTrendingPosts: Array<Post>;
  hottestProjects: Array<Project>;
  me: Maybe<MyProfile>;
  newProjects: Array<Project>;
  officialTags: Array<Tag>;
  popularTags: Array<Tag>;
  profile: Maybe<User>;
  projectsByCategory: Array<Project>;
  searchProjects: Array<Project>;
  similarMakers: Array<User>;
};


export type QueryAllProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
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


export type QueryGetMyDraftsArgs = {
  type: Post_Type;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Int'];
  type: Post_Type;
};


export type QueryGetProjectArgs = {
  id: Scalars['Int'];
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


export type QuerySearchProjectsArgs = {
  search: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySimilarMakersArgs = {
  id: Scalars['Int'];
};

export type Question = PostBase & {
  __typename?: 'Question';
  author: Author;
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

export enum RoleLevelEnum {
  Advanced = 'Advanced',
  Beginner = 'Beginner',
  Hobbyist = 'Hobbyist',
  Intermediate = 'Intermediate',
  Pro = 'Pro'
}

export type Story = PostBase & {
  __typename?: 'Story';
  author: Author;
  body: Scalars['String'];
  comments: Array<PostComment>;
  comments_count: Scalars['Int'];
  cover_image: Maybe<Scalars['String']>;
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

export type StoryInputType = {
  body: Scalars['String'];
  cover_image: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  is_published: InputMaybe<Scalars['Boolean']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isOfficial: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type Tournament = {
  __typename?: 'Tournament';
  cover_image: Scalars['String'];
  description: Scalars['String'];
  end_date: Scalars['Date'];
  id: Scalars['Int'];
  start_date: Scalars['Date'];
  tags: Array<Tag>;
  thumbnail_image: Scalars['String'];
  title: Scalars['String'];
  website: Scalars['String'];
};

export type User = BaseUser & {
  __typename?: 'User';
  avatar: Scalars['String'];
  bio: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  jobTitle: Maybe<Scalars['String']>;
  join_date: Scalars['Date'];
  lightning_address: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Maybe<Scalars['String']>;
  roles: Array<MakerRole>;
  similar_makers: Array<User>;
  skills: Array<MakerSkill>;
  stories: Array<Story>;
  tournaments: Array<Tournament>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

export type UserKeyInputType = {
  key: Scalars['String'];
  name: Scalars['String'];
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
  key: Scalars['String'];
  name: Scalars['String'];
};

export type OfficialTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficialTagsQuery = { __typename?: 'Query', officialTags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null, description: string | null }> };

export type NavCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type NavCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, title: string, icon: string | null, votes_sum: number }> };

export type SearchProjectsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: Array<{ __typename?: 'Project', id: number, thumbnail_image: string, title: string, category: { __typename?: 'Category', title: string, id: number } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MyProfile', id: number, name: string, avatar: string, join_date: any, jobTitle: string | null, bio: string | null } | null };

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

export type TrendingPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type TrendingPostsQuery = { __typename?: 'Query', getTrendingPosts: Array<{ __typename?: 'Bounty', id: number, title: string, author: { __typename?: 'Author', id: number, avatar: string } } | { __typename?: 'Question', id: number, title: string, author: { __typename?: 'Author', id: number, avatar: string } } | { __typename?: 'Story', id: number, title: string, author: { __typename?: 'Author', id: number, avatar: string } }> };

export type GetMyDraftsQueryVariables = Exact<{
  type: Post_Type;
}>;


export type GetMyDraftsQuery = { __typename?: 'Query', getMyDrafts: Array<{ __typename?: 'Bounty', id: number, title: string, updatedAt: any } | { __typename?: 'Question', id: number, title: string, updatedAt: any } | { __typename?: 'Story', id: number, title: string, updatedAt: any }> };

export type CreateStoryMutationVariables = Exact<{
  data: InputMaybe<StoryInputType>;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: number, title: string, createdAt: any, body: string, votes_count: number, is_published: boolean | null, type: string, cover_image: string | null, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | null };

export type DeleteStoryMutationVariables = Exact<{
  deleteStoryId: Scalars['Int'];
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory: { __typename?: 'Story', id: number } | null };

export type PopularTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularTagsQuery = { __typename?: 'Query', popularTags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> };

export type FeedQueryVariables = Exact<{
  take: InputMaybe<Scalars['Int']>;
  skip: InputMaybe<Scalars['Int']>;
  sortBy: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Int']>;
}>;


export type FeedQuery = { __typename?: 'Query', getFeed: Array<{ __typename?: 'Bounty', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, deadline: string, reward_amount: number, applicants_count: number, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Question', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Story', id: number, title: string, createdAt: any, excerpt: string, votes_count: number, type: string, cover_image: string | null, comments_count: number, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> }> };

export type PostDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
  type: Post_Type;
}>;


export type PostDetailsQuery = { __typename?: 'Query', getPostById: { __typename?: 'Bounty', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, cover_image: string | null, deadline: string, reward_amount: number, applicants_count: number, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }>, applications: Array<{ __typename?: 'BountyApplication', id: number, date: string, workplan: string, author: { __typename?: 'Author', id: number, name: string, avatar: string } }> } | { __typename?: 'Question', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } | { __typename?: 'Story', id: number, title: string, createdAt: any, body: string, votes_count: number, type: string, cover_image: string | null, is_published: boolean | null, author: { __typename?: 'Author', id: number, name: string, avatar: string, join_date: any }, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } };

type UserBasicInfo_MyProfile_Fragment = { __typename?: 'MyProfile', id: number, name: string, avatar: string, join_date: any, role: string | null, email: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null };

type UserBasicInfo_User_Fragment = { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, role: string | null, email: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null };

export type UserBasicInfoFragment = UserBasicInfo_MyProfile_Fragment | UserBasicInfo_User_Fragment;

export type MyProfileAboutQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileAboutQuery = { __typename?: 'Query', me: { __typename?: 'MyProfile', id: number, name: string, avatar: string, join_date: any, role: string | null, email: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null } | null };

export type UpdateProfileAboutMutationVariables = Exact<{
  data: InputMaybe<ProfileDetailsInput>;
}>;


export type UpdateProfileAboutMutation = { __typename?: 'Mutation', updateProfileDetails: { __typename?: 'MyProfile', id: number, name: string, avatar: string, join_date: any, role: string | null, email: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null } | null };

export type MyProfilePreferencesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfilePreferencesQuery = { __typename?: 'Query', me: { __typename?: 'MyProfile', id: number, nostr_prv_key: string | null, nostr_pub_key: string | null, walletsKeys: Array<{ __typename?: 'WalletKey', key: string, name: string }> } | null };

export type UpdateUserPreferencesMutationVariables = Exact<{
  walletsKeys: InputMaybe<Array<UserKeyInputType> | UserKeyInputType>;
}>;


export type UpdateUserPreferencesMutation = { __typename?: 'Mutation', updateUserPreferences: { __typename?: 'MyProfile', id: number, nostr_pub_key: string | null, nostr_prv_key: string | null, walletsKeys: Array<{ __typename?: 'WalletKey', key: string, name: string }> } };

type UserRolesSkills_MyProfile_Fragment = { __typename?: 'MyProfile', skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> };

type UserRolesSkills_User_Fragment = { __typename?: 'User', skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> };

export type UserRolesSkillsFragment = UserRolesSkills_MyProfile_Fragment | UserRolesSkills_User_Fragment;

export type MyProfileRolesSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileRolesSkillsQuery = { __typename?: 'Query', me: { __typename?: 'MyProfile', id: number, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null, getAllMakersRoles: Array<{ __typename?: 'GenericMakerRole', id: number, title: string, icon: string }>, getAllMakersSkills: Array<{ __typename?: 'MakerSkill', id: number, title: string }> };

export type UpdateUserRolesSkillsMutationVariables = Exact<{
  data: InputMaybe<ProfileRolesInput>;
}>;


export type UpdateUserRolesSkillsMutation = { __typename?: 'Mutation', updateProfileRoles: { __typename?: 'MyProfile', id: number, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null };

export type ProfileQueryVariables = Exact<{
  profileId: Scalars['Int'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, name: string, avatar: string, join_date: any, role: string | null, email: string | null, jobTitle: string | null, lightning_address: string | null, website: string | null, twitter: string | null, github: string | null, linkedin: string | null, bio: string | null, location: string | null, stories: Array<{ __typename?: 'Story', id: number, title: string, createdAt: any, tags: Array<{ __typename?: 'Tag', id: number, title: string, icon: string | null }> }>, tournaments: Array<{ __typename?: 'Tournament', id: number, title: string, thumbnail_image: string, start_date: any, end_date: any }>, similar_makers: Array<{ __typename?: 'User', id: number, name: string, avatar: string, jobTitle: string | null }>, skills: Array<{ __typename?: 'MakerSkill', id: number, title: string }>, roles: Array<{ __typename?: 'MakerRole', id: number, title: string, icon: string, level: RoleLevelEnum }> } | null };

export type CategoryPageQueryVariables = Exact<{
  categoryId: Scalars['Int'];
}>;


export type CategoryPageQuery = { __typename?: 'Query', projectsByCategory: Array<{ __typename?: 'Project', id: number, thumbnail_image: string, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, getCategory: { __typename?: 'Category', id: number, title: string, cover_image: string | null, apps_count: number } };

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = { __typename?: 'Query', allCategories: Array<{ __typename?: 'Category', id: number, title: string, icon: string | null }> };

export type ExploreProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreProjectsQuery = { __typename?: 'Query', hottestProjects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, newProjects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>, allCategories: Array<{ __typename?: 'Category', id: number, title: string, project: Array<{ __typename?: 'Project', id: number, thumbnail_image: string, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }> }> };

export type HottestProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type HottestProjectsQuery = { __typename?: 'Query', hottestProjects: Array<{ __typename?: 'Project', id: number, thumbnail_image: string, title: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }> };

export type ProjectDetailsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectDetailsQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: number, title: string, description: string, cover_image: string, thumbnail_image: string, screenshots: Array<string>, website: string, lightning_address: string | null, lnurl_callback_url: string | null, votes_count: number, category: { __typename?: 'Category', id: number, title: string }, awards: Array<{ __typename?: 'Award', title: string, image: string, url: string, id: number }>, tags: Array<{ __typename?: 'Tag', id: number, title: string }> } };

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
  role
  email
  jobTitle
  lightning_address
  website
  twitter
  github
  linkedin
  bio
  location
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
    join_date
    jobTitle
    bio
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
export const PopularTagsDocument = gql`
    query PopularTags {
  popularTags {
    id
    title
    icon
  }
}
    `;

/**
 * __usePopularTagsQuery__
 *
 * To run a query within a React component, call `usePopularTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopularTagsQuery(baseOptions?: Apollo.QueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
      }
export function usePopularTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
export type PopularTagsQueryHookResult = ReturnType<typeof usePopularTagsQuery>;
export type PopularTagsLazyQueryHookResult = ReturnType<typeof usePopularTagsLazyQuery>;
export type PopularTagsQueryResult = Apollo.QueryResult<PopularTagsQuery, PopularTagsQueryVariables>;
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
export const MyProfileAboutDocument = gql`
    query MyProfileAbout {
  me {
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
export const MyProfilePreferencesDocument = gql`
    query MyProfilePreferences {
  me {
    id
    walletsKeys {
      key
      name
    }
    nostr_prv_key
    nostr_pub_key
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
    walletsKeys {
      key
      name
    }
    nostr_pub_key
    nostr_prv_key
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
    similar_makers {
      id
      name
      avatar
      jobTitle
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
export const ProjectDetailsDocument = gql`
    query ProjectDetails($projectId: Int!) {
  getProject(id: $projectId) {
    id
    title
    description
    cover_image
    thumbnail_image
    screenshots
    website
    lightning_address
    lnurl_callback_url
    votes_count
    category {
      id
      title
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
 *   },
 * });
 */
export function useProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<ProjectDetailsQuery, ProjectDetailsQueryVariables>) {
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