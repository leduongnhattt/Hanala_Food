using System.ComponentModel.DataAnnotations;

namespace HanalaFoodAPI.Models
{
    public class Food
    {
        [Key]
        public string FoodID { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string DishName { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int Stock {  get; set; }

        public string Description { get; set; }

        [Required]
        public string ImageURL { get; set; }

        public ICollection<MENU_FOOD> MenuFoods { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }

    }
}
