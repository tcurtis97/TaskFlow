using System.Collections.Generic;
using TaskFlow.Models;

namespace TaskFlow.Repositories
{
    public interface IFleetRepository
    {
        void Add(Fleet address);
        void Delete(int addressId);
        List<Fleet> GetAll();
        Fleet GetById(int id);
        void Update(Fleet address);
    }
}