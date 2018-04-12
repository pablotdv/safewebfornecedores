using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafewebFornecedores.Models
{
    [Table("PropostasSituacoes")]
    public class PropostaSituacao
    {
        [Key]
        public Guid PropostaSituacaoId { get; set; }

        public Guid PropostaId { get; set; }

        public Guid UsuarioId { get; set; }

        public DateTime Data { get; set; }

        public Situacao Situacao { get; set; }

        [ForeignKey(nameof(PropostaId))]
        public virtual Proposta Proposta { get; set; }

        [ForeignKey(nameof(UsuarioId))]
        public virtual Usuario Usuario { get; set; }
    }
}