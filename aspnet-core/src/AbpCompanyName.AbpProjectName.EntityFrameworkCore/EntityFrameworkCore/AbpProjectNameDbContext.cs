using System.Reflection;
using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Categories;
using AbpCompanyName.AbpProjectName.Members;
using AbpCompanyName.AbpProjectName.MemberTags;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Regions;
using AbpCompanyName.AbpProjectName.Tags;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public class AbpProjectNameDbContext : AbpZeroDbContext<Tenant, Role, User, AbpProjectNameDbContext>
    {
        public virtual DbSet<MemberUser> MemberUsers { get; set; }
        public virtual DbSet<MemberTag> MemberTags { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Region> Regions { get; set; }

        // public virtual DbQuery<MemberUserStatics> MemberUserStatics { get; set; }

        public AbpProjectNameDbContext(DbContextOptions<AbpProjectNameDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Query<MemberUserStatics>().ToView("VI_MemberUserStatics");

            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}

