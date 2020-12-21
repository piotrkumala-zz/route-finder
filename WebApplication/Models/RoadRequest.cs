using System;

namespace WebApplication.Models
{
    public class RoadRequest
    {
        public double Distance { get; set; }
        public RoadType Type { get; set; }
        public Guid StartCity { get; set; }
        public Guid EndCity { get; set; }

        public double GetCost()
        {
            return Type switch
            {
                RoadType.City => Distance / 50.0,
                RoadType.Countryside => Distance / 90.0,
                RoadType.Express => Distance / 120.0,
                RoadType.Highway => Distance / 140.0,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
    
}