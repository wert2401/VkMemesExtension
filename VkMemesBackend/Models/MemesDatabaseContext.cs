using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VkMemesBackend.Models
{
    public class MemesDatabaseContext : DbContext
    {
        public MemesDatabaseContext(DbContextOptions<MemesDatabaseContext> options)
            : base(options) 
        { }
        public DbSet<MemeModel> Memes { get; set; }
    }
}
