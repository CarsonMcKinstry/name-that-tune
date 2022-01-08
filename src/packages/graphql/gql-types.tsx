// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ExplicitContentSettings = {
  __typename?: 'ExplicitContentSettings';
  filter_enabled: Scalars['Boolean'];
  filter_locked: Scalars['Boolean'];
};

export type ExternalUrls = {
  __typename?: 'ExternalUrls';
  spotify: Scalars['String'];
};

export type Followers = {
  __typename?: 'Followers';
  total: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Me = User & {
  __typename?: 'Me';
  country?: Maybe<Scalars['String']>;
  display_name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  explicit_content?: Maybe<ExplicitContentSettings>;
  external_urls: ExternalUrls;
  followers: Followers;
  id: Scalars['ID'];
  images: Array<Image>;
  product?: Maybe<Scalars['String']>;
  type: ObjectType;
  uri: Scalars['String'];
};

export enum ObjectType {
  Playlist = 'playlist',
  User = 'user'
}

export type Query = {
  __typename?: 'Query';
  health: Scalars['Boolean'];
  me?: Maybe<Me>;
  user?: Maybe<UserProfile>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  display_name: Scalars['String'];
  external_urls: ExternalUrls;
  followers: Followers;
  id: Scalars['ID'];
  images: Array<Image>;
  type: ObjectType;
  uri: Scalars['String'];
};

export type UserProfile = User & {
  __typename?: 'UserProfile';
  display_name: Scalars['String'];
  external_urls: ExternalUrls;
  followers: Followers;
  id: Scalars['ID'];
  images: Array<Image>;
  type: ObjectType;
  uri: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ExplicitContentSettings: ResolverTypeWrapper<ExplicitContentSettings>;
  ExternalUrls: ResolverTypeWrapper<ExternalUrls>;
  Followers: ResolverTypeWrapper<Followers>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Me: ResolverTypeWrapper<Me>;
  ObjectType: ObjectType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolversTypes['Me'] | ResolversTypes['UserProfile'];
  UserProfile: ResolverTypeWrapper<UserProfile>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ExplicitContentSettings: ExplicitContentSettings;
  ExternalUrls: ExternalUrls;
  Followers: Followers;
  ID: Scalars['ID'];
  Image: Image;
  Int: Scalars['Int'];
  Me: Me;
  Query: {};
  String: Scalars['String'];
  User: ResolversParentTypes['Me'] | ResolversParentTypes['UserProfile'];
  UserProfile: UserProfile;
};

export type ExplicitContentSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExplicitContentSettings'] = ResolversParentTypes['ExplicitContentSettings']> = {
  filter_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  filter_locked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalUrls'] = ResolversParentTypes['ExternalUrls']> = {
  spotify?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Followers'] = ResolversParentTypes['Followers']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  display_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  explicit_content?: Resolver<Maybe<ResolversTypes['ExplicitContentSettings']>, ParentType, ContextType>;
  external_urls?: Resolver<ResolversTypes['ExternalUrls'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  health?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'Me' | 'UserProfile', ParentType, ContextType>;
  display_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  external_urls?: Resolver<ResolversTypes['ExternalUrls'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  display_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  external_urls?: Resolver<ResolversTypes['ExternalUrls'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['Followers'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ExplicitContentSettings?: ExplicitContentSettingsResolvers<ContextType>;
  ExternalUrls?: ExternalUrlsResolvers<ContextType>;
  Followers?: FollowersResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserProfile?: UserProfileResolvers<ContextType>;
};

