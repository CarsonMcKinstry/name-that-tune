import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RecommendationsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.RecommendationsInput>;
}>;


export type RecommendationsQuery = { __typename?: 'Query', recommendations: { __typename?: 'Recommendations', tracks: Array<{ __typename?: 'Track', id: string, name: string, preview_url?: string | null | undefined, is_playable?: boolean | null | undefined, artists: Array<{ __typename?: 'Artist', id?: string | null | undefined, name: string }>, album?: { __typename?: 'Album', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string }> } | null | undefined }> } };


export const RecommendationsDocument = gql`
    query Recommendations($input: RecommendationsInput) {
  recommendations(input: $input) {
    tracks {
      id
      name
      artists {
        id
        name
      }
      preview_url
      is_playable
      album {
        id
        name
        images {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useRecommendationsQuery__
 *
 * To run a query within a React component, call `useRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecommendationsQuery(baseOptions?: Apollo.QueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, options);
      }
export function useRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendationsQuery, RecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendationsQuery, RecommendationsQueryVariables>(RecommendationsDocument, options);
        }
export type RecommendationsQueryHookResult = ReturnType<typeof useRecommendationsQuery>;
export type RecommendationsLazyQueryHookResult = ReturnType<typeof useRecommendationsLazyQuery>;
export type RecommendationsQueryResult = Apollo.QueryResult<RecommendationsQuery, RecommendationsQueryVariables>;