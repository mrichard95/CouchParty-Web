import { Component, OnInit } from '@angular/core';

import { Player } from '../models/player';
import { GameState } from '../models/game-state';
import { Answers } from '../models/answers';
import { GameControllerService } from '../game-controller.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  player: Player;
  gameState: GameState;

  chosenWord: string;
  playerAnswer: string;

  answers: {}[] = [];

  timer;

  constructor(private gameController: GameControllerService) { }

  ngOnInit() {

    this.gameController.playerObject.subscribe(pObj => {
      this.player = pObj;
      console.log('PLAYER OBJECT', this.player);
    });

    this.gameController.gameState.subscribe(gState => {
      this.gameState = gState;
      console.log('GAME STATE CHANGED', this.gameState)
    });

    this.gameController.timer.subscribe(t => {
      this.timer = t;
    });

    this.gameController.answers.subscribe(answers => {
      for(const prop in answers) {
        this.answers.push({id: prop, answer: answers[prop]});
      }
      console.log('Answers!!!', this.answers);
    });

  }

  submitChosenWord() {
    this.gameController.chooseWord(this.chosenWord);
  }

  submitAnswer() {
    this.gameController.submitAnswer(this.playerAnswer);
  }

  voteAnswer(id) {
    this.gameController.voteAnswer(id);
  }

}