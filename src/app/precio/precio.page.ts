import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.page.html',
  styleUrls: ['./precio.page.scss'],
})
export class PrecioPage implements OnInit {

  precio: number = 0;



  constructor() { }

  ngOnInit() {
  }

}
