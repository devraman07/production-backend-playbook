# 🚦 Backend Routing System Documentation

## 📌 Overview

This project was built to deeply understand **backend routing fundamentals** and how incoming HTTP requests are handled inside a backend system.

The goal was not just creating endpoints, but understanding:

> How requests are matched, processed, and responded to through different routing strategies.

---

## 🎯 Objectives

This project demonstrates:

* Static routes
* Dynamic routes
* Path parameters
* Query parameters
* Pagination
* Search functionality
* Route ordering
* API versioning basics

---

# 🧠 Core Concepts Implemented

---

## 1. Static Routes

Static routes have a **fixed path**.

Example:

```http
GET /api/v1/products
GET /api/v1/products/about
```

### Purpose

Used when the route path never changes.

### Example

```js
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/about", about);
```

---

## 2. Dynamic Routes

Dynamic routes allow passing dynamic values through URL.

Example:

```http
GET /api/v1/products/5
```

Route:

```js
ProductRouter.get("/:id", getproductById);
```

### How it works

The route captures:

```text
:id
```

and stores it inside:

```js
req.params.id
```

---

## 3. Path Parameters

Path parameters identify **specific resources**.

Example:

```http
/products/10
```

Here:

```text
10 = product id
```

Accessed using:

```js
req.params.id
```

### Use Cases

* Get product by ID
* Get user profile
* Get specific order

---

## 4. Query Parameters

Query parameters modify request behavior.

Example:

```http
/products?page=1&limit=5
```

Accessed using:

```js
req.query
```

Example:

```js
const page = req.query.page;
const limit = req.query.limit;
```

### Use Cases

* Pagination
* Filtering
* Searching
* Sorting

---

## 5. Pagination

Pagination helps avoid sending large datasets at once.

Example:

```http
GET /api/v1/products/paginated?page=1&limit=5
```

### Logic

Pagination works using:

### Start Index

```text
(page - 1) × limit
```

### End Index

```text
startIndex + limit
```

Then:

```js
products.slice(startIndex, endIndex)
```

returns only required products.

### Example

Page 1:

```text
Products 1 → 5
```

Page 2:

```text
Products 6 → 10
```

---

## 6. Search Functionality

Implemented search using query parameters.

Example:

```http
GET /api/v1/products/search?q=laptop
```

### How it works

* Extract query
* Convert to lowercase
* Match name or description

Logic:

```js
includes()
```

This allows:

### Partial matching

Example:

```http
?q=phone
```

Matches:

```text
Headphones
Smartphone
```

---

## 7. Route Ordering (Important Learning)

Express matches routes **top → bottom**.

Wrong:

```js
ProductRouter.get("/:id");
ProductRouter.get("/search");
```

Problem:

```text
search
```

gets treated as:

```text
id = "search"
```

Correct:

```js
ProductRouter.get("/search");
ProductRouter.get("/:id");
```

### Rule

Always keep:

1. Static routes
2. Semi-dynamic routes
3. Dynamic routes

---

## 📂 Project Structure

```txt
project/
│
├── controllers/
│   └── productController.js
│
├── routes/
│   └── ProductRoute.js
│
├── data/
│   ├── products.js
│   └── users.js
│
└── server.js
```

---

## 📡 API Endpoints

### Get All Products

```http
GET /api/v1/products
```

---

### About Route

```http
GET /api/v1/products/about
```

---

### Get Product By ID

```http
GET /api/v1/products/:id
```

Example:

```http
GET /api/v1/products/5
```

---

### Paginated Products

```http
GET /api/v1/products/paginated?page=1&limit=5
```

---

### Search Products

```http
GET /api/v1/products/search?q=laptop
```

---

## ⚠️ Error Handling

### Invalid Product ID

```json
{
  "success": false,
  "data": null,
  "error": "Invalid Product ID"
}
```

---

### Missing Search Query

```json
{
  "success": false,
  "data": null,
  "error": "Search query is required"
}
```

---

## 🔥 Key Learnings

Through this project, I learned:

* How backend routing works internally
* Difference between static and dynamic routes
* Path params vs query params
* Pagination logic
* Search implementation
* Importance of route order in Express
* API design fundamentals

---

## 🎯 Conclusion

This project strengthened the understanding of **backend request routing** and laid the foundation for building scalable APIs.

It also introduced practical backend thinking such as:

> Efficient data handling, request organization, and route structure.
