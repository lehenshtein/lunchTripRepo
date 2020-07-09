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
        [StringLength(14, MinimumLength = 2, ErrorMessage = "You need to specify your username between 2 and 14 charachters.")]
        public string Username { get; set; }

        [Required] //like validation required pipe
        [StringLength(14, MinimumLength = 4, ErrorMessage = "You need to specify your password between 4 and 14 charachters.")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [StringLength(14, MinimumLength = 2, ErrorMessage = "You need to specify your knownAs between 2 and 14 charachters.")]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Role { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
            Role = "user";
        }

    }
}
