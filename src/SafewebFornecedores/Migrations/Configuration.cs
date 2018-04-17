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

    internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
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
            CreateUser(userManager, "administrador@swf.com.br", "03984401078", "Admin123@", "Administrador do sistema", "Administradores", new DateTime(1986, 12, 12));
            
            CreateFornecedores(context);
            CreateConfiguracoes(context);

            context.SaveChanges();
        }

        private void CreateConfiguracoes(ApplicationDbContext context)
        {
            if (!context.Configuracoes.Any())
            {
                context.Configuracoes.Add(new Configuracao()
                {
                    ConfiguracaoId = Guid.NewGuid(),
                    TempoProposta = 24
                });
            }
        }

        private void CreateFornecedores(ApplicationDbContext context)
        {
            if (!context.Fornecedores.Any())
            {
                context.Fornecedores.Add(new Fornecedor()
                {
                    FornecedorId = Guid.NewGuid(),
                    Email = "fornecedore1@email.com",
                    Nome = "Fornecedore 1",
                    Telefone = "55991515062",
                    CpfCnpj = "01214798039",                    
                });
            }
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
