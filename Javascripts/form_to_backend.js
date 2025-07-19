const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fordata = new FormData(form);
    const data = Object.fromEntries(fordata.entries());
    const req = await fetch("http://localhost:33333", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const res = await req.json();
    if (res.status === 200) {
        alert("Logging in successfully.");
    }
    else {
        alert("ID or email is wrong.");
    }
})