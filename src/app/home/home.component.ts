import { Component, OnInit } from '@angular/core';
import { Avatar } from '../models/avatar';
import { GameState } from '../models/game-state';

import { Player } from '../models/player';

import { trigger, transition, animate, style } from '@angular/animations';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameControllerService } from '../game-controller.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({transform: 'translateX(-100%)', display: 'inline-block !important'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  gameState: GameState;

  player: Player = new Player();

  gameRoomId: string;

  constructor(private route: ActivatedRoute, private gameController: GameControllerService) { }

  ngOnInit() {
    this.gameRoomId = this.route.snapshot.params.id;

    this.gameController.gameState.subscribe(gState => {
      this.gameState = gState;
    })

  }

  avatarSelected(avatar: string) {
    this.player.avatar = avatar;
    this.gameState = 'ENTERING_NAME';
  }

  nameEntered(name: string) {
    this.player.displayName = name;
    this.gameState = 'WAITING_ROOM';

    this.joinGame();
  }

  setGameState(state) {
    this.gameState = state;
  }

  joinGame() {
    this.gameController.connectToGame(this.gameRoomId, this.player);
  }

}
