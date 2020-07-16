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
    [Route("api/[controller]")]
    public class MemesController : ControllerBase
    {
        MemesDatabaseContext context;
        public MemesController(MemesDatabaseContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<MemeModel> GetMemes()
        {
            List<MemeModel> memes = context.Memes.ToList();
            return memes;
        }

        [HttpGet("{tag}")]
        public List<MemeModel> GetMemeByTag(string tag)
        {
            Console.WriteLine("Поиск мема по тэгу '" + tag + "'");
            List<MemeModel> memes = context.Memes.Where(meme => meme.Tag.Contains(tag)).ToList();
            return memes;
        }

        [Route("create")]
        [HttpPost]
        public string CreateMeme([FromForm]MemeModel meme)
        {
            if (ModelState.IsValid)
            {
                List<MemeModel> foundMemes = context.Memes.Where(m => m.ImageSource == meme.ImageSource).ToList();
                if (foundMemes.Count > 0)
                {
                    if (!foundMemes[0].Tag.Contains(meme.Tag))
                    {
                        foundMemes[0].Tag += meme.Tag;
                    }
                }
                else
                {
                    context.Memes.Add(meme);
                }
                context.SaveChanges();
                return "Ну добавил и добавил мем, что бухтеть то";
            }
            else
            {
                return "Мем не добавлен, введите корректные значения для ссылки и тэгов";
            }
        }
    }
}
