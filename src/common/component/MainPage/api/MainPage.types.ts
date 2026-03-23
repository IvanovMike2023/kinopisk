
import {z} from "zod";

export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    backdrop_path: z.string().nullable(),
    poster_path: z.string().nullable(),
    vote_average: z.number(),
}).transform((movie) => ({
    ...movie,
    backdrop_path: movie.backdrop_path
        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        : null,
    poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
        : null,
}));

export const ResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number()
});

///для страницы фильма
export const GenreSchema = z.object({
    id: z.number(),
    name: z.string()
});
export const GenreListSchema = z.object({
    genres: z.array(GenreSchema)
})
export const ProductionCompanySchema = z.object({
    id: z.number(),
    logo_path: z.string().nullable(),
    name: z.string(),
    origin_country: z.string()
});
export const ProductionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string()
});
export const SpokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string()
});

export const MovieDetailsSchema = z.object({
    adult: z.boolean().optional().default(false),
    backdrop_path: z.string().nullable().optional(),
    belongs_to_collection: z.object({
        id: z.number(),
        name: z.string(),
        poster_path: z.string().nullable(),
        backdrop_path: z.string().nullable()
    }).nullable().optional(),
    budget: z.number().optional().default(0),
    genres: z.array(GenreSchema).optional().default([]),
    homepage: z.string().nullable().optional(),
    id: z.number(),
    imdb_id: z.string().nullable().optional(),
    origin_country: z.array(z.string()).optional().default([]),
    original_language: z.string().optional().default(''),
    original_title: z.string().optional().default(''),
    overview: z.string().optional().default(''),
    popularity: z.number().optional().default(0),
    poster_path: z.string().nullable().optional(),
    production_companies: z.array(ProductionCompanySchema).optional().default([]),
    production_countries: z.array(ProductionCountrySchema).optional().default([]),
    release_date: z.string().optional().default(''),
    revenue: z.number().optional().default(0),
    runtime: z.number().nullable().optional(),
    spoken_languages: z.array(SpokenLanguageSchema).optional().default([]),
    status: z.string().optional().default(''),
    tagline: z.string().nullable().optional(),
    title: z.string().optional().default(''),
    video: z.boolean().optional().default(false),
    vote_average: z.number().optional().default(0),
    vote_count: z.number().optional().default(0)
}).transform(movie => ({
    ...movie,
    poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
}));
export const ResponseDetailsSchema = z.object({
    page: z.number(),
    results: z.array(MovieDetailsSchema),
    total_pages: z.number(),
    total_results: z.number()
});

export type SearchParams = {
    query: string
    page?: number
}

////FOR CAST
export  const CastPersonSchema=z.object({
    adult:z.boolean(),
    cast_id:z.number(),
    character:z.string(),
    credit_id:z.string(),
    gender:z.number(),
    id:z.number(),
    known_for_department:  z.string(),
    name :z.string(),
    order : z.number(),
    original_name :  z.string(),
    popularity :z.number(),
    profile_path: z.string().nullable(),
})
export const CreditPersonSchema = z.object({
    adult: z.boolean(),
    credit_id: z.string(),
    department: z.string(),
    gender: z.number(),
    id: z.number(),
    job: z.string(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable().optional(),
});
export const CreditsSchema = z.object({
    id: z.number(),
    cast: z.array(CastPersonSchema),
    crew: z.array(CreditPersonSchema)
});