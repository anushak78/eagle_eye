import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.scss']
})
export class ChatTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //from database
  generic_chat_messages = [
    'Hello',
    'Do not talk to anyone',
    'Do not stray from sight of webcam',
    'You have been disqualified',
    'Please click and upload another selfie'
  ]
  filtered_chat_messages = []
  chatbox = []
  @ViewChild('scrollChat') private myScrollContainer: ElementRef;

  openChat(person: any) {
    this.filtered_chat_messages = this.generic_chat_messages
    let tempchat = this.chatbox.find(s => s.id == person['username'])
    if (tempchat) {
      alert("Chat is open!")
      return
    }
    if (this.chatbox.length == 4) {
      alert("Please close a chat to open new.")
      return
    }
    let right = ''
    if (this.chatbox.length == 0) {
      right = '1%'
    }
    else {
      let temp = 21 * this.chatbox.length + 1
      right = temp.toString() + '%'
    }
    let chat = {
      id: person['username'],
      right: right,
      minimize: false,
      messages: [],
      tempmsg: ''
    }
    this.chatbox.push(chat);
  }

  pushMessage(msg, i) {
    this.chatbox[i]['messages'].push(msg);
    this.chatbox[i]['tempmsg'] = ''
    this.scrollToBottom()
    this.filterMessages('')
  }

  filterMessages(msg: string) {
    this.filtered_chat_messages = this.generic_chat_messages.filter(s => s.toLowerCase().includes(msg.toLowerCase()))
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop += 300;
    } catch (err) { }
  }

  closeChat(index) {
    this.chatbox.splice(index, 1)
  }

  minimizeChat(index) {
    this.chatbox[index]['minimize'] = !this.chatbox[index]['minimize']
  }


}
