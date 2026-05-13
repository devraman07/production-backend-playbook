🚦 Backend Routing Fundamentals
🔹 1. What is Routing?

Routing is the process of determining:

Which code/function should handle an incoming request.

When a client sends a request:

GET /products

The backend checks:

“Who is responsible for handling /products?”

That matching process is called routing.

Flow
Client Request → Router → Matching Route → Controller/Handler → Response
🔹 2. How Routing Works Internally

When a request reaches the server:

Server receives request
Router checks:
HTTP Method (GET, POST)
URL path (/products)
Finds matching route
Executes corresponding handler
Sends response

Example:

app.get("/products", (req, res) => {
  res.send("All products");
});

If request is:

GET /products

Backend matches:

GET + /products

and executes the function.

🔹 3. Static Routes

A static route has a fixed path.

Example:

app.get("/about", handler);
app.get("/products", handler);

URLs:

/about
/products
Characteristics
Fixed path
No dynamic value
Predictable
Real-world examples
/login
/signup
/dashboard
/profile
🔹 4. Dynamic Routes

Dynamic routes contain variables.

Example:

app.get("/products/:id", handler);

Request:

/products/123

123 becomes dynamic data.

Access using:

req.params.id

Example:

app.get("/products/:id", (req, res) => {
  res.send(req.params.id);
});

Response:

123
🔹 5. Path Parameters

Path params are values embedded inside URL path.

Example:

/products/10

Route:

/products/:id

Access:

req.params.id
Multiple Params
/users/:userId/orders/:orderId

Request:

/users/5/orders/10

Result:

req.params = {
  userId: "5",
  orderId: "10"
}
🔹 6. Query Parameters

Used for:

Filtering
Sorting
Pagination
Searching

Example:

/products?page=1&limit=5

Access:

req.query.page
req.query.limit

Example:

app.get("/products", (req, res) => {
  console.log(req.query);
});

Output:

{
 page: "1",
 limit: "5"
}
Difference
Path Params	Query Params
Identify resource	Modify behavior
Required	Optional

Example:

/products/5

vs

/products?page=1
🔹 7. Nested Routes

Routes inside routes representing relationships.

Example:

User → Orders

API:

/users/10/orders

or

/users/10/orders/5

Example:

app.get("/users/:id/orders", handler);
Why nested routes?

To represent hierarchy.

Example:

Student → Courses
Product → Reviews
Blog → Comments
🔹 8. Route Versioning

Used to avoid breaking existing clients.

Example:

Version 1
/api/v1/products
Version 2
/api/v2/products

Why?

Suppose mobile app depends on old API.

If backend changes suddenly:

❌ app breaks

Versioning avoids this.

Best Practice
/api/v1/
/api/v2/
🔹 9. API Deprecation

Deprecation means:

An API is old and will be removed later.

Example:

/api/v1/products

Still works but warning given.

New users should use:

/api/v2/products

Example header:

Deprecation: true

Purpose:

Smooth migration
Avoid breaking clients
🔹 10. Catch-All Routes

Used when no route matches.

Example:

app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

If request:

/random-route

Response:

404 Route not found
Why important?

Prevents:

Server confusion
Undefined behavior
Poor user experience
🔹 11. Route Design Best Practices
✅ Use nouns, not verbs

❌ Bad

/getProducts
/createProduct

✅ Good

/products
/products/:id

Use HTTP method instead.

✅ Keep URLs predictable

Good:

/products/10/reviews

Bad:

/get-product-review-details
✅ Version APIs
/api/v1
✅ Use query params for filtering
/products?category=electronics
🔹 12. Key Takeaways
Routing decides who handles request
Static routes → fixed path
Dynamic routes → variable path
Path params → identify resource
Query params → modify request behavior
Nested routes → relationships
Versioning prevents breaking apps
Deprecation supports smooth migration
Catch-all routes handle invalid URLs