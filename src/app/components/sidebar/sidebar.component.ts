import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from 'src/app/interfaces/IMenu';
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuList!: Observable<IMenu[]>;

  constructor(public sidebarService: SidebarService) {

  }

  ngOnInit(): void {
    this.menuList = this.sidebarService.getList<IMenu>("/assets/menu.json")
  }

}
