import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Player } from '../models/player';
import {GameState} from '../models/game-state';

import { GameControllerService } from '../game-controller.service'

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  @Output() gameState = new EventEmitter<GameState>();

  playerList: Player[];
  playerCount;
  playerNum;

  playerObject: Player = new Player();

  constructor(private gameController: GameControllerService) { }

  ngOnInit() {
    this.gameController.playerCount.subscribe(pCount => {
      this.playerCount = pCount;
    });

    this.gameController.playerNumber.subscribe(pNum => {
      this.playerNum = pNum;
      console.log(this.playerNum);
    });

    this.gameController.playerObject.subscribe(playerObj => {
      this.playerObject = playerObj;
    })
  }

  startGame() {
    this.gameState.emit('GAME_STARTED');
    this.gameController.startGame();
  }

  isLeader() {
    console.log('Player Object', this.playerObject);
    return this.playerObject.isLeader;
  }

}
