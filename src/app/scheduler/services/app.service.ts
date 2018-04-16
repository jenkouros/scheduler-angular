import { Injectable } from '@angular/core';

export class MovieData {
    id: number;
    text: string;
    director: string;
    year: number;
    image: string;
    duration: number;
    color: string;
}




//grupe za prikaz operacij po delovnih mestih
export interface WorkPlaceData {
    id: number;         //id stroja
    text: string;       //naziv stroja
}

export class Data {
    workplaceId: number;
    movieId: number;
    price: number;
    startDate: Date;
    endDate: Date
}

let moviesData: MovieData[] = [{
    id: 1,
    text: "His Girl Friday",
    director: "Howard Hawks",
    year: 1940,
    image: "images/movies/HisGirlFriday.jpg",
    duration: 92,
    color: "#cb6bb2"
}, {
    id: 2,
    text: "Royal Wedding",
    director: "Stanley Donen",
    year: 1951,
    image: "images/movies/RoyalWedding.jpg",
    duration: 93,
    color: "#56ca85"
}, {
    id: 3,
    text: "A Star Is Born",
    director: "William A. Wellman",
    year: 1937,
    image: "images/movies/AStartIsBorn.jpg",
    duration: 111,
    color: "#1e90ff"
}, {
    id: 4,
    text: "The Screaming Skull",
    director: "Alex Nicol",
    year: 1958,
    image: "images/movies/ScreamingSkull.jpg",
    duration: 68,
    color: "#ff9747"
}, {
    id: 5,
    text: "It's a Wonderful Life",
    director: "Frank Capra",
    year: 1946,
    image: "images/movies/ItsAWonderfulLife.jpg",
    duration: 130,
    color: "#f05797"
}, {
    id: 6,
    text: "City Lights",
    director: "Charlie Chaplin",
    year: 1931,
    image: "images/movies/CityLights.jpg",
    duration: 87,
    color: "#2a9010"
}];

let theatreData: WorkPlaceData[] = [{
    text: "DM1",
    id: 0
}, {
    text: "DM2",
    id: 1
}, {
    text: "DM3",
    id: 2
}, {
    text: "DM4",
    id: 3
}, {
    text: "DM5",
    id: 4
}
];

