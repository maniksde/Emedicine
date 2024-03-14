using System.Data;
using System.Data.SqlClient;

namespace EMedicineBE.Models
{
    public class DAL { 
        public Response register(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_register", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Fund", users.Fund);
            cmd.Parameters.AddWithValue("@Type", users.Type);
            cmd.Parameters.AddWithValue("@Status", users.Status);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if(i > 0)
            {
                response.StatusMessage = "User registered succesfully";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "User registration failed";
                response.StatusCode = 100;
            }
            return response;

        } // done

        public Response login(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("sp_login", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Email", users.Email);
            da.SelectCommand.Parameters.AddWithValue("@Password", users.Password);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Users user = new Users();
                
                user.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                response.user = user;
                if (Convert.ToInt32(dt.Rows[0]["Status"]) == 0)
                {
                    response.StatusCode = 100;
                    response.StatusMessage = Convert.ToString(dt.Rows[0]["FirstName"]) + " " + Convert.ToString(dt.Rows[0]["LastName"]) + " " + "inactive";
                }
                else
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "User valid";
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User invalid";
            }
            return response;
        } // done

        public Response viewUser(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("sp_viewUser", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Id", users.ID);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                Users user = new Users();
                user.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                user.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                user.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                user.Type = Convert.ToString(dt.Rows[0]["Type"]);
                user.Status = Convert.ToInt32(dt.Rows[0]["Status"]);
                user.Fund = Convert.ToDecimal(dt.Rows[0]["Fund"]);
                user.Password = Convert.ToString(dt.Rows[0]["Password"]);
                user.CreatedOn = Convert.ToDateTime(dt.Rows[0]["CreatedOn"]);

                response.StatusCode = 200;
                response.StatusMessage = "User exists";
                response.user = user;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User not exists";
            }

            return response;
        } // done

