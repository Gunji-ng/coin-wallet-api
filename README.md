# coin-wallet-api

API to manage coins.

Check out the [Swagger Docs](https://coin-wallet-api.onrender.com/docs/)

## Inspiration

Inspired by the extra-curricular points systems at my office.  
At the time of development, we have 2 types of points that can be earned.  
I've reimagined them as coins/tokens.

1. `dppCoins` which can only be earned. Users can't transfer these coins.
2. `kdjCoins` which can be earned and transferred amongst users.  
   All coins are redeemable.

## Roles

- `User`: Regular user. Test account: `user@example.com`
- `Admin`: Can assign roles to other users. Test account: `admin@example.com`
- `DPP_Admin`: Can allocate dppCoins. Test account: `dppadmin@example.com`
- `KDJ_Admin`: Can allocate kdjCoins. Test account: `kdjadmin@example.com`  
  Note: A user can be assigned multiple roles.  
  Password is `secret12#` for the test accounts above.

## Transaction types

- **allocation**: Coin admins(i.e. DDP_Admin & KDJ_Admin) can allocate their respective coins to users.
- **transfer**: Users can transfer coins from their balance to other users. Can't transfer dppCoins as it can only be earned.
- **redeem**: Users can redeem coins (presumably in exchange for some prize).
