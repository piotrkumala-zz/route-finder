using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4jClient;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoadsController : ControllerBase
    {
        private readonly ILogger<RoadsController> _logger;
        private readonly IGraphClient _graphClient;

        public RoadsController(ILogger<RoadsController> logger, IGraphClient graphClient)
        {
            _logger = logger;
            _graphClient = graphClient;
        }

        [HttpPost]
        public async Task Add([FromBody] RoadRequest roadRequest)
        {
            var road = new Road
            {
                Cost = roadRequest.GetCost()
            };
            await _graphClient.Cypher.Match("(x:City)", "(y:City)").Where((City x) => x.Guid == roadRequest.StartCity)
                .AndWhere((City y) => y.Guid == roadRequest.EndCity).Create("(x)-[:ROAD $road]->(y)")
                .WithParam("road", road).ExecuteWithoutResultsAsync();
        }
        
    }
}