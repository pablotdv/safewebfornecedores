using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SafewebFornecedores.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class Usuario : IdentityUser<Guid, UsuarioLogin, UsuarioRole, UsuarioClaim>
    {
        [Required]
        public string Cpf { get; set; }

        [Required]
        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Usuario, Guid> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}