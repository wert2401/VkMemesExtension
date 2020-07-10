using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VkMemesBackend.Models;

namespace VkMemesBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]/{tag}")]
    public class MemesController : ControllerBase
    {
        FakeDb fakeDb;
        public MemesController(ILogger<MemesController> logger)
        {
            fakeDb = new FakeDb();
        }

        public List<MemeModel> GetMemeByTag(string tag)
        {
            List<MemeModel> memes = fakeDb.GetMemes(tag);
            return memes;
        }
    }
}
