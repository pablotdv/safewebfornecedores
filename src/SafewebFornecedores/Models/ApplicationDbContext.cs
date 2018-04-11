using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;

namespace SafewebFornecedores.Models
{
    public class ApplicationDbContext : IdentityDbContext<Usuario, Role, Guid, UsuarioLogin, UsuarioRole, UsuarioClaim>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}