using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Admin
    {
        [Key]
        public string AdminID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string AccountID { get; set; }

        [Required]
        public string Permission { get; set; }

        [Required]
        public bool CanManageSystem { get; set; }

        [Required]
        public bool CanViewReport { get; set; }

        [ForeignKey("AccountID")]
        public Account Account { get; set; }
        public virtual ICollection<Voucher> Vouchers { get; set; }
    }
}
