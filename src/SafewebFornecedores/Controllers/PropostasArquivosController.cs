﻿using SafewebFornecedores.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Net.Http.Headers;

namespace SafewebFornecedores.Controllers
{
    [RoutePrefix("api/PropostasArquivos")]
    [EnableCors("*", "*", "*")]
    [Authorize]
    public class PropostasArquivosController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/PropostasArquivos/5
        [HttpGet]
        public async Task<IHttpActionResult> GetPropostaArquivo(Guid id)
        {
            PropostaArquivo propostaArquivo = await db.PropostasArquivos.FindAsync(id);
            if (propostaArquivo == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(File.ReadAllBytes(HttpContext.Current.Server.MapPath(propostaArquivo.Caminho)))
            };
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = propostaArquivo.Nome
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

            var response = ResponseMessage(result);

            return response;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var status = new MyReponse();
            try
            {
                var context = HttpContext.Current.Request;
                var propostaId = new Guid(context.Params["PropostaId"]);
                var proposta = await db.Propostas.Include(a => a.PropostaArquivo).FirstOrDefaultAsync(a => a.PropostaId == propostaId);


                if (context.Files.Count > 0)
                {
                    string caminhoVirtual = $"~/uploads/propostas/";
                    string caminhoFisico = context.MapPath(caminhoVirtual);
                    if (!Directory.Exists(caminhoFisico))
                        Directory.CreateDirectory(caminhoFisico);

                    for (int i = 0; i < context.Files.Count; i++)
                    {
                        var file = context.Files[i];
                        var extension = new FileInfo(file.FileName).Extension;
                        var fileName = $"{proposta.PropostaId}{extension}";
                        string nomeArquivo = Path.Combine(caminhoFisico, fileName);
                        file.SaveAs(nomeArquivo);

                        proposta.PropostaArquivo = new PropostaArquivo()
                        {
                            Caminho = $"{caminhoVirtual}/{fileName}",
                            Nome = file.FileName
                        };
                    }
                    await db.SaveChangesAsync();
                    status.Status = true;
                    status.Message = "File uploaded successfully";
                    return Request.CreateResponse(HttpStatusCode.OK, status);
                }
            }
            catch (Exception ex)
            {
                status.Message = ex.Message;
            }
            return Request.CreateResponse(HttpStatusCode.OK, status);
        }
    }
}
