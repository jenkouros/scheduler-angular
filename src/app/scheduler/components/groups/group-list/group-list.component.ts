import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups = [
    { 
        "id": 1,
        "name": "Ljubljana-Črnuče",
        "type": "system",
        "selected": "true",
        "filters": [
            { "id": 1, "values": [80] }
        ]
    },
    { 
        "id": 2,
        "name": "Ljubljana-Zalog",
        "type": "system",
        "selected": "false",
        "filters": [
            { "id": 1, "values": [81] }
        ]
    },
    { 
        "id": 3,
        "name": "Maribor",
        "type": "system",
        "selected": "false",
        "filters": [
            { "id": 1, "values": [82] }
        ]
    },
    { 
        "id": 4,
        "name": "Tomx",
        "type": "user",
        "selected": "false",
        "filters": [
            { "id": 2, "values": [1] }
        ],
        "containers": [
            1095, 1096, 1097, 1098, 1099
        ]
    },
    { 
        "id": 5,
        "name": "Romx",
        "type": "user",
        "selected": "false",
        "filters": [
            { "id": 2, "values": [1] }
        ],
        "containers": [
            1095, 1096, 1097, 1098, 1099
        ]
    }
];

  constructor() { }

  ngOnInit() {
  }

}
