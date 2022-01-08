import { Pagination } from "@packages/graphql";
import { APIPaginationResponse } from "@packages/graphql";

export const configurePagination = <T>(obj: APIPaginationResponse<T>) => {
    const { next: apiNext, previous: apiPrev, limit, offset, ...rest } = obj;

    const pagination: Pagination & { items: T[]; total: number } = {
        limit,
        offset,
        next: null,
        previous: null,
        ...rest,
    };

    if (apiNext != null) {
        const { searchParams } = new URL(apiNext);

        if (searchParams.has("offset")) {
            pagination.next = parseInt(searchParams.get("offset")!);
        }
    }

    if (apiPrev != null) {
        const { searchParams } = new URL(apiPrev);

        if (searchParams.has("offset")) {
            pagination.previous = parseInt(searchParams.get("offset")!);
        }
    }

    return pagination;
};
