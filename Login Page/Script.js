const RIGHT_USER = "Zyro";
const RIGHT_PASS = "12262008";

const userBox = document.getElementById("username");
const passBox = document.getElementById("password");
const infoBox = document.getElementById("infoBox");
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");

function checkLogin() {
  let user = userBox.value;
  let pass = passBox.value;

  if (user === "" || pass === "") {
    infoBox.innerText = "Incorrect username or/and password";
    infoBox.style.display = "block";
    message.innerText = "";
  } else if (user === RIGHT_USER && pass === RIGHT_PASS) {
    infoBox.innerText = "";
    infoBox.style.display = "none";
    alert("Login successful!");
    userBox.value = "";
    passBox.value = "";
  } else {
    infoBox.innerText = "Incorrect username or/and password";
    infoBox.style.display = "block";
    message.innerText = "";
    userBox.value = "";
    passBox.value = "";
  }
}

loginButton.onclick = checkLogin;
passBox.onkeydown = function (event) {
  if (event.key === "Enter") {
    checkLogin();
  }
};
