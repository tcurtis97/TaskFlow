using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskFlow.Models;
using TaskFlow.Repositories;

namespace TaskFlow.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FleetController : ControllerBase
    {
        private readonly IFleetRepository _fleetRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FleetController(IFleetRepository fleetRepository, IUserProfileRepository userProfileRepository)
        {
            _fleetRepository = fleetRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_fleetRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var fleet = _fleetRepository.GetById(id);
            if (fleet == null)
            {
                return NotFound();
            }
            return Ok(fleet);
        }

        [HttpPost]
        public IActionResult Post(Fleet fleet)
        {
            

            _fleetRepository.Add(fleet);
            return CreatedAtAction(nameof(Get), new { id = fleet.Id }, fleet);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fleetRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Fleet fleet)
        {
            if (id != fleet.Id)
            {
                return BadRequest();
            }

            _fleetRepository.Update(fleet);
            return NoContent();
        }

       
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
