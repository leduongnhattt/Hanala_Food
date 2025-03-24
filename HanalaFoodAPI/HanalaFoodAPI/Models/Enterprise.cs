using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Enterprise
    {
        [Key]
        public string EnterpriseID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string AccountID { get; set; }

        [Required]
        public string EnterpriseName { get; set; } 

        public string Address { get; set; }

        public string Desscription { get; set; }

        [ForeignKey("AccountID")]
        public virtual Account Account { get; set; }
        public virtual ICollection<Voucher> Vouchers { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }
    }
}
