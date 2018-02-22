import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'ic-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
