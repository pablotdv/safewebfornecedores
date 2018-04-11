namespace SafewebFornecedores.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using SafewebFornecedores.Managers;
    using SafewebFornecedores.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SafewebFornecedores.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ApplicationDbContext context)
        {
            CreateRoles(context);

            var userManager = new ApplicationUserManager(new UserStore<Usuario, Role, Guid, UsuarioLogin, UsuarioRole, UsuarioClaim>(context));
            CreateUser(userManager, "administrador@swf.com.br", "44976159019", "Admin123@", "Administrador do Sistema", "Administradores", new DateTime(1986, 12, 12));
            CreateUser(userManager, "compras@swf.com.br", "67157395010", "Compras123@", "Analista de Compras", "AnalistaCompras", new DateTime(1987, 11, 10));
            CreateUser(userManager, "financeiro@swf.com.br", "77092420067", "Financeiro123@", "Analista Financeiro", "AnalistaFinanceiro", new DateTime(1985, 10, 15));
            CreateUser(userManager, "diretor@swf.com.br", "64757705077", "Diretor123@", "Diretor Financeiro", "DiretorFinanceiro", new DateTime(1984, 01, 12));
        }

        private static void CreateRoles(ApplicationDbContext context)
        {
            var roleManager = new ApplicationRoleManager(new RoleStore<Role, Guid, UsuarioRole>(context));
            var roleNames = new string[] { "Administradores", "AnalistaCompras", "AnalistaFinanceiro", "DiretorFinanceiro" };
            foreach (var roleName in roleNames)
                if (!roleManager.Roles.Any(r => r.Name == roleName))
                    roleManager.Create(new Role { Name = roleName });
        }

        private Usuario CreateUser(ApplicationUserManager userManager, string userName, string cpf, string userPassword, string nome, string userRole, DateTime dataNascimento)
        {
            var user = userManager.FindByName(userName);
            if (user == null)
            {
                user = new Usuario
                {
                    Id = Guid.NewGuid(),
                    UserName = userName,
                    Cpf = cpf,
                    Email = userName,
                    Nome = nome,
                    DataNascimento = dataNascimento,
                };

                var result = userManager.Create(user, userPassword);
                result = userManager.SetLockoutEnabled(user.Id, false);
                if (!String.IsNullOrEmpty(userRole))
                    userManager.AddToRole(user.Id, userRole);
            }
            return user;
        }
    }
}
