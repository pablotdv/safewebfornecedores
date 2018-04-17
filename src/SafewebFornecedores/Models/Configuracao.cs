using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    [Table("Configuracoes")]
    public class Configuracao
    {
        [Key]
        public Guid ConfiguracaoId { get; set; }

        public int TempoProposta { get; set; }
    }
}