import { Injectable } from '@angular/core';

import { Player } from './models/player';
import { GameState } from './models/game-state';
import { Answers } from './models/answers';
import { BehaviorSubject, of, Observable, fromEventPattern } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  playerCount = new BehaviorSubject<string>('Current players: 0');
  playerNumber = new BehaviorSubject<number>(0);
  gameState = new BehaviorSubject<GameState>('SELECTING_AVATAR');
  timer = new BehaviorSubject<{}>({remaining: 0, total: 0});
  gameRoomId: string;
  answers = new BehaviorSubject<{}>({});

  playerObject = new BehaviorSubject<Player>(new Player());

  private mySocket: WebSocket;

  constructor() {
  }

  connectToGame(gameRoomId: string, player?: Player) {
    this.gameRoomId = gameRoomId;
    this.mySocket = new WebSocket(`ws://localhost:8080/game/join/${gameRoomId}`);

    this.mySocket.addEventListener('open', () => {

      if(player) {
        this.mySocket.send(`pNick:${player.displayName}`);
      }

      this.mySocket.send('who');
    });

    this.mySocket.addEventListener('message', msg => {

      if(msg.data.includes("Current players")) {
        this.playerCount.next(msg.data);
        this.playerNumber.next(Number(msg.data.substring(msg.data.length - 1, msg.data.length)))
      }

      if(msg.data.includes('selectingText')) {
        this.changeGameState('GAME_STARTED:SELECTING_WORD');
      }

      if(msg.data.includes('gamestage: 0') && this.gameState.getValue() === 'GAME_STARTED:ANSWERS_IN') {
        this.changeGameState('GAME_OVER');
      }

      if(msg.data.includes('gamestage: 2')) {
        this.changeGameState('GAME_STARTED:ENTER_ANSWERS');
      }

      if(msg.data.includes('gamestage: 3')) {
        this.changeGameState('GAME_STARTED:ANSWERS_IN');
      }

      if(msg.data.includes('king\'d')) {
        this.playerObject.subscribe(pObj => {
          let king = pObj;
          king.isKing = true;
          this.playerObject.next(king);
        })
      }

      try {
        let respObject = JSON.parse(msg.data);
        if((respObject[`${this.gameRoomId}`])) {
          this.playerObject.next(respObject[`${this.gameRoomId}`] as Player);
        } 

        if(respObject['remaining'] && respObject['total']) {
          this.timer.next(respObject);
        }

        if(typeof respObject === 'object' && this.gameState.getValue().includes('ANSWERS_IN')) {
          console.log('answers!', respObject);

          
          this.answers.next(respObject);
        }
      } catch(e) {}

      console.log(msg);
    });

    this.mySocket.addEventListener('close', () => {
      this.mySocket.close();
    });
  }

  getPlayerCount() {
    return this.playerCount;
  }

  startGame() {
    this.mySocket.send('gStart');
  }
  
  changeGameState(gameState: GameState) {
    this.gameState.next(gameState);
  }

  chooseWord(word: string) {
    this.mySocket.send(`chWord:${word}`);
  }

  submitAnswer(answer: string) {
    this.mySocket.send(`{"answer": "${answer}"}`);
  }

  voteAnswer(id: string) {
    this.mySocket.send(`{"winningId": "${id}"}`);
  }

  restartGame() {
    this.mySocket.send('gStart');
  }
}
