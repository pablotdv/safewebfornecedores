using SafewebFornecedores.Models;
using SafewebFornecedores.ViewModels.Usuarios;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace SafewebFornecedores.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
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

        // PUT: api/users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategoria(Guid id, UsuarioEditarModel model)
        {
            var usuario = await db.Users.SingleOrDefaultAsync(a => a.Id == id);

            if (usuario == null)
            {
                return NotFound();
            }

            if (await db.Users.AnyAsync(a=>a.Email == model.Email && a.Id != model.Id))
            {
                ModelState.AddModelError("", "O email informado já está cadastrado para outro usuário.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            usuario.Cpf = model.Cpf;
            usuario.Nome = model.Nome;
            usuario.DataNascimento = model.DataNascimento;
            usuario.Email = model.Email;            
                        
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/users/5
        [ResponseType(typeof(Usuario))]
        public async Task<IHttpActionResult> DeleteUsuario(Guid id)
        {
            var usuario = await db.Users.SingleOrDefaultAsync(a=>a.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            db.Users.Remove(usuario);
            await db.SaveChangesAsync();

            return Ok(usuario);
        }

        private async Task<bool> UsuarioExists(Guid id)
        {
            return await db.Users.AnyAsync(e => e.Id == id);
        }
    }
}
