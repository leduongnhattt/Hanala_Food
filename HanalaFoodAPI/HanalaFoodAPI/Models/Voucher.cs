using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Voucher
    {
        [Key]
        public string VoucherID { get; set; } = Guid.NewGuid().ToString();
        public string EnterpriseID { get; set; }
        public string? AdminID { get; set; }
        public string Code { get; set; }
        public double DiscountPercent { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public DateTime ExpiryDate { get; set; }

        [ForeignKey("EnterpriseID")]
        public Enterprise Enterprise { get; set; }
        [ForeignKey("AdminID")]
        public  Admin Admin { get; set; }
    }
}
