const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("loginForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const account = {
            name: document.getElementById("signup-name").value.trim(),
            email: document.getElementById("signup-email").value.trim(),
            password: password
        };

        let accounts = JSON.parse(localStorage.getItem("localVibeAccounts")) || [];

        const exists = accounts.some(function(user) {
            return user.email === account.email;
        });

        if (exists) {
            alert("This email is already registered.");
            return;
        }

        accounts.push(account);
        localStorage.setItem("localVibeAccounts", JSON.stringify(accounts));

        alert("Account created. Please sign in.");
        window.location.href = "signin.html";
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("userId").value.trim();
        const password = document.getElementById("password").value;
        const accounts = JSON.parse(localStorage.getItem("localVibeAccounts")) || [];

        const user = accounts.find(function(account) {
            return account.email === email && account.password === password;
        });

        if (!user) {
            alert("Incorrect email or password. Please register first.");
            return;
        }

        sessionStorage.setItem("localVibeUser", JSON.stringify(user));
        window.location.href = "profile.html";
    });
}

const profilePage = document.getElementById("sideName");

if (profilePage) {
    const user = JSON.parse(sessionStorage.getItem("localVibeUser"));

    if (!user) {
        window.location.href = "signin.html";
    } else {
        document.getElementById("sideName").textContent = user.name;
        document.getElementById("sideEmail").textContent = user.email;
        document.getElementById("avatar").textContent = user.name.charAt(0).toUpperCase();
        document.getElementById("fullName").textContent = user.name;
        document.getElementById("email").textContent = user.email;
        document.getElementById("phone").textContent = user.phone || "Not provided";
        document.getElementById("address").textContent = user.address || "Not provided";

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const orders = JSON.parse(localStorage.getItem("localVibeOrders")) || [];

        document.getElementById("cartCount").textContent = cart.length;
        document.getElementById("orderCount").textContent = orders.length;

        const recentOrders = document.getElementById("recentOrders");

        if (orders.length > 0) {
            recentOrders.innerHTML = "";

            orders.slice(-3).reverse().forEach(function(order) {
                const orderLine = document.createElement("p");
                orderLine.className = "muted";
                orderLine.textContent = "Order #" + order.id + " - " + (order.status || "Placed");
                recentOrders.appendChild(orderLine);
            });
        }

        document.getElementById("logout").addEventListener("click", function() {
            sessionStorage.removeItem("localVibeUser");
        });
    }
}
 

const vendorSignupForm = document.getElementById("vendorSignupForm");

if (vendorSignupForm) {
    vendorSignupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const vendor = {
            storeName: document.getElementById("storeName").value.trim(),
            name: document.getElementById("vendorName").value.trim(),
            email: document.getElementById("newVendorEmail").value.trim().toLowerCase(),
            phone: document.getElementById("vendorPhone").value.trim(),
            location: document.getElementById("vendorLocation").value.trim(),
            password: document.getElementById("newVendorPassword").value
        };

        const vendors = JSON.parse(localStorage.getItem("localVibeVendors")) || [];
        const alreadyRegistered = vendors.some(function(item) {
            return item.email.toLowerCase() === vendor.email;
        });

        if (alreadyRegistered) {
            alert("This email is already registered. Please sign in.");
            window.location.href = "vendor_signin.html";
            return;
        }

        vendors.push(vendor);
        localStorage.setItem("localVibeVendors", JSON.stringify(vendors));

        // Sign in the new vendor and open their own dashboard.
        sessionStorage.setItem("localVibeVendor", JSON.stringify(vendor));
        window.location.href = "vendorsdashboard.html";
    });
}

const vendorLoginForm = document.getElementById("vendorLoginForm");

if (vendorLoginForm) {
    vendorLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("vendorEmail").value.trim().toLowerCase();
        const password = document.getElementById("vendorPassword").value;
        const vendors = JSON.parse(localStorage.getItem("localVibeVendors")) || [];

        const vendor = vendors.find(function(item) {
            return item.email.toLowerCase() === email && item.password === password;
        });

        if (!vendor) {
            alert("Vendor account not found or password is incorrect. Please sign up first.");
            return;
        }

        sessionStorage.setItem("localVibeVendor", JSON.stringify(vendor));
        window.location.href = "vendorsdashboard.html";
    });
}

// Protect the dashboard and show only the signed-in vendor's details.
const vendorDashboard = document.getElementById("vendorDashboard");

if (vendorDashboard) {
    const activeVendor = JSON.parse(sessionStorage.getItem("localVibeVendor"));

    if (!activeVendor) {
        window.location.replace("vendor_signin.html");
    } else {
        document.getElementById("vendorWelcome").textContent = "Welcome, " + activeVendor.name + "!";
        document.getElementById("vendorStoreName").textContent = activeVendor.storeName;
        document.getElementById("vendorOwnerName").textContent = activeVendor.name;
        document.getElementById("vendorEmailDetail").textContent = activeVendor.email;
        document.getElementById("vendorPhoneDetail").textContent = activeVendor.phone;
        document.getElementById("vendorLocationDetail").textContent = activeVendor.location;

        document.getElementById("vendorLogout").addEventListener("click", function() {
            sessionStorage.removeItem("localVibeVendor");
            window.location.href = "index.html";
        });
    }
}
