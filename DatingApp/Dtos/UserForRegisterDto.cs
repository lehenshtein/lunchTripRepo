using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required] //like validation required pipe
        public string Username { get; set; }
        [Required] //like validation required pipe
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You need to specify your password between 4 and 8 charachters.")]
        public string Password { get; set; }

    }
}
