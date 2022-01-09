import * as Types from "@packages/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type TopArtistsQueryVariables = Types.Exact<{
    limit?: Types.InputMaybe<Types.Scalars["Int"]>;
    offset?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export type TopArtistsQuery = {
    __typename?: "Query";
    me?:
        | {
              __typename?: "Me";
              top_artists: {
                  __typename?: "Artists";
                  limit: number;
                  offset: number;
                  next?: number | null | undefined;
                  total: number;
                  artists: Array<{
                      __typename?: "Artist";
                      name: string;
                      id?: string | null | undefined;
                      images: Array<{
                          __typename?: "Image";
                          url: string;
                          height?: number | null | undefined;
                          width?: number | null | undefined;
                      }>;
                  }>;
              };
          }
        | null
        | undefined;
};

export const TopArtistsDocument = gql`
    query TopArtists($limit: Int, $offset: Int) {
        me {
            top_artists(limit: $limit, offset: $offset) {
                limit
                offset
                next
                total
                artists {
                    name
                    id
                    images {
                        url
                        height
                        width
                    }
                }
            }
        }
    }
`;

/**
 * __useTopArtistsQuery__
 *
 * To run a query within a React component, call `useTopArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopArtistsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTopArtistsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        TopArtistsQuery,
        TopArtistsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<TopArtistsQuery, TopArtistsQueryVariables>(
        TopArtistsDocument,
        options
    );
}
export function useTopArtistsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        TopArtistsQuery,
        TopArtistsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<TopArtistsQuery, TopArtistsQueryVariables>(
        TopArtistsDocument,
        options
    );
}
export type TopArtistsQueryHookResult = ReturnType<typeof useTopArtistsQuery>;
export type TopArtistsLazyQueryHookResult = ReturnType<
    typeof useTopArtistsLazyQuery
>;
export type TopArtistsQueryResult = Apollo.QueryResult<
    TopArtistsQuery,
    TopArtistsQueryVariables
>;
