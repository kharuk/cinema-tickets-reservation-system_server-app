module.exports = [
  {
    "id": "4b9f0320-4f9e-11e9-8647-d663bd873d93",
    "location": "minsk",
    "cinema": {
      "cinema_id": "1",
      "location": "Minsk",
      "cinemaName": "kiev",
      "seats": [
        {
          "id": 1,
          "row": 0,
          "column": 0,
          "type": "vip"
        },
        {
          "id": 2,
          "row": 1,
          "column": 1,
          "type": "default"
        },
        {
          "id": 3,
          "row": 0,
          "column": 1,
          "type": "default"
        },
        {
          "id": 4,
          "row": 1,
          "column": 0,
          "type": "default"
        },
        {
          "id": 5,
          "row": 0,
          "column": 2,
          "type": "vip"
        },
        {
          "id": 6,
          "row": 0,
          "column": 3,
          "type": "default"
        },
        {
          "id": 7,
          "row": 1,
          "column": 2,
          "type": "default"
        },
        {
          "id": 8,
          "row": 1,
          "column": 3,
          "type": "default"
        },
        {
          "id": 9,
          "row": 1,
          "column": 4,
          "type": "vip"
        }
      ],
      "seatsAvailable": "9"
    },
    "film" : {
      "film_id": "1",
      "filmName": "green book",
      "description": "Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour through the Deep South in the days when African Americans, forced to find alternate accommodations and services due to segregation laws below the Mason-Dixon Line, relied on a guide called The Negro Motorist Green Book.",
      "poster_path": "https://image.tmdb.org/t/p/w500/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg",
      "duration": "2 hours"
    },
    "date": new Date('2019-03-31 23:23:13'),
    "session_info" : {
      "seat_type": {
        "vip": 15,
        "default": 10
      },
      "extra_services": {
        "popcorn": 1,
        "cola": 1,
        "juce": 2,
        "marshmallow": 2,
        "coffee": 2
      }
    },
    "seatsAvailable": "9",
    "sessionSeats": [
      {
        "id": 1,
        "row": 0,
        "column": 0,
        "chosen": false,
        "booked": true,
        "type": "vip",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 2,
        "row": 1,
        "column": 1,
        "chosen": false,
        "booked": true,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 3,
        "row": 0,
        "column": 1,
        "chosen": false,
        "booked": false,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 4,
        "row": 1,
        "column": 0,
        "chosen": false,
        "booked": false,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 5,
        "row": 0,
        "column": 2,
        "chosen": false,
        "booked": false,
        "type": "vip",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 6,
        "row": 0,
        "column": 3,
        "chosen": false,
        "booked": false,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 7,
        "row": 1,
        "column": 2,
        "chosen": false,
        "booked": false,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 8,
        "row": 1,
        "column": 3,
        "chosen": false,
        "booked": false,
        "type": "default",
        "selectionDatetime": "12.04.2018"
      },
      {
        "id": 9,
        "row": 1,
        "column": 4,
        "chosen": false,
        "booked": false,
        "type": "vip",
        "selectionDatetime": "12.04.2018"
      }
    ],
    "reservation": {
      "id": "user_id",
      "seats": [
        {
          "id": 1,
          "row": 0,
          "column": 0,
          "chosen": false,
          "booked": true,
          "type": "vip",
          "selectionDatetime": "12.04.2018"
        }
      ],
      "extra_services": [
        {"cola": 5}
      ]
    }  
  }
]
