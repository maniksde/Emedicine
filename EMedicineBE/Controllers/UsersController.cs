using EMedicineBE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace EMedicineBE.Controllers
{
    public class UsersController : Controller
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
             _configuration = configuration;

        }

        [HttpPost]
        [Route("registration")]
        public Response register([FromBody] Users users)
        {
            Response response = new Response();
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            response = dal.register(users, connection);
            return response;
        } //done

        [HttpPost]
        [Route("login")]
        public Response login([FromBody] Users users)
        {
            Response response = new Response();
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            response = dal.login(users, connection);
            return response;
        } //done

        [HttpPost]
        [Route("viewUser")]
        public Response viewUser(Users users)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.viewUser(users, connection);
            return response;

        } //done
        [HttpPost]
        [Route("updateProfile")]
        public Response updateProfile(Users users)
        {
            
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            DAL dal = new DAL();
            Response response = dal.updateProfile(users, connection);
            return response;
        } 

        

    }
}
