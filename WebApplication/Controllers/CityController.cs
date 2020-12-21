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
            return await _graphClient.Cypher.Match("(city)").Return(city => city.As<City>())
                .ResultsAsync;
        }

        [HttpPost]
        public async Task Add([FromBody] CityRequest city)
        {
            var newCity = new City()
            {
                Name = city.Name,
                Longitude = city.Longitude,
                Latitude = city.Latitude,
                Guid = Guid.NewGuid()
            };
            await _graphClient.Cypher.Create("(city:City $newCity)").WithParam("newCity", newCity)
                    .ExecuteWithoutResultsAsync();
        }

        [HttpDelete]
        public async Task Delete([FromBody] City city)
        {
            await _graphClient.Cypher.Match("(x:City)").Where((City x) => x.Guid == city.Guid).Delete("x")
                .ExecuteWithoutResultsAsync();
        }
    }
}