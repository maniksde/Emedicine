using EMedicineBE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace EMedicineBE.Controllers
{
    public class AdminController : Controller
    {
        private readonly IConfiguration _configuration;
        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addMedicine")]
        public Response addMedicine([FromForm] Medicines medicines)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.addMedicine(medicines, connection);
            return response;
        } //done
        [HttpPost]
        [Route("updateMedicine")]
        public Response updateMedicine([FromForm] Medicines medicines)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.updateMedicine(medicines, connection);
            return response;
        } //done

        [HttpGet]
        [Route("userList")]
        public Response userList()
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.userList(connection);
            return response;
        } //done
        [HttpGet]
        [Route("medicineList")]
        public Response medicineList()
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.medicineList(connection);
            return response;
        } //done

        [HttpPost]
        [Route("deleteMedicine")]
        public Response deleteMedicine([FromBody] Medicines medicines)
        {
            DAL dal = new DAL();
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            response = dal.deleteMedicine(medicines, connection);
            return response;
        } // done

        [HttpPost]
        [Route("userUpdateStatusType")]
        public Response userUpdateStatusType([FromBody] Users user)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.userUpdateStatusType(user, connection);
            return response;
        } //done



    }
}
