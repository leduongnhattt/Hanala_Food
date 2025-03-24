using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Payment
    {
        [Key]
        public string PaymentId { get; set; } = Guid.NewGuid().ToString();
        public string OrderID { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; }
        public string TransactionID { get; set; }
        [ForeignKey("OrderID")]
        public Order Order { get; set; }
    }
}
