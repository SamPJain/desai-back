const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://gauravkumawat:special123@gharkins.56aoupk.mongodb.net'; // Update with your MongoDB URI if different
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('productsDB');
    const collection = database.collection('products');

    const products = [
      {
        product_name: "Gherkins",
        title_image: "/Media/crop1.png",
        gallery_images: [
          "/Media/crop2.png",
          "/Media/crop3.png"
        ],
        product_range_description: "At Desai Group, we offer a wide variety of freshly harvested gherkins, meticulously graded and processed to meet stringent international quality standards. Our gherkins are available in multiple preservation mediums and packaging formats to suit the needs of global markets.",
        product_categories: [
          "Gherkins in Brine",
          "Gherkins in Acetic Acid (Vinegar)",
          "Gherkins in Natural Vinegar"
        ],
        size_grades: {
          description: "We offer a comprehensive range of size grades tailored to regional preferences and buyer requirements.",
          grades_by_market: {
            "United States": ["60/160", "30/60"],
            "Europe": ["10/30", "60/80", "80/150", "150/300", "300+"],
            "Russia": ["3–6 cm", "6–9 cm", "9–12 cm"],
            "Middle East & South America": ["150/300", "300+"]
          },
          custom_grades: "Custom grades are available upon request to meet specific buyer specifications."
        },
        packing_details: {
          descriptions: "To ensure product integrity and safety during transit and storage, we maintain world-class packaging standards:",
          bulk_packaging: "Supplied in 270–280 kg HDPE barrels, manufactured using certified food-grade material.",
          retail_packaging: "Customized food-grade packaging tailored to individual client requirements."
        },
        certifications: {
          standard_certifications: [
            "HACCP Certified",
            "FSSAI Compliant",
            "ISO 22000:2018 Certified",
            "APEDA Registered"
          ],
          additional_certifications: "Additional certifications such as BRC or USDA Organic are available upon request."
        }
      },
      {
        product_name: "Baby Corn",
        title_image: "/Media/gkins3.png",
        gallery_images: [
          "/Media/gkins1.png",
          "/Media/gkins2.png"
        ],
        product_range_description: "Fresh and tender baby corn, handpicked and processed to retain its natural sweetness and crunch. Available in brine and vacuum-packed formats.",
        product_categories: [
          "Baby Corn in Brine",
          "Vacuum Packed Baby Corn"
        ],
        size_grades: {
          description: "Available in various lengths and diameters to suit different culinary needs.",
          grades_by_market: {
            "Europe": ["6-8 cm", "8-10 cm"],
            "Asia": ["5-7 cm", "7-9 cm"]
          },
          custom_grades: "Custom sizes available on request."
        },
        packing_details: {
          descriptions: "Packed to preserve freshness and taste.",
          bulk_packaging: "Packed in 200 kg HDPE barrels.",
          retail_packaging: "Available in 500g and 1kg vacuum packs."
        },
        certifications: {
          standard_certifications: [
            "ISO 22000:2018 Certified",
            "FSSAI Compliant"
          ],
          additional_certifications: "BRC certification available."
        }
      },
      {
        product_name: "Jalapeno Peppers",
        title_image: "/Media/gkins4.png",
        gallery_images: [
          "/Media/gkins5.png",
          "/Media/gkins6.png"
        ],
        product_range_description: "Crisp and spicy jalapeno peppers, processed and packed to maintain their heat and flavor. Offered in slices, whole, and diced forms.",
        product_categories: [
          "Jalapeno Slices",
          "Whole Jalapenos",
          "Diced Jalapenos"
        ],
        size_grades: {
          description: "Available in various sizes and heat levels.",
          grades_by_market: {
            "USA": ["Mild", "Medium", "Hot"],
            "Europe": ["Mild", "Hot"]
          },
          custom_grades: "Heat level customization available."
        },
        packing_details: {
          descriptions: "Ensuring maximum freshness and shelf life.",
          bulk_packaging: "Packed in 250 kg food-grade barrels.",
          retail_packaging: "Glass jars and cans available."
        },
        certifications: {
          standard_certifications: [
            "FSSAI Compliant",
            "ISO 22000:2018 Certified"
          ],
          additional_certifications: "USDA Organic on request."
        }
      },
      {
        product_name: "Red Bell Peppers",
        title_image: "/Media/gkins7.png",
        gallery_images: [
          "/Media/gkins7.png",
          "/Media/gkins7.png"
        ],
        product_range_description: "Sweet and crunchy red bell peppers, perfect for salads, pizzas, and more. Available roasted, sliced, or diced.",
        product_categories: [
          "Roasted Red Bell Peppers",
          "Sliced Red Bell Peppers",
          "Diced Red Bell Peppers"
        ],
        size_grades: {
          description: "Various cut sizes available.",
          grades_by_market: {
            "Europe": ["Sliced", "Diced"],
            "Middle East": ["Whole", "Sliced"]
          },
          custom_grades: "Custom cuts available."
        },
        packing_details: {
          descriptions: "Packed to retain color and flavor.",
          bulk_packaging: "200 kg barrels.",
          retail_packaging: "Glass jars and pouches."
        },
        certifications: {
          standard_certifications: [
            "ISO 22000:2018 Certified",
            "FSSAI Compliant"
          ],
          additional_certifications: "Halal certification available."
        }
      },
      {
        product_name: "Sweet Corn",
        title_image: "/Media/gkins7.png",
        gallery_images: [
          "/Media/gkins7.png",
          "/Media/gkins7.png"
        ],
        product_range_description: "Naturally sweet and juicy corn kernels, processed and packed for maximum freshness. Available in canned and vacuum-packed forms.",
        product_categories: [
          "Canned Sweet Corn",
          "Vacuum Packed Sweet Corn"
        ],
        size_grades: {
          description: "Available in standard and premium grades.",
          grades_by_market: {
            "USA": ["Standard", "Premium"],
            "Asia": ["Standard"]
          },
          custom_grades: "Custom grades available."
        },
        packing_details: {
          descriptions: "Packed to preserve sweetness and texture.",
          bulk_packaging: "180 kg barrels.",
          retail_packaging: "Cans and vacuum packs."
        },
        certifications: {
          standard_certifications: [
            "FSSAI Compliant",
            "ISO 22000:2018 Certified"
          ],
          additional_certifications: "Kosher certification available."
        }
      }
    ];

    const result = await collection.insertMany(products);
    console.log(`Products inserted with _ids: ${Object.values(result.insertedIds).join(', ')}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);