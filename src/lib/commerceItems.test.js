import { describe, expect, it } from "vitest";

import {
  createCourseCommerceItem,
  createProductCommerceItem,
  normalizeCommerceCartItem,
} from "./commerceItems";

describe("commerce item contracts", () => {
  it("creates cart items from backend catalog products", () => {
    expect(
      createProductCommerceItem({
        _id: "product-1",
        name: "Robot Kit",
        description: "Starter robotics kit",
        price: 2500,
        category: "Robotics",
        images: ["uploads/products/kit.png"],
        quantity: 2,
      }),
    ).toEqual({
      itemType: "product",
      itemId: "product-1",
      name: "Robot Kit",
      description: "Starter robotics kit",
      price: 2500,
      category: "Robotics",
      images: ["uploads/products/kit.png"],
      fulfillmentType: "shipping",
      quantity: 2,
    });
  });

  it("creates cart items from backend catalog courses", () => {
    expect(
      createCourseCommerceItem({
        _id: "course-1",
        title: "Python Foundations",
        description: "Learn Python with robotics projects",
        price: 1500,
        category: "Programming Languages",
        thumbnail: "uploads/Courses/python.png",
      }),
    ).toEqual({
      itemType: "course",
      itemId: "course-1",
      name: "Python Foundations",
      description: "Learn Python with robotics projects",
      price: 1500,
      category: "Programming Languages",
      images: ["uploads/Courses/python.png"],
      fulfillmentType: "digital",
      quantity: 1,
    });
  });

  it("normalizes stored cart items through the cart contract", () => {
    expect(
      normalizeCommerceCartItem({
        itemType: "product",
        itemId: "product-1",
        name: "Robot Kit",
        price: "2500",
        images: [" uploads/products/kit.png "],
        fulfillmentType: "shipping",
        quantity: "3",
      }),
    ).toMatchObject({
      itemType: "product",
      itemId: "product-1",
      name: "Robot Kit",
      price: 2500,
      images: ["uploads/products/kit.png"],
      fulfillmentType: "shipping",
      quantity: 3,
    });
  });
});
