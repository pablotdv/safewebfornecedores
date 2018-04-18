using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    [Table("PropostasArquivos")]
    public class PropostaArquivo
    {
        [Key]
        [ForeignKey(nameof(Proposta))]
        public Guid PropostaId { get; set; }

        [Required]
        public string Caminho { get; set; }

        [Required]
        public string Nome { get; set; }

        [JsonIgnore]
        public virtual Proposta Proposta { get; set; }
    }
}