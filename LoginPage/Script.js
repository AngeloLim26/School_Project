const RIGHT_USER = "Zyro";
const RIGHT_PASS = "123";

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
    infoBox.style.opacity = 1;
  } else if (user === RIGHT_USER && pass === RIGHT_PASS) {
    infoBox.innerText = "";
    alert("You have Logged in successfully!");
    infoBox.innerText = "Incorrect username or/and password";
    infoBox.style.display = "block";
    userBox.value = "";
    passBox.value = "";
    infoBox.style.opacity = 0;
  } else {
    infoBox.innerText = "Incorrect username or/and password";
    infoBox.style.display = "block";
    message.innerText = "";
    userBox.value = "";
    passBox.value = "";
    infoBox.style.opacity = 1;
  }
}

loginButton.onclick = checkLogin;