using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskFlow.Models;
using TaskFlow.Utils;

namespace TaskFlow.Repositories
{
    public class FleetRepository : BaseRepository, IFleetRepository
    {
        public FleetRepository(IConfiguration configuration) : base(configuration) { }
        public List<Fleet> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT  Id, UserProfileId, Description, ISNULL(ImageUrl, '') as ImageUrl, ISNULL(ServiceId, '') as ServiceId
                          FROM  Fleet
                     ";

                    var reader = cmd.ExecuteReader();

                    var fleet = new List<Fleet>();
                    while (reader.Read())
                    {
                        fleet.Add(new Fleet()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ServiceId = DbUtils.GetInt(reader, "ServiceId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),

                        });
                    }

                    reader.Close();

                    return fleet;
                }
            }
        }


        public Fleet GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT  Id, UserProfileId, Description, ISNULL(ImageUrl, '') as ImageUrl, ISNULL(ServiceId, '') as ServiceId
                          FROM  Fleet
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Fleet fleet = null;
                    if (reader.Read())
                    {
                        fleet = new Fleet()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ServiceId = DbUtils.GetInt(reader, "ServiceId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),

                        };
                    }

                    reader.Close();

                    return fleet;
                }
            }
        }


        public void Add(Fleet fleet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Fleet (UserProfileId, ServiceId, Description, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @ServiceId, @Description, @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", fleet.UserProfileId);
                    DbUtils.AddParameter(cmd, "@ServiceId", fleet.ServiceId);
                    DbUtils.AddParameter(cmd, "@Description", fleet.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", fleet.ImageUrl);


                    fleet.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public void Delete(int fleetId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Fleet WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", fleetId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Fleet fleet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Fleet
                           SET 
                                Description = @Description,
                                ImageUrl = @ImageUrl
                               
                         WHERE Id = @Id";


                    DbUtils.AddParameter(cmd, "@Description", fleet.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", fleet.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Id", fleet.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }





    }
}
