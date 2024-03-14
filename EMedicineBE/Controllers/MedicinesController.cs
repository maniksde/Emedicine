using EMedicineBE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace EMedicineBE.Controllers
{
    public class MedicinesController : Controller
    {
        private readonly IConfiguration _configuration;
        public MedicinesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("addToCart")]
        public Response addToCart([FromBody] Cart cart)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.addToCart(cart, connection);
            return response;
        } //done

        [HttpPost] 
        [Route("editCart")]
        public Response editCart([FromBody] Cart cart) // done
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.editCart(cart, connection);
            return response;
        } 

        [HttpPost]
        [Route("getCartItems")]
        public Response getCartItems([FromBody]Users user)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.getCartItems(user.ID, connection);
            return response;
        } //done


        [HttpPost]
        [Route("placeOrder")]
        public Response placeOrder(Users users)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.placeOrder(users, connection);
            return response;
        }

        [HttpPost]
        [Route("orderList")]

        public Response orderList(Users users)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.orderList(users, connection);
            return response;

        }

        [HttpPost]
        [Route ("medicineById")]
        public Response medicineById([FromBody] Medicines medicines)
        {
            DAL dal = new DAL();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            Response response = dal.medicineById(medicines.ID,connection);
            return response;    
        }  // done

        [HttpPost]
        [Route("deleteCart")]
        public Response deleteCart([FromBody] Cart cart)
        {
            DAL dal = new DAL();
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            response = dal.deleteCart(cart, connection);
            return response;
        } // done

        [HttpPost]
        [Route ("getSubTotal")]

        public Response getSubTotal([FromBody] Cart cart)
        {
            DAL dal = new DAL();
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("con").ToString());
            response = dal.getSubTotal(cart.UserId, connection);
            return response;
        }  // done

    }
}
