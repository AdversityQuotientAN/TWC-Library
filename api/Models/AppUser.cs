using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JwtRoleAuthentication.Enums;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        public List<Collection> Collections { get; set; } = new List<Collection>();
        public string? UserType { get; set; }
    }
}