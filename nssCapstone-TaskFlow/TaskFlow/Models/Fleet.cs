using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskFlow.Models
{
    public class Fleet
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public int Description { get; set; }

        public string ImageUrl { get; set; }


        public UserProfile userProfile { get; set; }
    }
}
