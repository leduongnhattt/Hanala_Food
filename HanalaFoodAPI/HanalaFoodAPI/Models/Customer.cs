using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Customer
    {
        [Key]
        public string CustomerID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string AccountID { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        [ForeignKey("AccountID")]
        public Account Account { get; set; }
    }
}
