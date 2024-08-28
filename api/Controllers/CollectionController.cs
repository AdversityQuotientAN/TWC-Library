using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/collection")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IBookRepository _bookRepo;
        private readonly ICollectionRepository _collectionRepo;
        public CollectionController(UserManager<AppUser> userManager, IBookRepository bookRepo, ICollectionRepository collectionRepo)
        {
            _userManager = userManager;
            _bookRepo = bookRepo;
            _collectionRepo = collectionRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserCollection() {
            
            var username = User.GetUsername();  // User inherited from ControllerBase
            var appUser = await _userManager.FindByNameAsync(username);
            var userCollection = await _collectionRepo.GetUserCollection(appUser);
            return Ok(userCollection);
        }
    }
}