        public Response updateProfile(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_updateProfile", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@FirstName", users.FirstName);
            cmd.Parameters.AddWithValue("@LastName", users.LastName);
            cmd.Parameters.AddWithValue("@Email", users.Email);
            cmd.Parameters.AddWithValue("@Password", users.Password);
            
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Record Updated.";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Record updation failed.";
            }
            return response;
        } //Done

        public Response addToCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_addToCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", cart.UserId);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            cmd.Parameters.AddWithValue("@MedicineID", cart.MedicineID);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Added to Cart.";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Some error occured.";
            }
            return response;
        }  //Done

        public Response addMedicine(Medicines medicines , SqlConnection connection)
        {
            Response response = new Response();

            try
            {
                int n = 0;
                try
                {
                    
                    SqlDataAdapter da = new SqlDataAdapter("select max(id) as ID from medicines", connection);
                    DataTable dt = new DataTable();
                    da.Fill(dt);

                    if (dt.Rows.Count > 0)
                    {
                        DataRow dr = dt.Rows[0];
                        n = Convert.ToInt32(dr["ID"]) + 1;
                    }
                }
                catch (Exception ex)
                {
                    n = 0;
                }

                string path = Path.Combine("D:/Learning/EMedicineFE/front-end/public/assets/images/", "image" + n.ToString() + ".jpg");

                using (Stream fs = new FileStream(path, FileMode.Create))
                {
                  
                    medicines.Image.CopyTo(fs);
                }


                string imgUrl = "http://127.0.0.1:8887/" + "image" + n.ToString() + ".jpg";

                SqlCommand cmd = new SqlCommand("sp_addUpdateMedicine", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", medicines.Name);
                cmd.Parameters.AddWithValue("@Manufacturer", medicines.Manufacturer);
                cmd.Parameters.AddWithValue("@UnitPrice", medicines.UnitPrice);
                cmd.Parameters.AddWithValue("@Discount", medicines.Discount);
                cmd.Parameters.AddWithValue("@Quantity", medicines.Quantity);
                cmd.Parameters.AddWithValue("@ExpDate", medicines.ExpDate);
                cmd.Parameters.AddWithValue("@ImageUrl",imgUrl);
                cmd.Parameters.AddWithValue("@Status", medicines.Status);

                connection.Open();
                int i = cmd.ExecuteNonQuery();
                connection.Close();
                if (i > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Medicine Inserted sucessfully.";
                }
                else
                {

                    response.StatusCode = 100;
                    response.StatusMessage = "Medicine not Inserted. Try again.";
                }
            }
            catch (Exception ex)
            {

                response.StatusCode = 100;
                response.StatusMessage = "image not uploaded";
            }


            return response;
        } // done

        public Response updateMedicine(Medicines medicines, SqlConnection connection)
        {
            Response response = new Response();

            
            SqlCommand cmd = new SqlCommand("  sp_updateMedicine ", connection);
            cmd.CommandType = CommandType.StoredProcedure;

            if (medicines.Image != null)
            {
                
                string imgName = medicines.ImageUrl.Substring(22);
                string path = Path.Combine("D:/Learning/EMedicineFE/front-end/public/assets/images/", imgName);

                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                using (Stream fs = new FileStream(path, FileMode.Create))
                {
                    medicines.Image.CopyTo(fs);
                }


            }
            cmd.Parameters.AddWithValue("@ID", medicines.ID);
            cmd.Parameters.AddWithValue("@Name", medicines.Name);
            cmd.Parameters.AddWithValue("@Manufacturer", medicines.Manufacturer);
            cmd.Parameters.AddWithValue("@UnitPrice", medicines.UnitPrice);
            cmd.Parameters.AddWithValue("@Discount", medicines.Discount);
            cmd.Parameters.AddWithValue("@Quantity", medicines.Quantity);
            cmd.Parameters.AddWithValue("@ExpDate", medicines.ExpDate);
            

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicine Updated sucessfully.";
            }
            else
            {

                response.StatusCode = 100;
                response.StatusMessage = "Medicine not Updated. Try again.";
            }

            return response;


        } //done
        public Response userList(SqlConnection connection)
        {
            Response response = new Response();
            List<Users> listuser = new List<Users>();
            SqlDataAdapter da = new SqlDataAdapter("sp_userList", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            //da.SelectCommand.Parameters.AddWithValue("@Type", users.Type);
            //da.SelectCommand.Parameters.AddWithValue("@ID", users.ID);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Users user = new Users();
                    user.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    user.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    user.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    user.Password = Convert.ToString(dt.Rows[i]["Password"]);
                    user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    user.Fund = Convert.ToDecimal(dt.Rows[i]["Fund"]);
                    user.Type = Convert.ToString(dt.Rows[i]["Type"]);
                    user.Status = Convert.ToInt32(dt.Rows[i]["Status"]);
                    user.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                    listuser.Add(user);
                }
                if (listuser.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Order details fetched";
                    response.listUsers = listuser;

                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Order details can't be fetched";
                    response.listUsers = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Order details can't be fetched";
                response.listOrders = null;
            }
            return response;
        } // done

        public Response medicineList(SqlConnection connection)  
        {
            Response response = new Response();
            List<Medicines> listmedicine = new List<Medicines>();
            SqlDataAdapter da = new SqlDataAdapter("sp_medicineList", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Medicines medicine = new Medicines();
                    medicine.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    medicine.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    medicine.Manufacturer = Convert.ToString(dt.Rows[i]["Manufacturer"]);
                    medicine.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    medicine.Discount = Convert.ToDecimal(dt.Rows[i]["Discount"]);
                    medicine.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);
                    medicine.ExpDate = Convert.ToDateTime(dt.Rows[i]["ExpDate"]);
                    medicine.ImageUrl = Convert.ToString(dt.Rows[i]["ImageUrl"]);
                    listmedicine.Add(medicine);
                }
                if (listmedicine.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Medicine details fetched";
                    response.listMedicines = listmedicine;

                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Medicine details can't be fetched";
                    response.listOrders = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Medicine details can't be fetched";
                response.listOrders = null;
            }
            return response;
        } // done

        public Response deleteMedicine(Medicines medicines, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_deleteMedicine", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", medicines.ID);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                if (File.Exists(medicines.ImageUrl))
                {
                    File.Delete(medicines.ImageUrl);
                }
                response.StatusMessage = "record deleted";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "record not deleted";
                response.StatusCode = 100;
            }
            return response;
        } // done

        public Response medicineById(int id, SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("sp_medicineById", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@ID", id);
            DataTable dt = new DataTable();

            da.Fill(dt);
            if(dt.Rows.Count > 0)
            {
                Medicines medicines = new Medicines();
                medicines.ID =Convert.ToInt32( dt.Rows[0]["Id"]);
                medicines.Name = dt.Rows[0]["Name"].ToString();
                medicines.Manufacturer = dt.Rows[0]["Manufacturer"].ToString();
                medicines.UnitPrice = Convert.ToDecimal(dt.Rows[0]["UnitPrice"]);
                medicines.Quantity = Convert.ToInt32(dt.Rows[0]["Quantity"]);
                medicines.Discount = Convert.ToDecimal(dt.Rows[0]["Discount"]);
                medicines.ExpDate = Convert.ToDateTime(dt.Rows[0]["ExpDate"]);
                medicines.ImageUrl = dt.Rows[0]["ImageUrl"].ToString();

                response.medicine = medicines;
                response.StatusCode = 200;
                response.StatusMessage = "Medicine found";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Medicine not found";
            }

            return response;
        } //done

        public Response userUpdateStatusType(Users user, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_userUpdateStatusType", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", user.ID);
            cmd.Parameters.AddWithValue("@Type", user.Type);
            cmd.Parameters.AddWithValue("@Status", user.Status);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();

            if(i > 0)
            {
                response.StatusMessage = "Record Updated";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "Record not Updated";
                response.StatusCode = 100;
            }

            return response;
        } // done

        public Response getCartItems(int id, SqlConnection connection)
        {
            Response response = new Response();
            List<Cart> cartItems = new List<Cart>();
            SqlDataAdapter da = new SqlDataAdapter("sp_getCartItems", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@ID", id);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Cart cartItem = new Cart();
                    cartItem.ID = Convert.ToInt32(dt.Rows[i]["cartID"]);
                    cartItem.UserId = id;
                    cartItem.UnitPrice = Convert.ToDecimal(dt.Rows[i]["UnitPrice"]);
                    cartItem.Discount = Convert.ToDecimal(dt.Rows[i]["Discount"]);
                    cartItem.Quantity = Convert.ToInt32(dt.Rows[i]["Quantity"]);
                    cartItem.TotalPrice = Convert.ToDecimal(dt.Rows[i]["TotalPrice"]);
                    cartItem.MedicineName = Convert.ToString(dt.Rows[i]["Name"]);
                    cartItem.ImageUrl = Convert.ToString(dt.Rows[i]["ImageUrl"]);
                    cartItems.Add(cartItem);
                }
                response.StatusCode = 200;
                response.StatusMessage = "Cart details fetched";
                response.listCart = cartItems;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Cart details can't be fetched";
                response.listCart = null;
            }
            return response;
        } // done

        public Response placeOrder(Users users, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_placeOrder", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", users.ID);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Order placed succefully.";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Order failed.";
            }
            return response;
        }

        public Response orderList(Users users, SqlConnection connection)
        {
            Response response = new Response();
            List<Orders> listOrder = new List<Orders>();
            SqlDataAdapter da = new SqlDataAdapter("sp_orderList", connection);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.Parameters.AddWithValue("@Type", users.Type);
            da.SelectCommand.Parameters.AddWithValue("@ID", users.ID);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Orders order = new Orders();
                    order.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    order.OrderNo = Convert.ToString(dt.Rows[i]["OrderNo"]);
                    order.OrderTotal = Convert.ToInt32(dt.Rows[i]["OrderTotal"]);
                    order.OrderStatus = Convert.ToString(dt.Rows[i]["OrderStatus"]);
                    listOrder.Add(order);
                }
                if (listOrder.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Order details fetched";
                    response.listOrders = listOrder;

                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Order details can't be fetched";
                    response.listOrders = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Order details can't be fetched";
                response.listOrders = null;
            }
            return response;
        }
        
        public Response editCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();

            SqlCommand cmd = new SqlCommand("sp_editCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", cart.ID);
            cmd.Parameters.AddWithValue("@Quantity", cart.Quantity);
            
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Cart Updated sucessfully.";
            }
            else
            {

                response.StatusCode = 100;
                response.StatusMessage = "Cart not Updated. Try again.";
            }

            return response;


        } //done

        public Response deleteCart(Cart cart, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("sp_deleteCart", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", cart.ID);

            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusMessage = "record deleted";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusMessage = "record not deleted";
                response.StatusCode = 100;
            }
            return response;
        } // done

        public Response getSubTotal(int id, SqlConnection connection)
        {
            Response response = new Response();
            try
            {
                SqlDataAdapter da = new SqlDataAdapter("sp_getSubTotal", connection);
                da.SelectCommand.CommandType = CommandType.StoredProcedure;
                da.SelectCommand.Parameters.AddWithValue("@ID", id);
                DataTable dt = new DataTable();

                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {

                    response.subTotal = Convert.ToDecimal(dt.Rows[0]["SubTotal"]);
                    response.StatusCode = 200;
                    response.StatusMessage = "Medicine found";
                }
                else
                {
                    response.subTotal = 0;
                    response.StatusCode = 100;
                    response.StatusMessage = "Medicine not found";
                }
            }
            catch (Exception ex)
            {
                response.subTotal = 0;
                response.StatusCode = 100;
                response.StatusMessage = "Medicine not found";
            }

            return response;
        } //done
    }
}
