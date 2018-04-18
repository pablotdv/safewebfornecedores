using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using SafewebFornecedores.Models;
using SafewebFornecedores.ViewModels;

namespace SafewebFornecedores.Controllers
{
    [EnableCors("*", "*", "*")]
    [Authorize]
    [RoutePrefix("api/propostas")]
    public class PropostasController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Propostas
        public async Task<IList<Proposta>> GetPropostas()
        {
            return await db.Propostas
                .Include(a => a.Fornecedor)
                .Include(a => a.Categoria)
                .Include(a => a.PropostaArquivo)
                .OrderBy(a => a.Numero).ToListAsync();
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
            if (id != proposta.PropostaId)
            {
                return BadRequest();
            }

            if (proposta.Situacao != Situacao.Aberto)
            {
                ModelState.AddModelError("", $"A proposta {proposta.Numero} não pode ser mais editada.");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

            if (proposta.PropostaId == Guid.Empty)
                proposta.PropostaId = Guid.NewGuid();
            proposta.Data = DateTime.Now;
            if (proposta.PropostasSituacoes == null)
                proposta.PropostasSituacoes = new List<PropostaSituacao>();

            proposta.PropostasSituacoes.Add(new PropostaSituacao()
            {
                PropostaSituacaoId = Guid.NewGuid(),
                Data = DateTime.Now,
                Situacao = Situacao.Aberto,
                UsuarioId = new Guid(User.Identity.GetUserId()),
            });
            proposta.Situacao = Situacao.Aberto;
            proposta.DataSituacao = DateTime.Now;

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

        // POST: api/Propostas/Aprovar
        [ResponseType(typeof(void))]
        [HttpPut]
        [Authorize(Roles = "AnalistaFinanceiro,DiretorFinanceiro")]
        [Route("aprovar")]
        public async Task<IHttpActionResult> Aprovar(Proposta model)
        {
            var proposta = await db.Propostas.Include(a => a.PropostasSituacoes).FirstOrDefaultAsync(a => a.PropostaId == model.PropostaId);
            if (proposta == null)
            {
                return NotFound();
            }
            var configuracao = await db.Configuracoes.SingleOrDefaultAsync();

            if (proposta.Situacao == Situacao.Aberto && proposta.Data.AddHours(configuracao.TempoProposta) <= DateTime.Now)
            {
                ModelState.AddModelError("", $"O prazo de aprovação da proposta {proposta.Numero} expirou.");
                return BadRequest(ModelState);
            }

            if (proposta.Situacao != Situacao.Aberto)
            {
                ModelState.AddModelError("A", $"A proposta #{proposta.Numero} não pode ser mais aprovada.");
                return BadRequest(ModelState);
            }

            if (proposta.Situacao == Situacao.Aberto && proposta.Valor > 10000 && !User.IsInRole("DiretorFinanceiro"))
            {
                ModelState.AddModelError("A", "A proposta só pode ser aprovada pelo Diretor Financeiro");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var situacao = User.IsInRole("DiretorFinanceiro") ? Situacao.AprovadaDiretoria : Situacao.Aprovada;
            proposta.PropostasSituacoes.Add(new PropostaSituacao()
            {
                PropostaSituacaoId = Guid.NewGuid(),
                Situacao = situacao,
                Data = DateTime.Now,
                UsuarioId = new Guid(User.Identity.GetUserId()),
            });
            proposta.Situacao = situacao;
            proposta.DataSituacao = DateTime.Now;

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

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Propostas/reprovar
        [ResponseType(typeof(void))]
        [HttpPut]
        [Authorize(Roles = "AnalistaFinanceiro,DiretorFinanceiro")]
        [Route("reprovar")]
        public async Task<IHttpActionResult> Reprovar(Proposta model)
        {
            var proposta = await db.Propostas.Include(a => a.PropostasSituacoes).FirstOrDefaultAsync(a => a.PropostaId == model.PropostaId);
            if (proposta == null)
            {
                return NotFound();
            }

            if (proposta.Situacao != Situacao.Aberto)
            {
                ModelState.AddModelError("A", $"A proposta #{proposta.Numero} não pode ser mais reprovada");
            }
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var situacao = Situacao.Reprovada;
            proposta.PropostasSituacoes.Add(new PropostaSituacao()
            {
                PropostaSituacaoId = Guid.NewGuid(),
                Situacao = situacao,
                Data = DateTime.Now,
                UsuarioId = new Guid(User.Identity.GetUserId()),
            });
            proposta.Situacao = situacao;
            proposta.DataSituacao = DateTime.Now;

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

            return StatusCode(HttpStatusCode.NoContent);
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

            if (proposta.Situacao != Situacao.Aberto)
            {
                ModelState.AddModelError("", $"A proposta {proposta.Numero} não pode ser mais excluída.");
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

    public class MyReponse
    {
        public Boolean Status { get; set; }
        public String Message { get; set; }
        public Object Result { get; set; }

        public MyReponse()
        {
            this.Status = false;
            this.Message = "Some internal error";
        }
    }
}