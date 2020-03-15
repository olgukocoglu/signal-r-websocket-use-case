using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using RemoteGarden.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemoteGarden.API.Hubs
{
    public class ControlHub: Hub
    {
        public IOptions<PlanModel> _planModel;
        public ControlHub(IOptions<PlanModel> planModel)
        {
            _planModel = planModel;
        }
        public async Task BroadcastChartData(PlanModel data)
        {
            _planModel.Value.isArea1Active = data.isArea1Active;
            _planModel.Value.isArea2Active = data.isArea2Active;
            _planModel.Value.isArea3Active = data.isArea3Active;
            _planModel.Value.isArea4Active = data.isArea4Active;
            _planModel.Value.isArea5Active = data.isArea5Active;

            await Clients.All.SendAsync("transferchartdata", data);
        }
    }
}
