using System;
using System.Collections.Generic;

namespace FDiamondShop.API.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public string Email { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? PasswordHash { get; set; }

    public string? Googleid { get; set; }

    public bool? IsGoogleAccount { get; set; }

    public string Role { get; set; } = null!;

    public DateTime? DateCreate { get; set; }
}
