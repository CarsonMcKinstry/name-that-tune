import {
    Categories,
    Category,
    QueryCategoriesArgs,
    QueryCategoryArgs,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class BaseDataSource extends SpotifyDataSource {
    public async getCategory(
        id: string,
        args: Omit<QueryCategoryArgs, "id">
    ): Promise<Category> {
        return this.get(`/browse/categories/${id}`, omitNil(args));
    }

    public async getCategories(args: QueryCategoriesArgs): Promise<Categories> {
        const categories = await this.get("/browse/categories", omitNil(args));

        const { items, ...rest } = configurePagination<Category>(categories);

        return {
            ...rest,
            categories: items,
        };
    }

    public async getGenres(): Promise<string[]> {
        const { genres } = await this.get(
            "/recommendations/available-genre-seeds"
        );

        return genres;
    }
    public async getMarkets(): Promise<string[]> {
        const { markets } = await this.get("/markets");

        return markets;
    }
}
