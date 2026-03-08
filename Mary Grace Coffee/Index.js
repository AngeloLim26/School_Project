// ============================================
// MENU ITEMS LIST
// Each item has: id, name, description, price, image
// ============================================
const menuItems = [
    {
      id: 1,
      name: "Cheesy Ensaymada",
      description: "Soft, buttery, and perfect for a quick study break.",
      price: 55,
      image: "Images/Laguna Cheese.jpg",
    },
    {
      id: 2,
      name: "Triple Cheese Bun",
      description: "A cheesy bite for late-night review sessions.",
      price: 65,
      image: "Images/Three Cheese.jpg",
    },
    {
      id: 3,
      name: "Cinnamon Apple Roll",
      description: "Sweet cinnamon + apple glaze for cozy study vibes.",
      price: 70,
      image: "Images/Cinnamon Apple.jpg",
    },
    {
      id: 4,
      name: "Banana Choco Snack",
      description: "Banana + chocolate drizzle = budget-friendly happiness.",
      price: 60,
      image: "Images/Banana Chocolate.jpg",
    },
    {
      id: 5,
      name: "Caramel Almond Swirl",
      description: "Caramel sweetness with toasted almond crunch.",
      price: 75,
      image: "Images/Caramel and Toasted Almonds.jpg",
    },
    {
      id: 6,
      name: "Iced Choco Cloud",
      description: "Chilled chocolate drink topped with creamy foam.",
      price: 80,
      image: "Images/Mary Grace Cold Hot Chocolate.jpg",
    },
    {
      id: 7,
      name: "White Hot Chocolate",
      description: "Creamy white chocolate drink for a cozy study break.",
      price: 90,
      image: "Images/White Hot Chocolate.jpg",
    },
    {
      id: 8,
      name: "Traditional Tsokolate",
      description: "Rich traditional tablea chocolate, perfect for late-night cramming.",
      price: 95,
      image: "Images/Traditional Tsokolate.jpg",
    },
    {
      id: 9,
      name: "Spicy Mexicana Tsokolate",
      description: "Dark chocolate with a warm spicy kick to keep you awake.",
      price: 100,
      image: "Images/Spicy Mexicana Tsokolate.jpg",
    },
  ];
  
  // ============================================
  // GET HTML ELEMENTS
  // ============================================
  var grid = document.getElementById("menu-grid");
  var totalSpan = document.getElementById("order-total");
  var countSpan = document.getElementById("item-count");
  var orderItemsEl = document.getElementById("order-items");
  var checkoutButton = document.getElementById("checkout-button");
  var clearOrderButton = document.getElementById("clear-order");
  
  // Track how many of each item was ordered
  // qtyList[0] = quantity of menuItems[0], and so on
  var qtyList = [];
  
  // ============================================
  // FORMAT PRICE (example: 55 → ₱55.00)
  // ============================================
  function formatCurrency(value) {
    return "₱" + value.toFixed(2);
  }
  
  // ============================================
  // RESET ORDER - set all quantities to 0
  // ============================================
  function resetOrder() {
    qtyList = [];
    for (var i = 0; i < menuItems.length; i++) {
      qtyList.push(0);
    }
  }
  
  // ============================================
  // COMPUTE TOTAL ITEMS AND TOTAL PRICE
  // ============================================
  var itemCount = 0;
  var total = 0;
  
  function computeTotals() {
    itemCount = 0;
    total = 0;
  
    for (var i = 0; i < menuItems.length; i++) {
      var qty = qtyList[i];
      itemCount += qty;
      total += menuItems[i].price * qty;
    }
  }
  
  // ============================================
  // UPDATE ORDER DISPLAY (right side panel)
  // ============================================
  function updateOrderDisplay() {
    computeTotals();
  
    if (orderItemsEl) {
      orderItemsEl.innerHTML = "";
  
      for (var i = 0; i < menuItems.length; i++) {
        if (qtyList[i] > 0) {
          var li = document.createElement("li");
  
          var nameSpan = document.createElement("span");
          nameSpan.className = "order-item-name";
          nameSpan.textContent = menuItems[i].name;
  
          var qtySpan = document.createElement("span");
          qtySpan.className = "order-item-qty";
          qtySpan.textContent = "x" + qtyList[i];
  
          li.appendChild(nameSpan);
          li.appendChild(qtySpan);
          orderItemsEl.appendChild(li);
        }
      }
  
      // If no items added yet
      if (itemCount === 0) {
        var emptyLi = document.createElement("li");
        emptyLi.textContent = "No items yet. Add something!";
        orderItemsEl.appendChild(emptyLi);
      }
    }
  
    if (totalSpan) totalSpan.textContent = formatCurrency(total);
    if (countSpan) countSpan.textContent = String(itemCount);
  }
  
  // ============================================
  // RENDER MENU CARDS
  // ============================================
  function renderMenu() {
    if (!grid) return;
  
    for (var i = 0; i < menuItems.length; i++) {
      var item = menuItems[i];
      var card = document.createElement("article");
      card.className = "menu-card";
  
      card.innerHTML =
        '<img src="' + item.image + '" alt="' + item.name + '">' +
        '<div class="menu-card-body">' +
          '<h3 class="menu-card-title">' + item.name + '</h3>' +
          '<p class="menu-card-desc">' + item.description + '</p>' +
          '<div class="menu-card-footer">' +
            '<span class="menu-card-price">' + formatCurrency(item.price) + '</span>' +
            '<button data-id="' + item.id + '">Add to Order</button>' +
          '</div>' +
        '</div>';
  
      grid.appendChild(card);
    }
  }
  
  // ============================================
  // FIND MENU INDEX BY ID
  // ============================================
  function getMenuIndexById(id) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  
  // ============================================
  // START THE PAGE
  // ============================================
  resetOrder();
  renderMenu();
  updateOrderDisplay();
  
  // ============================================
  // ADD TO ORDER (when user clicks "Add to Order")
  // ============================================
  if (grid) {
    grid.addEventListener("click", function (event) {
      var target = event.target;
  
      if (target.tagName === "BUTTON") {
        var idText = target.getAttribute("data-id");
        var id = Number(idText);
  
        var index = getMenuIndexById(id);
        if (index !== -1) {
          qtyList[index] += 1;
          updateOrderDisplay();
        }
      }
    });
  }
  
  // ============================================
  // CLEAR ORDER BUTTON
  // ============================================
  if (clearOrderButton) {
    clearOrderButton.addEventListener("click", function () {
      resetOrder();
      updateOrderDisplay();
    });
  }
  
  // ============================================
  // CHECKOUT BUTTON
  // ============================================
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      computeTotals();
  
      if (itemCount === 0) {
        alert("Your order is empty. Please add items first.");
      } else {
        alert(
          "===== Checkout Summary =====\n" +
          "Items ordered: " + itemCount + "\n" +
          "Total amount: " + formatCurrency(total) + "\n\n" +
          "Thank you for ordering at Mary Grace Coffee! ☕"
        );
      }
    });
  }
  
  
  // ============================================
  // BACK TO TOP BUTTON
  // This works on both Index.html and About_Us.html
  // ============================================
  
  // Get the back to top button element
  var btn = document.getElementById("backToTopBtn");
  
  // When the user scrolls the page, this function runs
  window.onscroll = function () {
  
    // scrollTop tells us how many pixels the user has scrolled down
    if (document.documentElement.scrollTop > 300) {
      // User scrolled more than 300px down - show the button
      btn.style.display = "block";
    } else {
      // User is near the top - hide the button
      btn.style.display = "none";
    }
  };
  
  // When the user clicks the button, scroll smoothly back to the top
  btn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };