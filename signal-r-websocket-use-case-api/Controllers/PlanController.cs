using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using RemoteGarden.API.Hubs;
using RemoteGarden.API.Models;

namespace RemoteGarden.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController
    {
        private IOptions<PlanModel> _planModel;
        public PlanController(IHubContext<ControlHub> hub, IOptions<PlanModel> planModel)
        {
            _planModel = planModel;
        }

        public ActionResult<PlanModel> Get()
        {
            return _planModel.Value;
        }
    }
}
