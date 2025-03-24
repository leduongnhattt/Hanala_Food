using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HanalaFoodAPI.Models
{
    public class Menu
    {
        [Key]
        public string MenuID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string EnterpriseID { get; set; }


        public string Category {  get; set; }

        [ForeignKey("EnterpriseID")]
        public Enterprise Enterprise { get; set; }

        public ICollection<MENU_FOOD> MenuFoods { get; set; }
    }
}
