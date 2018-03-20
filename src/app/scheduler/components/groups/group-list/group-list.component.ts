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
        "filters": [
            { "id": 1, "values": [80] }
        ]
    },
    { 
        "id": 2,
        "name": "Tomx",
        "type": "user",
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
