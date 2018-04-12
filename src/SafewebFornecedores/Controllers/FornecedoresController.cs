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
using System.Web.Http.Description;
using SafewebFornecedores.Models;

namespace SafewebFornecedores.Controllers
{
    public class FornecedoresController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Fornecedores
        public IQueryable<Fornecedor> GetFornecedores()
        {
            return db.Fornecedores;
        }

        // GET: api/Fornecedores/5
        [ResponseType(typeof(Fornecedor))]
        public async Task<IHttpActionResult> GetFornecedor(Guid id)
        {
            Fornecedor fornecedor = await db.Fornecedores.FindAsync(id);
            if (fornecedor == null)
            {
                return NotFound();
            }

            return Ok(fornecedor);
        }

        // PUT: api/Fornecedores/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFornecedor(Guid id, Fornecedor fornecedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fornecedor.FornecedorId)
            {
                return BadRequest();
            }

            db.Entry(fornecedor).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornecedorExists(id))
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

        // POST: api/Fornecedores
        [ResponseType(typeof(Fornecedor))]
        public async Task<IHttpActionResult> PostFornecedor(Fornecedor fornecedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Fornecedores.Add(fornecedor);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FornecedorExists(fornecedor.FornecedorId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = fornecedor.FornecedorId }, fornecedor);
        }

        // DELETE: api/Fornecedores/5
        [ResponseType(typeof(Fornecedor))]
        public async Task<IHttpActionResult> DeleteFornecedor(Guid id)
        {
            Fornecedor fornecedor = await db.Fornecedores.FindAsync(id);
            if (fornecedor == null)
            {
                return NotFound();
            }

            db.Fornecedores.Remove(fornecedor);
            await db.SaveChangesAsync();

            return Ok(fornecedor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FornecedorExists(Guid id)
        {
            return db.Fornecedores.Count(e => e.FornecedorId == id) > 0;
        }
    }
}