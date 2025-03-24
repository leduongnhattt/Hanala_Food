using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class MENU_FOOD
    {
        [Key, Column(Order = 0)]
        public string MenuID { get; set; }

        [Key, Column(Order = 1)]
        public string FoodID { get; set; }

        [Required]
        public bool IsAvailable { get; set; } = true;

        [ForeignKey("MenuID")]
        public Menu Menu { get; set; }

        [ForeignKey("FoodID")]
        public Food Food { get; set; }
    }
}
