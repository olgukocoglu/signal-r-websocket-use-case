import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SignalRService } from '../../services/signal-r.service';

import { PlanModel } from '../../models/PlanModel';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  areaStatuses: PlanModel = new PlanModel();
  isActive: boolean = true;
  constructor(public signalRService: SignalRService, private http: HttpClient) { }
 
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.dataChanged.subscribe(data => {
      this.areaStatuses = data
    });

    this.initRequest();
  }

  private initRequest = () => {
    this.http.get<PlanModel>(environment.apiBaseUrl + 'api/Plan')
      .subscribe(res => {
        this.areaStatuses = res;
        this.signalRService.data = res;
      })
  }

  MakeAreaActive(e){
    var areaStatusTag = `is${e.currentTarget.id}Active`;
    this.signalRService.data[areaStatusTag] = !this.signalRService.data[areaStatusTag];
    this.signalRService.broadcastChartData();
  }
}
