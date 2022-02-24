import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type BuildQuestionBankQueryVariables = Types.Exact<{
  artists: Array<Types.Scalars['String']> | Types.Scalars['String'];
  tracks: Array<Types.Scalars['String']> | Types.Scalars['String'];
  genre: Types.Scalars['String'];
}>;


export type BuildQuestionBankQuery = { __typename?: 'Query', questionBank: { __typename?: 'QuestionBank', questions: Array<{ __typename?: 'Question', options: Array<{ __typename?: 'Track', id: string, name: string, preview_url?: string | null | undefined, artists: Array<{ __typename?: 'Artist', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> }>, album?: { __typename?: 'Album', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> } | null | undefined }> }> } };


export const BuildQuestionBankDocument = gql`
    query BuildQuestionBank($artists: [String!]!, $tracks: [String!]!, $genre: String!) {
  questionBank(artists: $artists, tracks: $tracks, genre: $genre) {
    questions {
      options {
        id
        name
        preview_url
        artists {
          id
          name
          images {
            url
            height
            width
          }
        }
        album {
          id
          name
          images {
            url
            height
            width
          }
        }
      }
    }
  }
}
    `;

/**
 * __useBuildQuestionBankQuery__
 *
 * To run a query within a React component, call `useBuildQuestionBankQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuildQuestionBankQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuildQuestionBankQuery({
 *   variables: {
 *      artists: // value for 'artists'
 *      tracks: // value for 'tracks'
 *      genre: // value for 'genre'
 *   },
 * });
 */
export function useBuildQuestionBankQuery(baseOptions: Apollo.QueryHookOptions<BuildQuestionBankQuery, BuildQuestionBankQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuildQuestionBankQuery, BuildQuestionBankQueryVariables>(BuildQuestionBankDocument, options);
      }
export function useBuildQuestionBankLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuildQuestionBankQuery, BuildQuestionBankQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuildQuestionBankQuery, BuildQuestionBankQueryVariables>(BuildQuestionBankDocument, options);
        }
export type BuildQuestionBankQueryHookResult = ReturnType<typeof useBuildQuestionBankQuery>;
export type BuildQuestionBankLazyQueryHookResult = ReturnType<typeof useBuildQuestionBankLazyQuery>;
export type BuildQuestionBankQueryResult = Apollo.QueryResult<BuildQuestionBankQuery, BuildQuestionBankQueryVariables>;