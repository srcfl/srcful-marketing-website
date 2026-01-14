const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const STOREFRONT_API_URL = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
  : null;

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  availableForSale: boolean;
}

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariant }>;
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    src: string;
    alt: string;
  };
  price: number;
  currencyCode: string;
  variantId: string;
  availableForSale: boolean;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!STOREFRONT_API_URL || !STOREFRONT_TOKEN) {
    throw new Error("Shopify credentials not configured");
  }

  const response = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify API error");
  }

  return json.data;
}

const PRODUCT_QUERY = `
  query getProduct($handle: String!, $country: CountryCode) @inContext(country: $country) {
    product(handle: $handle) {
      id
      title
      description
      handle
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProduct(handle: string, countryCode: string = "DE"): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>(PRODUCT_QUERY, {
      handle,
      country: countryCode,
    });

    if (!data.product) {
      return null;
    }

    const product = data.product;
    const variant = product.variants.edges[0]?.node;
    const image = product.images.edges[0]?.node;

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      image: image
        ? {
            src: image.url,
            alt: image.altText || product.title,
          }
        : undefined,
      price: parseFloat(variant?.price.amount || product.priceRange.minVariantPrice.amount),
      currencyCode: variant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode,
      variantId: variant?.id || "",
      availableForSale: variant?.availableForSale ?? false,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!, $country: CountryCode) @inContext(country: $country) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

interface CartLineItem {
  merchandiseId: string;
  quantity: number;
}

export async function createCheckout(
  lineItems: Array<{ variantId: string; quantity: number }>,
  countryCode: string = "DE"
): Promise<string | null> {
  try {
    const cartLines: CartLineItem[] = lineItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }));

    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>(CART_CREATE_MUTATION, {
      input: { lines: cartLines },
      country: countryCode,
    });

    if (data.cartCreate.userErrors?.length > 0) {
      const error = data.cartCreate.userErrors[0];
      throw new Error(error.message);
    }

    let checkoutUrl = data.cartCreate.cart?.checkoutUrl;

    if (checkoutUrl && countryCode === "SE") {
      const url = new URL(checkoutUrl);
      url.searchParams.set("locale", "sv");
      checkoutUrl = url.toString();
    }

    return checkoutUrl || null;
  } catch (error) {
    console.error("Failed to create cart:", error);
    throw error;
  }
}

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);
}
