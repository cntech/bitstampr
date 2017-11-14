import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable()
export class WebSocketService {

  readonly appKey = 'de504dc5763aeef9ff52';
  readonly pusher = new Pusher(this.appKey);
  readonly liveTradesChannel: Pusher.Channel = this.pusher.subscribe('live_trades');

  constructor() {
  }

}
