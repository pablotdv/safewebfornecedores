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
    public class PropostasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Propostas
        public IQueryable<Proposta> GetPropostas()
        {
            return db.Propostas;
        }

        // GET: api/Propostas/5
        [ResponseType(typeof(Proposta))]
        public async Task<IHttpActionResult> GetProposta(Guid id)
        {
            Proposta proposta = await db.Propostas.FindAsync(id);
            if (proposta == null)
            {
                return NotFound();
            }

            return Ok(proposta);
        }

        // PUT: api/Propostas/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProposta(Guid id, Proposta proposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != proposta.PropostaId)
            {
                return BadRequest();
            }

            db.Entry(proposta).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropostaExists(id))
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

        // POST: api/Propostas
        [ResponseType(typeof(Proposta))]
        public async Task<IHttpActionResult> PostProposta(Proposta proposta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Propostas.Add(proposta);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PropostaExists(proposta.PropostaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = proposta.PropostaId }, proposta);
        }

        // DELETE: api/Propostas/5
        [ResponseType(typeof(Proposta))]
        public async Task<IHttpActionResult> DeleteProposta(Guid id)
        {
            Proposta proposta = await db.Propostas.FindAsync(id);
            if (proposta == null)
            {
                return NotFound();
            }

            db.Propostas.Remove(proposta);
            await db.SaveChangesAsync();

            return Ok(proposta);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PropostaExists(Guid id)
        {
            return db.Propostas.Count(e => e.PropostaId == id) > 0;
        }
    }
}