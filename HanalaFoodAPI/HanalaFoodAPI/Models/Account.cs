using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class Account
    {
        [Key]
        public string AccountID { get; set; } = Guid.NewGuid().ToString();

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? AvatarUrl { get; set; }

        [Required]
        public RoleType Role { get; set; }

        public string Status { get; set; } = "Active";

        public DateTime  CreateAt { get; set; } = DateTime.Now;

        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }

        public Customer Customer { get; set; }
        public Enterprise Enterprise { get; set; }
        public Admin Admin { get; set; }
        public virtual ICollection<Support> Supports { get; set; }
        public virtual ICollection<Order> Order { get; set; }
    }
}
