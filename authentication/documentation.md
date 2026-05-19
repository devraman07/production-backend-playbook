# 🔐 Authentication & Authorization

## What is Authentication?

Authentication answers:

> **Who are you?**

Used to verify user identity.

Examples:

* Login with email/password
* Login with Google
* OTP login

---

## What is Authorization?

Authorization answers:

> **What are you allowed to do?**

Examples:

* Admin can delete users
* Normal user cannot access admin dashboard

---

## Authentication Evolution

### 1. Basic Authentication

* Username + password
* Sent in headers
* Not secure without HTTPS

### 2. Session-Based Authentication

* Stateful authentication
* Server stores session

### 3. JWT Authentication

* Stateless authentication
* Token-based

### 4. OAuth

* Third-party authentication
* Google login, GitHub login

### 5. OpenID Connect (OIDC)

* Identity layer on top of OAuth 2.0
* Returns ID token (JWT)

---

# Cryptography Basics

## Symmetric Encryption

Same key used for:

```text
Encrypt + Decrypt
```

Example:

* AES

---

## Asymmetric Encryption

Uses:

```text
Public Key
Private Key
```

Example:

* RSA
* Elliptic Curve Cryptography (ECC)

Used in:

* JWT signatures
* HTTPS

---

## Hashing

One-way transformation.

Used for:

* Password storage

Example:

* bcrypt
* argon2

---

# Implicit vs Explicit Authentication

## Explicit Auth

User explicitly logs in.

Example:

```text
Email + Password
```

---

## Implicit Auth

Automatically authenticated.

Example:

```text
Google session
Remember me
```

---

# Session-Based Authentication (Stateful)

Server stores user session.

Flow:

```text
Login
↓
Server creates session
↓
Session ID generated
↓
Stored in cookie
↓
Browser sends cookie
↓
Server validates session
```

### Features

* Stateful
* Secure revocation
* Easy logout

### Problems

* Scaling difficulty
* Session storage required
* Sticky sessions needed

---

## Session ID

Unique identifier for session.

Example:

```text
abc123xyz
```

---

## Cookies

Store session ID in browser.

Important flags:

```text
HttpOnly
Secure
SameSite
```

---

## Session Expiration

Used to invalidate old sessions.

Example:

```text
30 mins inactivity
```

---

# JWT Authentication (Stateless)

JWT = JSON Web Token

Server does NOT store session.

---

## JWT Structure

Three parts:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

---

## Header

Contains:

```text
Algorithm
Token Type
```

---

## Payload

Contains:

```text
User ID
Role
Claims
Expiration
```

---

## Signature

Used for verification.

Prevents tampering.

---

## JWT Workflow

```text
Login
↓
Server verifies credentials
↓
JWT generated
↓
Client stores token
↓
Client sends token
↓
Server verifies JWT
```

---

## Why JWT is Stateless

No server memory.

Benefits:

```text
Scalable
Portable
Microservice friendly
```

---

## JWT Problems

* Hard logout
* Token revocation issue
* Large payload
* Security risk if leaked

---

# Hybrid Authentication

Combination of:

```text
Session + JWT
```

Use:

### Session

For:

```text
Web apps
```

### JWT

For:

```text
APIs
Mobile apps
```

---

# Stateful vs Stateless Auth

## Stateful

Server remembers user.

Example:

```text
Sessions
```

Best for:

```text
Traditional web apps
```

---

## Stateless

Every request independent.

Example:

```text
JWT
```

Best for:

```text
APIs
Distributed systems
```

---

# API Key Authentication

Simple token-based auth.

Example:

```http
x-api-key: abc123
```

Best for:

```text
Server-to-server
Internal APIs
```

Problems:

```text
Weak security
No user identity
```

---

# OAuth 1.0

Problem:

```text
Complex signatures
Hard to implement
```

---

# OAuth 2.0

Modern authorization framework.

Used for:

```text
Google Login
GitHub Login
Facebook Login
```

Uses:

```text
Bearer Tokens
```

---

## OAuth Flows

### Authorization Code Flow

Best for:

```text
Server-side apps
```

---

### Implicit Flow

Best for:

```text
Browser apps
```

---

### Client Credentials Flow

Best for:

```text
Machine-to-machine communication
```

---

### Device Code Flow

Best for:

```text
Smart TVs
IoT devices
```

---

# Bearer Token

Token sent in:

```http
Authorization: Bearer token
```

Whoever has token:

```text
Gets access
```

---

# OpenID Connect (OIDC)

Identity layer over OAuth 2.0

Returns:

```text
ID Token (JWT)
```

Contains:

```text
User identity
Issuer
Authentication info
```

---

# Authorization Methods

## RBAC (Role-Based Access Control)

Based on role.

Example:

```text
Admin
User
Moderator
```

Most used in industry.

---

## ACL (Access Control List)

Permission-based.

Example:

```text
Read
Write
Delete
```

---

# Security Vulnerabilities

## Authentication Enumeration

Bad:

```text
Email not found
Password incorrect
```

Good:

```text
Authentication failed
```

---

## Timing Attacks

Attacker checks response timing.

Solution:

```text
Constant-time operations
Simulated delay
```

Example:

```js
setTimeout()
```

---

## Brute Force Protection

Prevent repeated login attempts.

Methods:

```text
Account lock
Rate limiting
Cooldown period
```

---

# When to Use What?

### Session

Best for:

```text
Traditional web apps
```

---

### JWT

Best for:

```text
APIs
Microservices
Mobile apps
```

---

### OAuth

Best for:

```text
Third-party login
```

---

### API Keys

Best for:

```text
Server-to-server communication
```

---

# Interview Questions

### Authentication vs Authorization?

Authentication:

```text
Who are you?
```

Authorization:

```text
What can you do?
```

---

### JWT vs Session?

JWT:

```text
Stateless
Scalable
```

Session:

```text
Stateful
Better revocation
```

---

### Why JWT scalable?

Because:

```text
Server stores no session
```

---

### Why OAuth needed?

To allow:

```text
Third-party access without password sharing
```

---

### Most used authorization method?

```text
RBAC
```

---

