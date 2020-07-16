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
                MemeModel meme = new MemeModel { ImageSource = rndImgs[rnd.Next(0, rndImgs.Length)], Tag = rndTags[rnd.Next(0, rndTags.Length)] };
                memes.Add(meme);
            }
        }

        public List<MemeModel> GetMemes(string tag)
        {
            List<MemeModel> search = new List<MemeModel>();
            search = memes.Where(meme => meme.Tag.Contains(tag)).ToList();
            return search;
        }
    }
}
