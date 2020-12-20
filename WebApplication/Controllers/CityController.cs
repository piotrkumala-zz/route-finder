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
    public class CityController : ControllerBase
    {
        private readonly ILogger<CityController> _logger;
        private readonly IGraphClient _graphClient;

        public CityController(ILogger<CityController> logger, IGraphClient graphClient)
        {
            _logger = logger;
            _graphClient = graphClient;
        }

        [HttpGet]
        public async Task<IEnumerable<City>> Get()
        {
            var query = _graphClient.Cypher.Match("(city)").Return(city => city.As<City>());
            return await query.ResultsAsync;
        }

        [HttpPost]
        public async Task Add([FromBody] City city)
        {
            await _graphClient.Cypher.Create("(city:City $newCity)").WithParam("newCity", city)
                    .ExecuteWithoutResultsAsync();
        }
    }
}