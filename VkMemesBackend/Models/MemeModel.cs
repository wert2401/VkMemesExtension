using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VkMemesBackend.Models
{
    public class MemeModel
    {
        public string ImageSource { get; set; }
        public List<string> Tags { get; set; }

        public MemeModel(string Image, List<string> Tags)
        {
            ImageSource = Image;
            this.Tags = new List<string>();
            this.Tags.AddRange(Tags);
        }
    }
}
