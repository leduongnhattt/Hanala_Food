using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class Order
    {
        [Key]
        public string OrderID { get; set; } = Guid.NewGuid().ToString();

        public string AccountID { get; set; }

        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public string Status { get; set; }

        public string? VoucherID { get; set; }

        public ICollection<Voucher> Vouchers { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
        public virtual Account Account { get; set; }
        public virtual Payment Payment { get; set; }
    }
}
