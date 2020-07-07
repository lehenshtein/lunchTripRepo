using DatingApp.Data;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CafeController: ControllerBase
    {
        private readonly ICafeRepository _repo;

        public CafeController(ICafeRepository repo)
        {
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCafes()
        {
            var cafes = await _repo.GetCafes();
            return Ok(cafes);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCafe(int id)
        {
            var cafe = await _repo.GetCafe(id);
            return Ok(cafe);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCafe(int id, [FromBody] JObject data)
        {
            Console.WriteLine(data);
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating user with id {id} failed on save. Maybe data didn't changed");
        }

    }
}
