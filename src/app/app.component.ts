import { Component, ChangeDetectorRef } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Pusher from 'pusher-js';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Trade {
  readonly timestamp: string;
  readonly amount: number;
  readonly price: number;
}

interface GaugeData {
  readonly min: number;
  readonly max: number;
  readonly tickInterval: number;
  readonly value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly trades: BehaviorSubject<ReadonlyArray<Trade>> = new BehaviorSubject([]);
  readonly chartDataSource: Observable<ReadonlyArray<number>> = this.trades.map(trades => {
    if (trades.length) {
      const firstPrice: number = trades[0].price;
      return trades
        .map(trade => trade.price)
        .map(price => price - firstPrice);
    }
    return [];
  });
  readonly gaugeDataSource: Observable<GaugeData> = this.trades.map(trades => {
    if (trades.length >= 2) {
      const prices: ReadonlyArray<number> = trades
        .map(trade => trade.price);
      const min: number = Math.floor(prices.reduce((accu, price) => Math.min(accu, price), Infinity));
      const max: number = Math.ceil(prices.reduce((accu, price) => Math.max(accu, price), 0));
      const difference: number = max - min;
      const n: number = prices.length;
      const value: number = prices[n - 1];
      return { min, max, tickInterval: Math.floor(difference / 10), value };
    }
    return {
      min: 0,
      max: 10,
      tickInterval: 1,
      value: 5
    };
  });
  readonly gaugeMin: Observable<number> = this.gaugeDataSource.map(data => data.min);
  readonly gaugeMax: Observable<number> = this.gaugeDataSource.map(data => data.max);
  readonly gaugeTickInterval: Observable<number> = this.gaugeDataSource.map(data => data.tickInterval);
  readonly gaugeValue: Observable<number> = this.gaugeDataSource.map(data => data.value);
  readonly gridDataSource: Observable<ReadonlyArray<Trade>> = this.trades.map(trades => trades.map(trade => ({
    ...trade,
    timestamp: new Date((+trade.timestamp) * 1000).toLocaleString()
  })));
  constructor(
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly webSocketService: WebSocketService
  ) {
    webSocketService.liveTradesChannel.bind('trade', trade => {
      console.log(trade);
      this.trades.next([...this.trades.value, trade]);
    });
  }
}
