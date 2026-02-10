const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "akshit0018.be23@chitkara.edu.in"
  });
});
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    // validation: exactly one key
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key is required"
      });
    }

    const key = keys[0];
    const value = body[key];

    let result;

    // logic will go here

    
    if (key === "fibonacci") {
  if (typeof value !== "number" || value < 0) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid fibonacci input"
    });
  }

  let fib = [0, 1];
  for (let i = 2; i < value; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }

  result = fib.slice(0, value);
}
else if (key === "prime") {
  if (!Array.isArray(value)) {
    return res.status(400).json({ is_success: false });
  }

  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  result = value.filter(isPrime);
}
else if (key === "hcf") {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  result = value.reduce((a, b) => gcd(a, b));
}
else if (key === "lcm") {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);

  result = value.reduce((a, b) => lcm(a, b));
}
else if (key === "AI") {
  const axios = require("axios");

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    {
      contents: [{ parts: [{ text: value }] }]
    },
    {
      params: { key: process.env.GEMINI_API_KEY }
    }
  );

  result = response.data.candidates[0].content.parts[0].text.split(" ")[0];
}



    res.status(200).json({
      is_success: true,
      official_email: "akshit0018.be23@chitkara.edu.in",
      data: result
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: "Server error"
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
