using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskFlow.Repositories;

namespace TaskFlow.Controllers
{
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
            fleet.CreateDate = DateTime.Now;

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

        [HttpGet("GetFleetByIdWithDetails{id}")]
        public IActionResult GetFleetByIdWithDetails(int id)
        {
            var fleet = _fleetRepository.GetFleetByIdWithDetails(id);
            if (fleet == null)
            {
                return NotFound();
            }
            return Ok(fleet);
        }

        [HttpGet("GetAllFleetsByCustomerId{id}")]
        public IActionResult GetAllFleetsByCustomerId(int id)
        {
            var fleet = _fleetRepository.GetAllFleetsByCustomerId(id);
            if (fleet == null)
            {
                return NotFound();
            }
            return Ok(fleet);
        }


        [HttpGet("GetFleetsByWorkDayUser")]
        public IActionResult GetFleetsByWorkDayUser()
        {
            var currentUserProfile = GetCurrentUserProfile();
            int userId = currentUserProfile.Id;
            var fleet = _fleetRepository.GetFleetsByWorkDayUser(userId);
            if (fleet == null)
            {
                return NotFound();
            }
            return Ok(fleet);
        }



        [HttpPut("ComepleteFleet{id}")]
        public IActionResult ComepleteFleet(int id, DateTime complete)
        {
            complete = DateTime.Now;

            {
                _fleetRepository.ComepleteFleet(id, complete);
                return NoContent();
            }

        }

        [HttpGet("GetAllUncompleteFleets")]
        public IActionResult GetAllUncompleteFleets()
        {
            return Ok(_fleetRepository.GetAllUncompleteFleets());
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
