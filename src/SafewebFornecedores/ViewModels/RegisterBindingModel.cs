﻿using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SafewebFornecedores.ViewModels
{
    public class RegisterBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]        
        [StringLength(11)]
        public string Cpf { get; set; }

        [Required]
        [StringLength(200)]
        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Perfil { get; set; }
    }
}
