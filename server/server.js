// server.js
const http = require("http");
const url = require("url");

const DOMAINS = {
  "api.trymogee.com": {
    name: "Mogee API",
    bio: "Welcome to Mogee API!",
    links: [
      { title: "Documentation", url: "https://docs.trymogee.com" },
      { title: "GitHub", url: "https://github.com/mogee" },
    ],
  },
  "user1.finneykoshy.com": {
    name: "Finney Test",
    bio: "Testing custom domains!",
    links: [
      { title: "Twitter", url: "https://twitter.com/test" },
      { title: "GitHub", url: "https://github.com/test" },
    ],
  },
};

function generateHTML(userData) {
  return `<!DOCTYPE html>
<html><head><title>${userData.name}</title>
<style>body{font-family:Arial;max-width:400px;margin:50px auto;text-align:center}
.link{display:block;margin:10px 0;padding:15px;background:#f0f0f0;text-decoration:none;border-radius:5px}</style>
</head><body><h1>${userData.name}</h1><p>${userData.bio}</p>
${userData.links
  .map((link) => `<a href="${link.url}" class="link">${link.title}</a>`)
  .join("")}
</body></html>`;
}

function generateNotFoundHTML(domain) {
  return `<!DOCTYPE html>
<html><head><title>Domain Not Found</title>
<style>body{font-family:Arial;max-width:400px;margin:50px auto;text-align:center}
.error{color:#e74c3c;}</style>
</head><body>
<h1 class="error">Domain Not Found</h1>
<p>Sorry, the domain <strong>${domain}</strong> is not registered with our service.</p>
<p>Please check the domain name and try again.</p>
</body></html>`;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const domain = req.headers.host;

  console.log(`Received request for domain: ${domain}`);

  const userData = DOMAINS[domain];
  console.log("userData", userData);

  if (userData) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(generateHTML(userData));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(generateNotFoundHTML(domain));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
