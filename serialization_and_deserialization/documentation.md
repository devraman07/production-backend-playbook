# 🔄 Serialization & Deserialization in Backend Systems

## 📌 Overview

Serialization and deserialization are foundational backend concepts that make communication between systems possible.

In real-world backend systems:

> Data cannot travel over a network in its native programming language object form.

A JavaScript object cannot directly travel to a Rust, Java, or Python backend.

We need a **common transferable format**.

This is where **serialization** and **deserialization** come into play.

---

# 🧠 1. What is Serialization?

### Definition

Serialization is the process of:

> Converting an in-memory object/data structure into a standard transferable format.

The serialized data can then be:

* Sent over network
* Stored in databases
* Saved to files
* Cached
* Sent to message queues

---

## Example

### JavaScript Object

```js
const user = {
  name: "Raman",
  age: 22,
  role: "developer"
};
```

### Serialized JSON

```json
{
  "name": "Raman",
  "age": 22,
  "role": "developer"
}
```

In JavaScript:

```js
JSON.stringify(user);
```

---

## Why Serialization is Needed

Different systems use different languages.

Example:

```text
Frontend → JavaScript
Backend → Rust
Database → PostgreSQL
```

A Rust server cannot understand a JavaScript object directly.

We need a standard format.

Flow:

```text
JavaScript Object
        ↓
Serialization
        ↓
JSON / Binary Format
        ↓
Network Transfer
        ↓
Rust Server
```

---

# 🧠 2. What is Deserialization?

### Definition

Deserialization is:

> Converting serialized data back into usable in-memory objects.

It is the reverse of serialization.

---

## Example

Incoming JSON:

```json
{
  "name": "Raman",
  "age": 22
}
```

Convert back to object:

```js
JSON.parse(data);
```

Result:

```js
{
  name: "Raman",
  age: 22
}
```

---

## Flow

```text
Serialized Data
        ↓
Deserialization
        ↓
Usable Object
```

---

# 🌍 3. Real-World Example (Client ↔ Server)

Suppose frontend sends:

```json
{
  "name": "Laptop",
  "price": 50000
}
```

### Request Lifecycle

```text
Frontend Object
        ↓
Serialization
        ↓
JSON HTTP Request
        ↓
Backend Receives JSON
        ↓
Deserialization
        ↓
req.body
```

Backend processes:

```js
req.body.name
```

Without deserialization:

❌ Backend cannot understand request body.

---

# 🔥 4. How Express Handles Deserialization

Middleware:

```js
app.use(express.json());
```

Secretly does:

```text
JSON Request Body
        ↓
JSON Parsing
        ↓
Deserialization
        ↓
req.body
```

Example:

Client sends:

```json
{
  "name": "Phone"
}
```

Backend:

```js
console.log(req.body);
```

Output:

```js
{
  name: "Phone"
}
```

---

# 🔥 5. How Express Handles Serialization

When we write:

```js
res.json(product);
```

Express internally:

```text
JavaScript Object
        ↓
JSON.stringify()
        ↓
Serialized JSON
        ↓
HTTP Response
```

Example:

```js
res.json({
  success: true
});
```

Actual response sent:

```json
{
  "success": true
}
```

---

# 🧩 6. Types of Serialization Formats

Serialization formats are mainly of **two types**:

---

## A. Text-Based Serialization

Human readable.

Easy to debug.

### Examples

### 1. JSON (Most Used)

```json
{
  "name": "Raman"
}
```

### Advantages

* Lightweight
* Human readable
* Language independent
* Fast parsing
* Web standard

### Disadvantages

* Larger payload than binary
* Limited data types

Used in:

* REST APIs
* Web communication

---

### 2. XML

Example:

```xml
<user>
   <name>Raman</name>
</user>
```

Used in:

* Legacy systems
* SOAP APIs

Advantages:

* Structured
* Supports schemas

Disadvantages:

* Verbose
* Heavy payload

---

### 3. YAML

Example:

```yaml
name: Raman
age: 22
```

Used in:

* Configurations
* Docker
* Kubernetes

Advantages:

* Very readable

Disadvantages:

* Sensitive indentation

---

## B. Binary Serialization

Machine-readable.

Optimized for performance.

Smaller payload size.

Faster transfer.

---

### 1. Protocol Buffers (Protobuf)

Created by Google.

Example concept:

```protobuf
message User {
  string name = 1;
  int32 age = 2;
}
```

Advantages:

* Very fast
* Compact size
* Efficient

Used in:

* Microservices
* High-performance systems
* gRPC

Disadvantages:

* Hard to debug manually
* Not human readable

---

# ⚔️ Text vs Binary Serialization

| Feature        | Text-Based | Binary  |
| -------------- | ---------- | ------- |
| Readable       | ✅          | ❌       |
| Debugging      | Easy       | Hard    |
| Payload Size   | Larger     | Smaller |
| Performance    | Slower     | Faster  |
| Human Friendly | Yes        | No      |

---

# 🧠 7. Serialization in Backend Systems

Used everywhere:

### APIs

```text
Object ↔ JSON
```

### Databases

Save objects as rows/documents.

### Redis Cache

Store serialized data.

### Message Queues

Kafka / RabbitMQ messages.

### Authentication

JWT payload serialization.

### File Storage

Saving objects to files.

---

# ⚠️ 8. Common Problems in Serialization

---

## Circular References

Bad:

```js
const user = {};

user.self = user;
```

Fails:

```js
JSON.stringify(user);
```

Reason:

Infinite recursion.

---

## Data Loss

JSON cannot serialize:

```js
undefined
function
Symbol
```

Example:

```js
{
  name: "Raman",
  age: undefined
}
```

Serialized:

```json
{
  "name": "Raman"
}
```

---

## Precision Issues

Large numbers may lose precision.

---

# 🧠 9. Interview Questions

### Q1:

Why do we need serialization?

**Answer:**
To convert objects into transferable/storage formats that different systems can understand.

---

### Q2:

Difference between serialization and deserialization?

Serialization:

```text
Object → Transfer Format
```

Deserialization:

```text
Transfer Format → Object
```

---

### Q3:

Why is JSON popular?

* Lightweight
* Human readable
* Language independent
* Native browser support

---

### Q4:

Why use Protobuf instead of JSON?

Because:

* Smaller payload
* Faster transfer
* Better performance

Especially in distributed systems.

---

# 🔥 Key Takeaways

* Objects cannot directly travel over networks
* Serialization converts data → transferable format
* Deserialization converts format → usable object
* JSON is most used in web APIs
* Protobuf is used for high-performance systems
* `express.json()` performs deserialization
* `res.json()` performs serialization

---

## 🎯 Conclusion

Serialization and deserialization form the foundation of communication between modern distributed systems.

Without them:

> APIs, databases, caching, and microservices would not function correctly.
