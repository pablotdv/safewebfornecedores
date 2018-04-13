using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace SafewebFornecedores.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class Usuario : IdentityUser<Guid, UsuarioLogin, UsuarioRole, UsuarioClaim>
    {
        public Usuario()
        {
            Id = Guid.NewGuid();
        }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(11)]
        public string Cpf { get; set; }

        [Required]
        [StringLength(200)]
        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        [InverseProperty(nameof(PropostaSituacao.Usuario))]
        public virtual ICollection<PropostaSituacao> PropostasSituacoes { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Usuario, Guid> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}