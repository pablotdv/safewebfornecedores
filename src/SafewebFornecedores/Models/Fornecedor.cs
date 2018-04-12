using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    [Table("Fornecedores")]
    public class Fornecedor
    {
        [Key]
        public Guid FornecedorId { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [StringLength(14)]
        public string CpfCnpj { get; set; }

        [Required]
        [StringLength(200)]
        public string Nome { get; set; }

        [Required]        
        [StringLength(11)]
        public string Telefone { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(254)]
        public string Email { get; set; }

        [InverseProperty(nameof(Proposta.Fornecedor))]
        public virtual ICollection<Proposta> Propostas { get; set; }
    }
}