using SafewebFornecedores.Managers;
using SafewebFornecedores.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SafewebFornecedores.Infraestrutura
{
    public static class IdentityExtensions
    {
        public static async Task<Usuario> FindByCpfAsync(this ApplicationUserManager manager, string cpf)
        {
            using(ApplicationDbContext db = new ApplicationDbContext())
            {
                return await db.Users
                    .SingleOrDefaultAsync(a => a.Cpf.Equals(cpf));
            }
        }
    }
}