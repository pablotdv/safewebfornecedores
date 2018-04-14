using SafewebFornecedores.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SafewebFornecedores.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/users/
        [Authorize(Roles = "Administradores")]
        public async Task<IList<Usuario>> GetUsers()
        {
            return await db.Users.Include(a => a.Roles).OrderBy(a => a.Nome).ToListAsync();
        }

        // GET: api/users/5
        [ResponseType(typeof(Usuario))]
        public async Task<IHttpActionResult> GetUser(Guid id)
        {
            Usuario usuario = await db.Users.FirstOrDefaultAsync(a => a.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }
    }
}
