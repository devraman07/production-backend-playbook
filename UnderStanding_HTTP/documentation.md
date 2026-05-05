🌐 HTTP Fundamentals — Backend Engineering Notes
🔹 1. What is HTTP?

HTTP (HyperText Transfer Protocol) is a stateless application-layer protocol used for communication between a client and a server.

Works on request → response model
Runs over TCP (HTTP/1.1, HTTP/2) or QUIC (HTTP/3)
Foundation of all web/backend systems
🔹 2. Client-Server Model
Client → sends request (browser, mobile app)
Server → processes request and sends response

Flow:

Client → HTTP Request → Server → HTTP Response → Client
🔹 3. Statelessness

HTTP is stateless, meaning:

Each request is independent; server does NOT remember previous requests.

✅ Implications:
No built-in memory of user state
Every request must contain required data (auth tokens, etc.)
✅ How state is handled:
Cookies
Sessions
JWT tokens
🔹 4. Evolution of HTTP
HTTP/1.0 → New connection per request (slow)
HTTP/1.1 → Persistent connections (keep-alive)
HTTP/2 → Multiplexing, faster
HTTP/3 → Uses QUIC (UDP), lower latency
🔹 5. HTTP Methods
Method	Purpose	Idempotent
GET	Fetch data	✅
POST	Create data	❌
PUT	Replace resource	✅
PATCH	Partial update	❌
DELETE	Remove resource	✅
🔹 6. Idempotent vs Non-Idempotent
✅ Idempotent:

Same request multiple times → same result

Examples:

GET
PUT
DELETE
❌ Non-idempotent:

Multiple calls → different results

Example:

POST (creates duplicates)
🔹 7. HTTP Headers

Headers are key-value pairs that provide metadata and control behavior.

🔹 Why we need headers:
Authentication
Content type
Caching
Negotiation
🔹 Types of Headers:
1. Request Headers
Authorization
Accept
User-Agent
2. Response Headers
Content-Type
Cache-Control
3. General Headers
Connection
Date
4. Entity Headers
Content-Length
🔹 8. Extensibility of HTTP

HTTP is extensible via:

Custom headers
New methods
Middleware systems

👉 This allows modern APIs to evolve without breaking clients.

🔹 9. HTTP Status Codes
Categories:
Code Range	Meaning
1xx	Informational
2xx	Success
3xx	Redirection
4xx	Client Error
5xx	Server Error
🔹 Most Important Codes:
200 OK → Success
201 Created → Resource created
400 Bad Request → Invalid input
401 Unauthorized → Not authenticated
403 Forbidden → No permission
404 Not Found → Resource missing
500 Internal Server Error → Server issue
503 Service Unavailable → Server down/overloaded
🔹 10. Content Negotiation

Client specifies desired response format using headers:

Example:

Accept: application/json

Server responds accordingly.

👉 Enables flexibility (JSON, XML, etc.)

🔹 11. Simple vs Preflight Requests (CORS)
🔹 Simple Request:
Direct request
No pre-check
🔹 Preflight Request:
Browser sends OPTIONS request first
Checks permissions (CORS)

Used when:

Custom headers
Non-standard methods (PUT, DELETE)
🔹 12. Persistent Connections (Keep-Alive)
Keeps TCP connection open for multiple requests
Reduces latency
Improves performance
Connection: keep-alive
🔹 13. Handling Large Requests & Responses

Techniques used:

Pagination → limit data size
Streaming → send data in chunks
Chunked Transfer Encoding
Compression → gzip, brotli
🔹 14. HTTPS, SSL, TLS
🔹 HTTP vs HTTPS:
HTTP	HTTPS
Not secure	Secure
Plaintext	Encrypted
Port 80	Port 443
🔹 SSL vs TLS:
SSL → outdated ❌
TLS → modern encryption ✅
🔹 HTTPS Flow:
Client connects to server
TLS handshake happens
Encryption keys exchanged
Secure communication starts
🔹 15. Key Takeaways (Important)
HTTP is stateless
Correct use of methods + status codes = clean API design
Headers control behavior, security, performance
Idempotency is critical for retries and distributed systems
HTTPS ensures secure communication
Performance depends on:
keep-alive
compression
efficient data transfer
🚀 Final Thought

Understanding HTTP deeply means:

You’re not just “calling APIs”…
You understand how the internet actually works.