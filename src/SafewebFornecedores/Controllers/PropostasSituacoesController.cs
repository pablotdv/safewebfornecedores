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
    public class PropostasSituacoesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/PropostasSituacoes
        public IQueryable<PropostaSituacao> GetPropostaSituacaos()
        {
            return db.PropostasSituacoes;
        }

        // GET: api/PropostasSituacoes/5
        [ResponseType(typeof(PropostaSituacao))]
        public async Task<IHttpActionResult> GetPropostaSituacao(Guid id)
        {
            PropostaSituacao propostaSituacao = await db.PropostasSituacoes.FindAsync(id);
            if (propostaSituacao == null)
            {
                return NotFound();
            }

            return Ok(propostaSituacao);
        }

        // PUT: api/PropostasSituacoes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPropostaSituacao(Guid id, PropostaSituacao propostaSituacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != propostaSituacao.PropostaSituacaoId)
            {
                return BadRequest();
            }

            db.Entry(propostaSituacao).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropostaSituacaoExists(id))
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

        // POST: api/PropostasSituacoes
        [ResponseType(typeof(PropostaSituacao))]
        public async Task<IHttpActionResult> PostPropostaSituacao(PropostaSituacao propostaSituacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PropostasSituacoes.Add(propostaSituacao);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PropostaSituacaoExists(propostaSituacao.PropostaSituacaoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = propostaSituacao.PropostaSituacaoId }, propostaSituacao);
        }

        // DELETE: api/PropostasSituacoes/5
        [ResponseType(typeof(PropostaSituacao))]
        public async Task<IHttpActionResult> DeletePropostaSituacao(Guid id)
        {
            PropostaSituacao propostaSituacao = await db.PropostasSituacoes.FindAsync(id);
            if (propostaSituacao == null)
            {
                return NotFound();
            }

            db.PropostasSituacoes.Remove(propostaSituacao);
            await db.SaveChangesAsync();

            return Ok(propostaSituacao);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PropostaSituacaoExists(Guid id)
        {
            return db.PropostasSituacoes.Count(e => e.PropostaSituacaoId == id) > 0;
        }
    }
}