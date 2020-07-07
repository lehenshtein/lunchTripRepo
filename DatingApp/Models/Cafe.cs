using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Models
{
    public class Cafe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string PhotoUrl { get; set; }
        public string Street { get; set; }
        public string Home { get; set; }
        public int TasteRate { get; set; }
        public int TimeRate { get; set; }
        public int ServiceRate { get; set; }
        public int DistanceRate { get; set; }
        public int PortionRate { get; set; }
    }
}
