using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Data
{
    public class CafeRepository : ICafeRepository
    {
        private readonly DataContext _context;

        public CafeRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Cafe> GetCafe(int id)
        {
            var cafe = await _context.Cafe.FirstOrDefaultAsync(cafe => cafe.Id == id);
            return cafe;
        }

        public async Task<IEnumerable<Cafe>> GetCafes()
        {
            var cafes = await _context.Cafe.ToListAsync();
            return cafes;
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
