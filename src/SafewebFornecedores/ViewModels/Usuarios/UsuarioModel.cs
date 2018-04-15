using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.ViewModels.Usuarios
{
    public class UsuarioModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Perfil { get; set; }
    }
}