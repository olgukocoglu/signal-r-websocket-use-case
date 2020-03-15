import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from "@aspnet/signalr";

import { PlanModel } from '../models/PlanModel';
import { environment } from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: PlanModel;
  public dataChanged: EventEmitter<PlanModel>
  private hubConnection: signalR.HubConnection

  constructor() {
    this.dataChanged = new EventEmitter<PlanModel>();
   }
 
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(environment.apiBaseUrl + 'controlHub')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      this.dataChanged.emit(data);
    });
  }
 
  public broadcastChartData = () => {
    this.hubConnection.invoke('broadcastchartdata', this.data)
    .catch(err => console.error(err));
  }
}