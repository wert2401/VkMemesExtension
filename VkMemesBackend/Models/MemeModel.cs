using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace VkMemesBackend.Models
{
    public class MemeModel
    {
        public int Id { get; set; }
        [Url]
        public string ImageSource { get; set; } = "";
        [Required]
        public string Tag { get; set; } = "";
        public int Rating { get; set; } = 0;
    }
}
