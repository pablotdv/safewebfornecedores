using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Data.Entity;

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

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Proposta> Propostas { get; set; }
        public DbSet<PropostaSituacao> PropostasSituacoes { get; set; }
    }
}