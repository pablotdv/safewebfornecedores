using SafewebFornecedores.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.ViewModels
{
    public class PropostaFiltroModel
    {
        public string Nome { get; set; }
        public DateTime? DataInicial { get; set; }
        public DateTime? DataFinal { get; set; }
        public string Fornecedor { get; set; }
        public string Categoria { get; set; }
        public Situacao? Situacao { get; set; }
    }
}