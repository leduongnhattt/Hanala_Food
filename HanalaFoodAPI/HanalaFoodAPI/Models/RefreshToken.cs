using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class RefreshToken
    {
        [Key]
        public string TokenID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Token { get; set; }

        public DateTime ExpireTime { get; set; }

        public bool IsRevoked { get; set; } = false;

        public DateTime CreateAt { get; set; }

        [Required]
        [ForeignKey("Account")]
        public string AccountID { get; set; }
        public virtual Account Account { get; set; }
    }
}
