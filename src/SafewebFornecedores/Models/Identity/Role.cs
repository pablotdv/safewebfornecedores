﻿using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SafewebFornecedores.Models
{
    public class Role : IdentityRole<Guid, UsuarioRole>
    {
        public Role()
        {
            Id = Guid.NewGuid();
        }
    }
}