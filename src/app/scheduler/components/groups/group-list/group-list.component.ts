import { Component, OnInit, group } from '@angular/core';
import { select } from '@ngrx/store';

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
        "selected": "false",
        "filters": [
            { "id": 1, "values": [80] }
        ]
    },
    { 
        "id": 2,
        "name": "Ljubljana-Zalog",
        "type": "system",
        "selected": "true",
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


    onClick(id: number, selected: string) {
        let index = this.groups.findIndex((x => x.id == id));
        let group = this.groups.find((x => x.id == id));

        if (this.groups[index].selected == "true") {            
            this.groups[index].selected = "false";  
            console.log("index => " + index + "; id => " + group.id + "; selected => " + group.selected);       
        } else if (this.groups[index].selected == "false") {
            this.groups[index].selected = "true";
            console.log("index => " + index + "; id => " + group.id + "; selected => " + group.selected); 
            for (var i = 0; i < this.groups.length; i++) {
                if (index != i) {
                    this.groups[i].selected = "false";
                    console.log("index => " + i + "; id => " + this.groups[i].id + "; selected => " + this.groups[i].selected); 
                }
            }
        }
        console.log(" ");
        
    }
   
    

}
