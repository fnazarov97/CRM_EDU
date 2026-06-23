using Microsoft.EntityFrameworkCore;
using EduCRM.Domain.Entities.Identity;
using EduCRM.Domain.Entities.Students;
using EduCRM.Domain.Entities.Leads;
using EduCRM.Domain.Entities.Courses;
using EduCRM.Domain.Entities.Attendance;
using EduCRM.Domain.Entities.Payments;
using EduCRM.Domain.Entities.Teachers;

namespace EduCRM.Infrastructure.Persistence
{
    public class CrmDbContext : DbContext
    {
        public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options) { }

        // Identity
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        // Students
        public DbSet<Student> Students { get; set; }
        public DbSet<Parent> Parents { get; set; }

        // Leads
        public DbSet<Lead> Leads { get; set; }

        // Courses
        public DbSet<Course> Courses { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }

        // Attendance
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Session> Sessions { get; set; }

        // Payments
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        // Teachers
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<SalaryRule> SalaryRules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Identity
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Role>().ToTable("roles");
            modelBuilder.Entity<RefreshToken>().ToTable("refresh_tokens");

            // Students
            modelBuilder.Entity<Student>().ToTable("students");
            modelBuilder.Entity<Parent>().ToTable("parents");

            // Leads
            modelBuilder.Entity<Lead>().ToTable("leads");

            // Courses
            modelBuilder.Entity<Course>().ToTable("courses");
            modelBuilder.Entity<Group>().ToTable("groups");
            modelBuilder.Entity<Classroom>().ToTable("classrooms");

            // Attendance
            modelBuilder.Entity<Attendance>().ToTable("attendance");
            modelBuilder.Entity<Session>().ToTable("sessions");

            // Payments
            modelBuilder.Entity<Invoice>().ToTable("invoices");
            modelBuilder.Entity<Transaction>().ToTable("transactions");

            // Teachers
            modelBuilder.Entity<Teacher>().ToTable("teachers");
            modelBuilder.Entity<SalaryRule>().ToTable("salary_rules");

            // Relationships
            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Parent>()
                .HasOne(p => p.Student)
                .WithMany()
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Group>()
                .HasOne(g => g.Course)
                .WithMany()
                .HasForeignKey(g => g.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Session)
                .WithMany()
                .HasForeignKey(a => a.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Invoice)
                .WithMany()
                .HasForeignKey(t => t.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SalaryRule>()
                .HasOne(sr => sr.Teacher)
                .WithMany()
                .HasForeignKey(sr => sr.TeacherId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
