import { Component, OnInit } from '@angular/core';
import { GameControllerService } from './game-controller.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'backronyms';

  gameRoom$;


  constructor(
    private gameController: GameControllerService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

    ngOnInit() {

     
    }
}
