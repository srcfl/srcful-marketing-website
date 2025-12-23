# DNS Setup Guide for mkt-dev.sourceful.energy

## Step 1: Add Subdomain in GoDaddy

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Navigate to DNS Management**
   - Go to "My Products" or "Domains"
   - Find `sourceful.energy` domain
   - Click "DNS" or "Manage DNS"

3. **Add CNAME Record**
   - Click "Add" or "+" to add a new record
   - Select record type: **CNAME**
   - Enter the following:
     - **Name/Host**: `mkt-dev`
     - **Value/Points to**: `cname.vercel-dns.com` (or the value Vercel provides)
     - **TTL**: 600 seconds (or default)

4. **Save the Record**
   - Click "Save" or "Add Record"
   - DNS changes can take a few minutes to hours to propagate

## Step 2: Configure in Vercel

1. **Go to Vercel Project Settings**
   - Open your project: `srcful-marketing-website`
   - Click "Settings" → "Domains"

2. **Add Domain**
   - Click "Add Domain"
   - Enter: `mkt-dev.sourceful.energy`
   - Click "Add"

3. **Assign to Branch**
   - Vercel will show DNS configuration instructions
   - Look for option to assign domain to a specific branch
   - Assign to `dev` branch

4. **Verify DNS**
   - Vercel will check if DNS is configured correctly
   - Wait for DNS propagation (can take 5 minutes to 24 hours)
   - Once verified, you'll see a green checkmark

## Important Notes

- **DNS Propagation**: Can take 5 minutes to 24 hours (usually 15-30 minutes)
- **SSL Certificate**: Vercel automatically provisions SSL certificates once DNS is verified
- **Testing**: After DNS propagates, `mkt-dev.sourceful.energy` will point to your dev branch deployments

## Production Domain Setup (When Ready)

When ready to go live with production:

1. **In GoDaddy**: Update DNS for `sourceful.energy`
   - Change the A record or CNAME to point to Vercel (Vercel will provide the exact value)
   - Add TXT record for verification (Vercel will provide)

2. **In Vercel**: 
   - Domain `sourceful.energy` is already configured for Production environment
   - Assign to `main` branch
   - Wait for DNS verification

3. **Note**: Production DNS currently points to Framer website - update when ready to switch

