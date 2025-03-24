using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class OrderDetails
    {
        [Key]
        public string OrderDetailsID { get; set; } = Guid.NewGuid().ToString();

        public string OrderID { get; set; }

        public string FoodID { get; set; }

        public int Quantity { get; set; }

        public double SubTotal { get; set; }

        public virtual Order Order { get; set; }

        public virtual Food Food { get; set; }
    }
}
