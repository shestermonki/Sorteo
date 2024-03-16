import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface SideNavList {
  name  : string;
  link  : string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export default class SideNavComponent implements OnInit {

  @Input() listLinks: SideNavList[] = [];

  constructor() { }

  ngOnInit(): void { }
}
