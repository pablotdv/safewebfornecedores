using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Data.Entity;
using System.Threading;
using System.Threading.Tasks;

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

        public override int SaveChanges() => base.SaveChanges();

        public override Task<int> SaveChangesAsync() => base.SaveChangesAsync();

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken) => base.SaveChangesAsync(cancellationToken);

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Proposta> Propostas { get; set; }
        public DbSet<PropostaSituacao> PropostasSituacoes { get; set; }
    }
}