let data: Data[] = [{
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 24, 9, 10),
    endDate: new Date(2015, 4, 24, 11, 1)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 24, 11, 30),
    endDate: new Date(2015, 4, 24, 13, 2)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 15,
    startDate: new Date(2015, 4, 24, 13, 30),
    endDate: new Date(2015, 4, 24, 15, 21)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 24, 16, 0),
    endDate: new Date(2015, 4, 24, 17, 8)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 4, 24, 17, 30),
    endDate: new Date(2015, 4, 24, 19, 3)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 24, 19, 30),
    endDate: new Date(2015, 4, 24, 21, 2)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 4, 24, 21, 20),
    endDate: new Date(2015, 4, 24, 22, 53)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 25, 9, 10),
    endDate: new Date(2015, 4, 25, 11, 20)
}
    , {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 25, 12, 0),
    endDate: new Date(2015, 4, 25, 13, 33)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 5,
    startDate: new Date(2015, 4, 25, 14, 0),
    endDate: new Date(2015, 4, 25, 15, 51)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 25, 16, 20),
    endDate: new Date(2015, 4, 25, 17, 28)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 25, 18, 0),
    endDate: new Date(2015, 4, 25, 19, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 15,
    startDate: new Date(2015, 4, 25, 20, 0),
    endDate: new Date(2015, 4, 25, 21, 33)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 25, 21, 50),
    endDate: new Date(2015, 4, 25, 22, 58)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 26, 9, 0),
    endDate: new Date(2015, 4, 26, 10, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 26, 11, 0),
    endDate: new Date(2015, 4, 26, 12, 33)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 26, 13, 20),
    endDate: new Date(2015, 4, 26, 15, 11)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 26, 15, 45),
    endDate: new Date(2015, 4, 26, 17, 55)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 26, 18, 20),
    endDate: new Date(2015, 4, 26, 19, 28)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 20,
    startDate: new Date(2015, 4, 26, 20, 0),
    endDate: new Date(2015, 4, 26, 22, 10)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 27, 9, 0),
    endDate: new Date(2015, 4, 27, 10, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 27, 11, 0),
    endDate: new Date(2015, 4, 27, 12, 33)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 27, 13, 20),
    endDate: new Date(2015, 4, 27, 15, 11)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 27, 15, 45),
    endDate: new Date(2015, 4, 27, 17, 55)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 27, 18, 20),
    endDate: new Date(2015, 4, 27, 19, 28)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 27, 20, 0),
    endDate: new Date(2015, 4, 27, 22, 10)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 28, 9, 30),
    endDate: new Date(2015, 4, 28, 11, 3)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 28, 11, 30),
    endDate: new Date(2015, 4, 28, 13, 2)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 5,
    startDate: new Date(2015, 4, 28, 13, 30),
    endDate: new Date(2015, 4, 28, 15, 21)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 28, 16, 0),
    endDate: new Date(2015, 4, 28, 18, 10)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 28, 18, 30),
    endDate: new Date(2015, 4, 28, 19, 38)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 15,
    startDate: new Date(2015, 4, 28, 20, 20),
    endDate: new Date(2015, 4, 28, 22, 11)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 29, 9, 30),
    endDate: new Date(2015, 4, 29, 11, 3)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 29, 11, 30),
    endDate: new Date(2015, 4, 29, 13, 2)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 29, 13, 30),
    endDate: new Date(2015, 4, 29, 15, 21)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 29, 16, 0),
    endDate: new Date(2015, 4, 29, 18, 10)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 29, 18, 30),
    endDate: new Date(2015, 4, 29, 19, 38)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 29, 20, 20),
    endDate: new Date(2015, 4, 29, 22, 11)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 30, 9, 30),
    endDate: new Date(2015, 4, 30, 11, 3)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 30, 11, 30),
    endDate: new Date(2015, 4, 30, 13, 2)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 30, 13, 30),
    endDate: new Date(2015, 4, 30, 15, 21)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 30, 16, 0),
    endDate: new Date(2015, 4, 30, 18, 10)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 30, 18, 30),
    endDate: new Date(2015, 4, 30, 19, 38)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 15,
    startDate: new Date(2015, 4, 30, 20, 20),
    endDate: new Date(2015, 4, 30, 22, 11)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 31, 9, 30),
    endDate: new Date(2015, 4, 31, 11, 3)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 4, 31, 11, 30),
    endDate: new Date(2015, 4, 31, 12, 57)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 31, 13, 20),
    endDate: new Date(2015, 4, 31, 15, 11)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 31, 16, 0),
    endDate: new Date(2015, 4, 31, 17, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 4, 31, 18, 0),
    endDate: new Date(2015, 4, 31, 19, 33)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 20,
    startDate: new Date(2015, 4, 31, 20, 0),
    endDate: new Date(2015, 4, 31, 21, 27)
}, {
    workplaceId: 0,
    movieId: 4,
    price: 15,
    startDate: new Date(2015, 4, 31, 21, 50),
    endDate: new Date(2015, 4, 31, 22, 58)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 1, 9, 0),
    endDate: new Date(2015, 5, 1, 10, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 1, 11, 30),
    endDate: new Date(2015, 5, 1, 13, 3)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 1, 13, 30),
    endDate: new Date(2015, 5, 1, 15, 21)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 1, 15, 30),
    endDate: new Date(2015, 5, 1, 17, 21)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 1, 17, 30),
    endDate: new Date(2015, 5, 1, 18, 57)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 5, 1, 20, 0),
    endDate: new Date(2015, 5, 1, 22, 10)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 2, 9, 0),
    endDate: new Date(2015, 5, 2, 10, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 2, 11, 0),
    endDate: new Date(2015, 5, 2, 12, 33)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 2, 13, 0),
    endDate: new Date(2015, 5, 2, 14, 51)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 2, 15, 30),
    endDate: new Date(2015, 5, 2, 17, 21)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 2, 17, 30),
    endDate: new Date(2015, 5, 2, 18, 57)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 5, 2, 20, 0),
    endDate: new Date(2015, 5, 2, 22, 10)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 3, 9, 0),
    endDate: new Date(2015, 5, 3, 10, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 3, 11, 0),
    endDate: new Date(2015, 5, 3, 12, 33)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 3, 13, 0),
    endDate: new Date(2015, 5, 3, 14, 51)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 3, 15, 30),
    endDate: new Date(2015, 5, 3, 17, 21)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 3, 17, 30),
    endDate: new Date(2015, 5, 3, 18, 57)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 5, 3, 20, 0),
    endDate: new Date(2015, 5, 3, 22, 10)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 4, 9, 0),
    endDate: new Date(2015, 5, 4, 10, 33)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 4, 11, 0),
    endDate: new Date(2015, 5, 4, 12, 32)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 4, 13, 0),
    endDate: new Date(2015, 5, 4, 14, 51)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 4, 15, 30),
    endDate: new Date(2015, 5, 4, 17, 40)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 4, 18, 0),
    endDate: new Date(2015, 5, 4, 19, 27)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 15,
    startDate: new Date(2015, 5, 4, 20, 0),
    endDate: new Date(2015, 5, 4, 21, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 5, 9, 0),
    endDate: new Date(2015, 5, 5, 10, 33)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 5, 11, 0),
    endDate: new Date(2015, 5, 5, 12, 32)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 5, 13, 0),
    endDate: new Date(2015, 5, 5, 14, 51)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 5, 15, 30),
    endDate: new Date(2015, 5, 5, 17, 40)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 5, 18, 0),
    endDate: new Date(2015, 5, 5, 19, 27)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 15,
    startDate: new Date(2015, 5, 5, 20, 0),
    endDate: new Date(2015, 5, 5, 21, 32)
}, {
    workplaceId: 0,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 6, 9, 0),
    endDate: new Date(2015, 5, 6, 10, 33)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 6, 11, 0),
    endDate: new Date(2015, 5, 6, 12, 32)
}, {
    workplaceId: 0,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 6, 13, 0),
    endDate: new Date(2015, 5, 6, 14, 51)
}, {
    workplaceId: 0,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 6, 15, 30),
    endDate: new Date(2015, 5, 6, 17, 40)
}, {
    workplaceId: 0,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 6, 18, 0),
    endDate: new Date(2015, 5, 6, 19, 27)
}, {
    workplaceId: 0,
    movieId: 1,
    price: 15,
    startDate: new Date(2015, 5, 6, 20, 0),
    endDate: new Date(2015, 5, 6, 21, 32)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 24, 9, 30),
    endDate: new Date(2015, 4, 24, 11, 21)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 24, 12, 0),
    endDate: new Date(2015, 4, 24, 13, 32)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 15,
    startDate: new Date(2015, 4, 24, 14, 0),
    endDate: new Date(2015, 4, 24, 15, 51)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 24, 16, 10),
    endDate: new Date(2015, 4, 24, 17, 18)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 4, 24, 17, 30),
    endDate: new Date(2015, 4, 24, 19, 3)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 24, 19, 30),
    endDate: new Date(2015, 4, 24, 21, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 4, 24, 21, 20),
    endDate: new Date(2015, 4, 24, 22, 53)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 25, 9, 30),
    endDate: new Date(2015, 4, 25, 11, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 13, 3)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 15, 40)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 25, 16, 0),
    endDate: new Date(2015, 4, 25, 17, 8)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 25, 17, 30),
    endDate: new Date(2015, 4, 25, 19, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 15,
    startDate: new Date(2015, 4, 25, 19, 40),
    endDate: new Date(2015, 4, 25, 21, 13)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 25, 21, 40),
    endDate: new Date(2015, 4, 25, 22, 48)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 26, 9, 30),
    endDate: new Date(2015, 4, 26, 11, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 26, 11, 30),
    endDate: new Date(2015, 4, 26, 13, 3)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 26, 13, 30),
    endDate: new Date(2015, 4, 26, 15, 41)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 26, 16, 0),
    endDate: new Date(2015, 4, 26, 18, 10)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 26, 18, 30),
    endDate: new Date(2015, 4, 26, 19, 38)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 20,
    startDate: new Date(2015, 4, 26, 20, 20),
    endDate: new Date(2015, 4, 26, 22, 30)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 27, 9, 30),
    endDate: new Date(2015, 4, 27, 11, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 27, 11, 30),
    endDate: new Date(2015, 4, 27, 13, 3)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 27, 13, 30),
    endDate: new Date(2015, 4, 27, 15, 41)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 27, 16, 0),
    endDate: new Date(2015, 4, 27, 18, 10)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 27, 18, 30),
    endDate: new Date(2015, 4, 27, 19, 38)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 27, 20, 20),
    endDate: new Date(2015, 4, 27, 22, 30)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 28, 9, 10),
    endDate: new Date(2015, 4, 28, 10, 43)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 28, 11, 0),
    endDate: new Date(2015, 4, 28, 12, 32)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 5,
    startDate: new Date(2015, 4, 28, 13, 10),
    endDate: new Date(2015, 4, 28, 15, 1)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 28, 15, 40),
    endDate: new Date(2015, 4, 28, 17, 50)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 5,
    startDate: new Date(2015, 4, 28, 18, 20),
    endDate: new Date(2015, 4, 28, 19, 28)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 15,
    startDate: new Date(2015, 4, 28, 20, 20),
    endDate: new Date(2015, 4, 28, 22, 11)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 29, 10, 0),
    endDate: new Date(2015, 4, 29, 11, 33)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 29, 12, 0),
    endDate: new Date(2015, 4, 29, 13, 32)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 29, 14, 0),
    endDate: new Date(2015, 4, 29, 15, 51)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 4, 29, 16, 30),
    endDate: new Date(2015, 4, 29, 18, 40)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 29, 19, 0),
    endDate: new Date(2015, 4, 29, 20, 8)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 20,
    startDate: new Date(2015, 4, 29, 20, 30),
    endDate: new Date(2015, 4, 29, 22, 50)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 30, 10, 0),
    endDate: new Date(2015, 4, 30, 11, 33)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 4, 30, 12, 0),
    endDate: new Date(2015, 4, 30, 13, 32)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 30, 14, 0),
    endDate: new Date(2015, 4, 30, 15, 51)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 30, 16, 30),
    endDate: new Date(2015, 4, 30, 18, 40)
}, {
    workplaceId: 1,
    movieId: 4,
    price: 10,
    startDate: new Date(2015, 4, 30, 19, 0),
    endDate: new Date(2015, 4, 30, 20, 8)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 30, 20, 30),
    endDate: new Date(2015, 4, 30, 22, 50)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 4, 31, 10, 0),
    endDate: new Date(2015, 4, 31, 11, 33)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 4, 31, 12, 0),
    endDate: new Date(2015, 4, 31, 13, 27)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 4, 31, 14, 0),
    endDate: new Date(2015, 4, 31, 15, 51)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 10,
    startDate: new Date(2015, 4, 31, 16, 30),
    endDate: new Date(2015, 4, 31, 18, 2)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 4, 31, 18, 30),
    endDate: new Date(2015, 4, 31, 20, 40)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 20,
    startDate: new Date(2015, 4, 31, 21, 0),
    endDate: new Date(2015, 4, 31, 22, 27)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 1, 9, 30),
    endDate: new Date(2015, 5, 1, 11, 2)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 5,
    startDate: new Date(2015, 5, 1, 12, 0),
    endDate: new Date(2015, 5, 1, 13, 27)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 1, 14, 0),
    endDate: new Date(2015, 5, 1, 15, 51)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 1, 16, 30),
    endDate: new Date(2015, 5, 1, 18, 21)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 1, 19, 0),
    endDate: new Date(2015, 5, 1, 20, 27)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 15,
    startDate: new Date(2015, 5, 1, 21, 0),
    endDate: new Date(2015, 5, 1, 22, 33)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 2, 10, 0),
    endDate: new Date(2015, 5, 2, 11, 32)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 5,
    startDate: new Date(2015, 5, 2, 12, 0),
    endDate: new Date(2015, 5, 2, 13, 27)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 2, 14, 0),
    endDate: new Date(2015, 5, 2, 15, 51)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 10,
    startDate: new Date(2015, 5, 2, 16, 30),
    endDate: new Date(2015, 5, 2, 18, 3)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 2, 19, 0),
    endDate: new Date(2015, 5, 2, 20, 27)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 15,
    startDate: new Date(2015, 5, 2, 21, 0),
    endDate: new Date(2015, 5, 2, 22, 33)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 3, 9, 30),
    endDate: new Date(2015, 5, 3, 11, 2)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 3, 11, 30),
    endDate: new Date(2015, 5, 3, 13, 3)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 10,
    startDate: new Date(2015, 5, 3, 14, 0),
    endDate: new Date(2015, 5, 3, 15, 27)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 3, 16, 0),
    endDate: new Date(2015, 5, 3, 17, 51)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 3, 18, 10),
    endDate: new Date(2015, 5, 3, 19, 37)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 20,
    startDate: new Date(2015, 5, 3, 20, 30),
    endDate: new Date(2015, 5, 3, 22, 40)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 4, 9, 30),
    endDate: new Date(2015, 5, 4, 11, 2)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 4, 11, 30),
    endDate: new Date(2015, 5, 4, 13, 2)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 10,
    startDate: new Date(2015, 5, 4, 14, 0),
    endDate: new Date(2015, 5, 4, 15, 27)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 4, 16, 0),
    endDate: new Date(2015, 5, 4, 17, 51)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 4, 18, 10),
    endDate: new Date(2015, 5, 4, 19, 37)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 15,
    startDate: new Date(2015, 5, 4, 20, 20),
    endDate: new Date(2015, 5, 4, 22, 30)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 5, 9, 30),
    endDate: new Date(2015, 5, 5, 11, 2)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 5, 11, 30),
    endDate: new Date(2015, 5, 5, 13, 2)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 5, 13, 30),
    endDate: new Date(2015, 5, 5, 15, 21)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 5, 16, 0),
    endDate: new Date(2015, 5, 5, 18, 10)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 5, 18, 30),
    endDate: new Date(2015, 5, 5, 19, 57)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 15,
    startDate: new Date(2015, 5, 5, 20, 30),
    endDate: new Date(2015, 5, 5, 22, 3)
}, {
    workplaceId: 1,
    movieId: 2,
    price: 5,
    startDate: new Date(2015, 5, 6, 9, 30),
    endDate: new Date(2015, 5, 6, 11, 3)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 5,
    startDate: new Date(2015, 5, 6, 11, 30),
    endDate: new Date(2015, 5, 6, 13, 2)
}, {
    workplaceId: 1,
    movieId: 3,
    price: 10,
    startDate: new Date(2015, 5, 6, 13, 30),
    endDate: new Date(2015, 5, 6, 15, 21)
}, {
    workplaceId: 1,
    movieId: 5,
    price: 10,
    startDate: new Date(2015, 5, 6, 16, 0),
    endDate: new Date(2015, 5, 6, 18, 10)
}, {
    workplaceId: 1,
    movieId: 6,
    price: 15,
    startDate: new Date(2015, 5, 6, 18, 30),
    endDate: new Date(2015, 5, 6, 19, 57)
}, {
    workplaceId: 1,
    movieId: 1,
    price: 15,
    startDate: new Date(2015, 5, 6, 20, 30),
    endDate: new Date(2015, 5, 6, 22, 2)
}
];

@Injectable()
export class Service {
    getWorkPlaceData() {
        return theatreData;
    }
    getMoviesData() {
        return moviesData;
    }
    getData() {
        return data;
    }

    getResources(workplaces: any, plans: MovieData[]) {
        let workplaceGroups: any[] = [],
            planGroup: any[] = []

        //working places (group)
        workplaces.forEach((group: any) => {
            workplaceGroups.push({
                text: group.text,
                id: group.id,
            });
        });       
        plans.forEach((plan: any) => {
            planGroup.push({
                text: plan.text,
                id: plan.id,
                color: plan.color
            });
        });
        console.log(workplaceGroups, planGroup);
        return [
            {
                fieldExpr: "movieId",                 
                useColorAsDefault: true,
                dataSource: planGroup
            },
            {
                fieldExpr: "workplaceId",
                dataSource: workplaceGroups
            }
        ];
    }
}