import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Avatar } from '../models/avatar';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss']
})
export class AvatarPickerComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter<Avatar>();

  avatars: Avatar[] = [
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 1",
      id: 0
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 2",
      id: 1
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 3",
      id: 2
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 4",
      id: 3
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 5",
      id: 4
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 6",
      id: 5
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 7",
      id: 6
    },
    {
      imageUrl: "https://place-hold.it/75",
      name: "Avatar 8",
      id: 7
    },
  ]

  selectedAvatar: Avatar;

  constructor() { }

  ngOnInit() {
  }

  selectAvatar(avatar: Avatar) {
    this.selectedAvatar = avatar;
    this.avatarSelected.emit(this.selectedAvatar);
  }

  isSelectedAvatar(id: number): boolean {
    if(this.selectedAvatar) {
      return this.selectedAvatar.id === id;
    }
  }

}
