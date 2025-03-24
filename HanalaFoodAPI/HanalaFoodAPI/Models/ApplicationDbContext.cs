using Microsoft.EntityFrameworkCore;

namespace HanalaFoodAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Enterprise> Enterprises { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<MENU_FOOD> MenuFoods { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<Support> Supports { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MENU_FOOD>().HasKey(mf => new { mf.MenuID, mf.FoodID });
            modelBuilder.Entity<Voucher>()
                .HasOne(v => v.Enterprise)
                .WithMany(e => e.Vouchers) 
                .HasForeignKey(v => v.EnterpriseID)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Voucher>()
                .HasOne(v => v.Admin)
                .WithMany() 
                .HasForeignKey(v => v.AdminID)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
