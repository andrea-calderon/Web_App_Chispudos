export type ProductService = {
    id:            number;
    name:          string;
    description:   string;
    type:          number;
    price:         number;
    specialPrice:  number;
    location:      string;
    latitude:      number;
    longitude:     number;
    userId:        number;
    averageRating: number;
    deletedAt:     null;
    createdAt:     Date;
    updatedAt:     Date;
    categories:    Category[];
    details:       Detail[];
    locations:     Location[];
    reviews:       Review[];
    user:          User;
}

export type Category = {
    id:              number;
    name:            string;
    description:     string;
    icon:            string;
    image:           string;
    createdAt:       Date;
    updatedAt:       Date;
    deletedAt:       null;
    ProductCategory: ProductCategory;
}

export type ProductCategory = {
    createdAt:        Date;
    updatedAt:        Date;
    categoryId:       number;
    productServiceId: number;
}

export type Detail = {
    id:               number;
    productServiceId: number;
    label:            string;
    value:            string;
    description:      string;
    deletedAt:        null;
    createdAt:        Date;
    updatedAt:        Date;
}

export type Location = {
    id:               number;
    productServiceId: number;
    name:             string;
    description:      string;
    type:             number;
    cityId:           number;
    latitude:         number;
    longitude:        number;
    deletedAt:        null;
    createdAt:        Date;
    updatedAt:        Date;
}

export type Review = {
    id:               number;
    productServiceId: number;
    userId:           number;
    rating:           number;
    comment:          string;
    deletedAt:        null;
    createdAt:        Date;
    updatedAt:        Date;
}

export type User = {
    id:            number;
    name:          string;
    lastname:      string;
    email:         string;
    password:      string;
    role:          number;
    averageRating: number;
    avatarUrl:     string;
    createdAt:     Date;
    updatedAt:     Date;
    deletedAt:     null;
}

