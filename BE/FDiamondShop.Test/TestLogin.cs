using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace FDiamondShop.Test
{
    public class TestLogin
    {
        public class LoginTests
        {
            private readonly Mock<UserManager<IdentityUser>> _userManagerMock;
            private readonly Mock<SignInManager<IdentityUser>> _signInManagerMock;
            

            public LoginTests()
            {
                var userStoreMock = new Mock<IUserStore<IdentityUser>>();
                _userManagerMock = new Mock<UserManager<IdentityUser>>(
                    userStoreMock.Object, null, null, null, null, null, null, null, null);

                var contextAccessorMock = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
                var userClaimsPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<IdentityUser>>();
                _signInManagerMock = new Mock<SignInManager<IdentityUser>>(
                    _userManagerMock.Object,
                    contextAccessorMock.Object,
                    userClaimsPrincipalFactoryMock.Object,
                    null,
                    null,
                    null,
                    null);
                
            }

            [Fact]
            public async Task Login_Success()
            {
                
                var email = "Haduytung809@gmail.com";
                var password = "Haduytung809@";
                var user = new IdentityUser { UserName = email, Email = email };

                _userManagerMock.Setup(um => um.FindByEmailAsync(email))
                    .ReturnsAsync(user);
                _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(email, password, false, false))
                    .ReturnsAsync(SignInResult.Success);

                
                var result = await _signInManagerMock.Object.PasswordSignInAsync(email, password, false, false);

                Assert.True(result.Succeeded);
            }

            [Fact]
            public async Task Login_Fail_UserName()
            {
                
                var email = "haduytung809@gmail.com";
                var password = "Haduytung809@";
                var user = new IdentityUser { UserName = email, Email = email };

                _userManagerMock.Setup(um => um.FindByEmailAsync(email))
                    .ReturnsAsync(user);

                
                _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(email, password, false, false))
                    .ReturnsAsync(SignInResult.Failed);

                
                var result = await _signInManagerMock.Object.PasswordSignInAsync(email, password, false, false);

                
                Assert.False(result.Succeeded);
            }

            [Fact]
            public async Task Login_Fail_Password()
            {
               
                var email = "Haduytung809@gmail.com";
                var password = "haduytung809@";
                var user = new IdentityUser { UserName = email, Email = email };

                _userManagerMock.Setup(um => um.FindByEmailAsync(email))
                    .ReturnsAsync(user);
                _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(email, password, false, false))
                    .ReturnsAsync(SignInResult.Failed);

               
                var result = await _signInManagerMock.Object.PasswordSignInAsync(email, password, false, false);

                
                Assert.False(result.Succeeded);
            }

            
        }
    }
}