using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VkMemesBackend.Models
{
    public class FakeDb
    {
        private List<MemeModel> memes;
        string[] rndImgs = { "https://meduza.io/image/attachments/images/002/526/884/large/a9jobmDDvAwNrWr8DzVdOg.jpg", "https://meduza.io/image/attachments/images/002/526/218/large/9rhaxT2iQ0LrWFYJAh_aBA.jpg", "https://pbs.twimg.com/media/DogSMPSXUAYHDx4.jpg" };
        string[] rndTags = { "dog", "meme" };
        public FakeDb()
        {
            Random rnd = new Random();
            memes = new List<MemeModel>();
            for (int i = 0; i < 10; i++)
            {
                memes.Add(new MemeModel(rndImgs[rnd.Next(0, rndImgs.Length)], new List<string> { rndTags[rnd.Next(0, rndTags.Length)] }));
            }
        }

        public List<MemeModel> GetMemes(string tag)
        {
            List<MemeModel> search = new List<MemeModel>();
            search = memes.Where(meme => meme.Tags.Contains(tag)).ToList();
            return search;
        }
    }
}
