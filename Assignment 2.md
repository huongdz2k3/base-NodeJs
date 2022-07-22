# Assignment 2

In this assignment, you will create a RESTful API to support the management of a pet store. Buyers can create accounts in the system, have the ability to browse catalogs of the cutest pet and claim ownership of it.

## Overview

At the end of this assignment, your should have completed the following:

- Allowed users to create an account
- Allowed users to login using that account
- Allowed users to retrieve the list of pets in store
- Allowed users to make purchase of the pets they want

## Requirements

Your API must expose endpoints that allow users to do the following:

### Register

- An user should have at least the following attributes:

  - User ID
  - Username
  - First name
  - Last name
  - Email (must be in correct format)
  - Password (must have at least 8 characters, 1 capitalized letter & 1 special character)
  - Phone (must be in correct format)
  - User status (either `active` or `inactive`)

### Login

- In order to access other API in the system, user must login first. The login process makes use of `JSON Web Token` (JWT for short). Read more about the implementation of JWT and how it works here: https://jwt.io/introduction/
- The JWT here consists of different parts:

  - Header: Use whatever hashing algorithm you want.
  - Payload: Contains `username`, `password` and a `secret` string generated while creating user & stored against that user ID. `secret` should be unique.
  - Signature: You have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

- The server's routes will check for a valid JWT in the `Authorization` header, and if it's present & valid, the user will be allowed to access resources.

### Management

#### User

1. Get user by user name

2. Update user

- API cannot update `user` that are `deleted`

3. Delete user

#### Pet

1. Add new pet

- A pet should have at least the following attributes:

  - Pet ID
  - Category
  - Name
  - Tags
  - Status
  - Photo URLs

- Result should have the same information as request, but with `Pet ID` included.

2. Update an existing pet

3. List all pets

- This endpoint is public to everyone. People without account in the system can use this, along with logged in users.

4. Find pet

- Find by ID
- Find by tags
- Find by status

5. Delete a pet

6. Upload an image of a pet

#### Store

1. Query pet inventories by status

- Result should contain:

  - Pet ID and its status
  - Additional information about the number of pets having a certain status. ie: 200 pets that are `available`

2. Place an order

- An order consists of the following attributes:

  - A list of pets
  - Expected shipping date
  - Order status. There are 3 statuses available:

    + `placed`: order is created
    + `approved`: order is approved by the store & received payments
    + `delivered`: order is successfully shipped to the buyer

- API should return the order information, along with the money needed to pay for the shipment. Total money is calculated by the following formula:

> Sum of the price of all the pets * (100% + Sales Tax)

```text
If the total amount of receipts including a 7% sales tax is $32,100, the true sales amount will be $30,000 ($32,100 divided by 1.07). The sales tax on the true sales will be 0.07 X $30,000 = $2,100. Our proof is $30,000 of sales + $2,100 of sales tax = $32,100.
```

`Sales Tax` is calculated by the following rule:

```text
If order have 1 item: 10%
If order have more than 1 item but less than 5: 8%
If order have more than 5 items but less than 10: 5%
If order have more than 10 items: 10% tax but discount 5%
```

3. Approve an order:

- Turn an order from `placed` to `approved` or `delivered`
- API cannot approve a `approved` or `delivered` order

3. Find purchase order by ID

4. Delete purchase order by ID

- API cannot delete order that are `approved` or `delivered`

## Acceptance criteria

- A database schema and object model is correctly implemented.
- JSON schemas for both request & response are created. The schema here should be able to accomodate the required information defined by the models and be as strict as possible. Schemas should also be reusable, no duplication is permitted.
- Request & response payload must conform to [JSON API specification](http://jsonapi.org/) where possible.
- API should return compressed response using whatever format you want (`gzip`, `deflate`) if required by API caller.
- There must be an API documentation that conforms to [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification). [Here are the tools](https://github.com/OAI/OpenAPI-Specification/blob/master/IMPLEMENTATIONS.md) that can assist you in creating one.
- All API operations are well supported as per the specifications above.
- Unit tests/integration tests/lint must pass.
- Must use `eslint-config-airbnb-base`, must not disable/modify any rules.