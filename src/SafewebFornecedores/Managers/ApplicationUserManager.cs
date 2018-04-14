using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using SafewebFornecedores.Infraestrutura;
using SafewebFornecedores.Models;

namespace SafewebFornecedores.Managers
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<Usuario, Guid>
    {
        public ApplicationUserManager(IUserStore<Usuario, Guid> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            //context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var manager = new ApplicationUserManager(new UserStore<Usuario, Role, Guid, UsuarioLogin, UsuarioRole, UsuarioClaim>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new ApplicationUserValidator(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<Usuario, Guid>(dataProtectionProvider.Create("SafewebFornecedores"));
            }
            return manager;
        }
    }

    public class ApplicationUserValidator : UserValidator<Usuario, Guid>
    {
        private readonly ApplicationUserManager _manager;

        public ApplicationUserValidator(ApplicationUserManager manager) : base(manager)
        {
            _manager = manager;
        }

        public override async Task<IdentityResult> ValidateAsync(Usuario item)
        {
            var result = await base.ValidateAsync(item);

            var user = await this._manager.FindByCpfAsync(item.Cpf);

            if (user != null && user.Id != item.Id)
            {
                var errors = result.Errors.ToList();
                errors.Add($"O Cpf {item.Cpf} já foi cadastrado para outro usuário!");
                result = new IdentityResult(errors);
            }

            return result;
        }
    }
}
