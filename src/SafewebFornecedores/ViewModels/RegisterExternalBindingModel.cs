using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SafewebFornecedores.ViewModels
{
    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
