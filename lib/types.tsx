export enum CategoryType {
    WEB, BACKEND, OTHER
}

export type Category = {
    name: string,
    type: CategoryType
}

export type Post = {
    slug: string,
    title: string,
    categories: Category[],
    date: Date,
    summary: string,
    content?: string,
}
 
export type Search = {
    slug: string,
    title: string,
    date: Date,
}