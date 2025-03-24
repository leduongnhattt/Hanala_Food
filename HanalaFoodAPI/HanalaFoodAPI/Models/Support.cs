using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class Support
    {
        [Key]
        public string MessageID { get; set; } = Guid.NewGuid().ToString();
        public string AccountID { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime SentAt { get; set; }

        public virtual Account Account { get; set; }
    }
}
