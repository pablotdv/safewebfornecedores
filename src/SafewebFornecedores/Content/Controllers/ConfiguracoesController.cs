using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using SafewebFornecedores.Models;

namespace SafewebFornecedores.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    public class ConfiguracoesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Configuraceos
        [ResponseType(typeof(Configuracao))]
        public async Task<IHttpActionResult> GetConfiguracao()
        {
            Configuracao configuracao = await db.Configuracoes.SingleOrDefaultAsync();
            if (configuracao == null)
            {
                return NotFound();
            }

            return Ok(configuracao);
        }

        // PUT: api/Configuraceos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutConfiguracao(Guid id, Configuracao configuracao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != configuracao.ConfiguracaoId)
            {
                return BadRequest();
            }

            db.Entry(configuracao).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfiguracaoExists(id))
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConfiguracaoExists(Guid id)
        {
            return db.Configuracoes.Count(e => e.ConfiguracaoId == id) > 0;
        }
    }
}