using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4jClient;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;
        private readonly IGraphClient _graphClient;

        public TestController(ILogger<TestController> logger, IGraphClient graphClient)
        {
            _logger = logger;
            _graphClient = graphClient;
        }

        [HttpGet]
        public async Task<IEnumerable<int>> Get()
        {
            var query = _graphClient.Cypher.Match("()").Return<int>("count(*)");
            return  await query.ResultsAsync;
        }
    }
}