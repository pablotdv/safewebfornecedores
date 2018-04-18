using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    [Table("Propostas")]
    public class Proposta
    {
        [Key]
        public Guid PropostaId { get; set; }

        public Guid CategoriaId { get; set; }

        public Guid FornecedorId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Numero { get; set; }

        [Required]
        [StringLength(200)]
        public string Nome { get; set; }

        public DateTime Data { get; set; }

        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }

        public string Descricao { get; set; }

        public string Arquivo { get; set; }

        public DateTime DataSituacao { get; set; }

        public Situacao Situacao { get; set; }

        [ForeignKey(nameof(CategoriaId))]
        public virtual Categoria Categoria { get; set; }

        [ForeignKey(nameof(FornecedorId))]        
        public virtual Fornecedor Fornecedor { get; set; }

        public virtual PropostaArquivo PropostaArquivo { get; set; }

        public virtual ICollection<PropostaSituacao> PropostasSituacoes { get; set; }
    }
}