using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace UnitTest
{
    [TestClass]
    public class Login_Valid
    {
        [TestMethod]
        public void Login_valid()
        {
            var mockRepo=new MockRepo();
            var user= new User { UserName = "Haduytung809@gmail.com", Password = "Haduytung809@" };
            mockRepo.Setup(re=>re.GetUser(user.UserName, user.Password)).Returns(user);
            var userService= new UserService(mockRepo.Object);
            bool result = userService.Login(user.UserName, user.Password);
            Assert.IsTrue(result);
        }
    }
}
