using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    [Table("Categorias")]
    public class Categoria
    {
        [Key]
        public Guid CategoriaId { get; set; }

        [Required]
        [StringLength(200)]
        public string Descricao { get; set; }

        [InverseProperty(nameof(Proposta.Categoria))]
        public virtual ICollection<Proposta> Propostas { get; set; }
    }
}