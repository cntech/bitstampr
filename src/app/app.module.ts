import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket.service';
import { DxSparklineModule, DxChartModule, DxDataGridModule, DxCircularGaugeModule } from 'devextreme-angular';
import { DxiValueAxisModule } from 'devextreme-angular/ui/nested/value-axis-dxi';
import { DxiColumnModule } from 'devextreme-angular/ui/nested/column-dxi';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxCircularGaugeModule,
    DxSparklineModule,
    DxiValueAxisModule,
    DxChartModule,
    DxDataGridModule,
    DxiColumnModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
