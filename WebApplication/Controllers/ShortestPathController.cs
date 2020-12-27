using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4j.Driver;
using Neo4jClient;
using Neo4jClient.Cypher;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShortestPathController : ControllerBase
    {
        private readonly ILogger<ShortestPathController> _logger;
        private readonly IGraphClient _graphClient;

        public ShortestPathController(ILogger<ShortestPathController> logger, IGraphClient graphClient)
        {
            _logger = logger;
            _graphClient = graphClient;
        }

        [HttpPost]
        public async Task<IEnumerable<object>> GetShortestPath([FromBody] PathRequest pathRequest)
        {
            return await _graphClient.Cypher.Match("(start:City)", "(end:City)")
                .Where((City start) => start.Guid == pathRequest.StartCity)
                .AndWhere((City end) => end.Guid == pathRequest.EndCity)
                .Call(@"gds.alpha.shortestPath.stream({
                    nodeProjection: 'City',
                    relationshipProjection: {
                        ROAD: {
                            type: 'ROAD',
                            properties: 'Cost',
                            orientation: 'NATURAL'
                        }
                    },
                    startNode: start,
                    endNode: end,
                    relationshipWeightProperty: 'Cost'
                })")
                .Yield("nodeId, cost")
                .Return((nodeId, cost) => new
                {
                    name = Return.As<String>("gds.util.asNode(nodeId).Name"),
                    cost = cost.As<Double>()
                }).ResultsAsync;
        }
    }
}