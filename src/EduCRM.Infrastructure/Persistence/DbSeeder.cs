using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Courses;
using EduCRM.Domain.Entities.Identity;
using EduCRM.Domain.Entities.Leads;
using EduCRM.Domain.Entities.Payments;
using EduCRM.Domain.Entities.Students;
using EduCRM.Domain.Entities.Teachers;
using Microsoft.EntityFrameworkCore;

namespace EduCRM.Infrastructure.Persistence
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(CrmDbContext context, IPasswordHasher passwordHasher)
        {
            if (!await context.Users.AnyAsync())
            {
                context.Users.Add(new User
                {
                    Username = "admin",
                    PasswordHash = passwordHasher.HashPassword("admin123"),
                    FullName = "Administrator",
                    Role = "Admin"
                });
                await context.SaveChangesAsync();
            }

            if (!await context.Teachers.AnyAsync())
            {
                context.Teachers.AddRange(
                    new Teacher { FullName = "Aziz Karimov", PhoneNumber = "+998901112233", Specialization = "Ingliz tili", HourlyRate = 80000 },
                    new Teacher { FullName = "Dilnoza Yusupova", PhoneNumber = "+998901112244", Specialization = "Matematika", HourlyRate = 90000 }
                );
                await context.SaveChangesAsync();
            }

            if (!await context.Courses.AnyAsync())
            {
                context.Courses.AddRange(
                    new Course { Title = "Ingliz tili (General)", Price = 500000, DurationMonths = 6, Description = "Boshlang'ich va o'rta daraja" },
                    new Course { Title = "Matematika (Abituriyent)", Price = 600000, DurationMonths = 9, Description = "DTM ga tayyorlov" }
                );
                await context.SaveChangesAsync();
            }

            if (!await context.Groups.AnyAsync())
            {
                var course = await context.Courses.FirstAsync();
                var teacher = await context.Teachers.FirstAsync();
                context.Groups.Add(new Group
                {
                    Name = "ENG-101",
                    CourseId = course.Id,
                    TeacherId = teacher.Id,
                    Schedule = "Du/Chor/Jum 18:00",
                    MaxStudents = 15,
                    CurrentStudents = 2,
                    Status = "Faol"
                });
                await context.SaveChangesAsync();
            }

            if (!await context.Students.AnyAsync())
            {
                context.Students.AddRange(
                    new Student { FullName = "Sardor Aliyev", PhoneNumber = "+998931234567", Balance = 0, Status = "Faol" },
                    new Student { FullName = "Madina Rashidova", PhoneNumber = "+998937654321", Balance = -500000, Status = "Faol" }
                );
                await context.SaveChangesAsync();
            }

            if (!await context.Leads.AnyAsync())
            {
                context.Leads.AddRange(
                    new Lead { FullName = "Jasur Toshmatov", PhoneNumber = "+998901230011", Source = "Instagram", Status = "Yangi", Notes = "Ingliz tiliga qiziqyapti" },
                    new Lead { FullName = "Nodira Karimova", PhoneNumber = "+998901230022", Source = "Telegram", Status = "Bog'lanildi", Notes = "Sinov darsiga taklif qilindi" }
                );
                await context.SaveChangesAsync();
            }

            if (!await context.Invoices.AnyAsync())
            {
                var student = await context.Students.FirstAsync();
                context.Invoices.Add(new Invoice
                {
                    StudentId = student.Id,
                    Amount = 500000,
                    PaidAmount = 0,
                    RemainingAmount = 500000,
                    DueDate = DateTime.UtcNow.AddDays(7),
                    Status = "To'lanmagan",
                    Description = "Iyun oyi uchun to'lov"
                });
                await context.SaveChangesAsync();
            }
        }
    }
}
