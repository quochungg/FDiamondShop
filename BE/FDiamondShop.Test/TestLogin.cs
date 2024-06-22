using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace FDiamondShop.Test
{
    public class TestLogin
    {
        public class LoginTests
        {
            private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
            private readonly Mock<SignInManager<ApplicationUser>> _signInManagerMock;
            

            public LoginTests()
            {
                var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
                _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                    userStoreMock.Object, null, null, null, null, null, null, null, null);

                var contextAccessorMock = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
                var userClaimsPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();
                _signInManagerMock = new Mock<SignInManager<ApplicationUser>>(
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
                
                var email = "Testexample123@gmail.com";
                var password = "Testexample123@";
                var user = new ApplicationUser { UserName = email, Email = email };

                _userManagerMock.Setup(um => um.FindByEmailAsync(email)).ReturnsAsync(user);

                _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(email, password, false, false))
                    .ReturnsAsync(SignInResult.Success);

                
                var result = await _signInManagerMock.Object.PasswordSignInAsync(email, password, false, false);

                Assert.True(result.Succeeded);
            }

            [Fact]
            public async Task Login_Fail_UserName()
            {
                
                var email = "testexample123@gmail.com";
                var password = "Testexample123@";
                var user = new ApplicationUser { UserName = email, Email = email };

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
               
                var email = "Testexample123@gmail.com";
                var password = "testexample123@";
                var user = new ApplicationUser { UserName = email, Email = email };

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