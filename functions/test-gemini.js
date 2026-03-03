const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

async function testGemini() {
    console.log("Starting test...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "TEST_KEY_REPLACE_ME");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = "Extract EVERY SINGLE exam question visible in the document.";

        // Let's test a simple text generation first to see if the key works
        console.log("Calling model...");
        const result = await model.generateContent(prompt);
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}

testGemini();
