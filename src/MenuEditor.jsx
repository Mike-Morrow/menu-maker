import React, { useState } from 'react';

const MenuEditor = () => {
  // Restaurant info state
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "Sakura Diner",
    tagline: "Japanese comfort food with an American twist",
    hours: "Open Daily 11am - 10pm",
    address: "123 Cherry Blossom St • Sakura City, USA • (555) 123-4567",
    footer: "BetterGutDigest.com"
  });

  // Daily special state
  const [dailySpecial, setDailySpecial] = useState({
    name: "Katsu Curry",
    description: "Crispy panko-breaded pork cutlet served with our house curry sauce, steamed rice, and pickled vegetables",
    price: "14.99"
  });

  // Menu sections state
  const [menuSections, setMenuSections] = useState([
    {
      id: 1,
      title: "Teishoku (Set Meals)",
      items: [
        {
          id: 101,
          name: "Salmon Teriyaki",
          description: "Grilled salmon glazed with sweet teriyaki sauce, served with rice, miso soup, and a small side salad",
          price: "15.99"
        },
                  {
          id: 102,
          name: "Chicken Karaage",
          description: "Japanese fried chicken marinated in ginger, garlic, and soy sauce, served with rice, miso soup, and pickles",
          price: "13.99"
        },
                  {
          id: 103,
          name: "Gyu-Don",
          description: "Thinly sliced beef and onions simmered in a sweet and savory sauce over a bowl of steamed rice",
          price: "14.99"
        },
                  {
          id: 104,
          name: "Vegetable Tempura",
          description: "Assorted seasonal vegetables in a light, crispy batter, served with rice, miso soup, and dipping sauce",
          price: "12.99"
        }
      ]
    },
    {
      id: 2,
      title: "Ramen & Noodles",
      items: [
                  {
          id: 201,
          name: "Tonkotsu Ramen",
          description: "Rich pork bone broth with chashu pork, soft-boiled egg, green onions, bean sprouts, and wood ear mushrooms",
          price: "14.99"
        },
                  {
          id: 202,
          name: "Miso Ramen",
          description: "Savory miso broth with ground pork, corn, butter, bean sprouts, and green onions",
          price: "13.99"
        }
      ]
    },
    {
      id: 3,
      title: "Small Plates",
      items: [
                  {
          id: 301,
          name: "Gyoza",
          description: "Pan-fried pork and vegetable dumplings, served with dipping sauce (6 pieces)",
          price: "6.99"
        },
                  {
          id: 302,
          name: "Takoyaki",
          description: "Octopus-filled savory pancake balls topped with takoyaki sauce, mayo, and bonito flakes (6 pieces)",
          price: "7.99"
        }
      ]
    }
  ]);

  // Function to update restaurant info
  const handleRestaurantInfoChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo({
      ...restaurantInfo,
      [name]: value
    });
  };

  // Function to update daily special
  const handleSpecialChange = (e) => {
    const { name, value } = e.target;
    setDailySpecial({
      ...dailySpecial,
      [name]: value
    });
  };

  // Function to update menu section title
  const handleSectionTitleChange = (sectionId, newTitle) => {
    setMenuSections(menuSections.map(section => 
      section.id === sectionId ? { ...section, title: newTitle } : section
    ));
  };

  // Function to update menu item
  const handleMenuItemChange = (sectionId, itemId, field, value) => {
    setMenuSections(menuSections.map(section => {
      if (section.id === sectionId) {
        const updatedItems = section.items.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...section, items: updatedItems };
      }
      return section;
    }));
  };

  // Function to add a new menu item to a section
  const addMenuItem = (sectionId) => {
    const newItem = {
      id: Date.now(), // Simple unique id
      name: "New Item",
      description: "Item description",
      price: "0.00"
    };

    setMenuSections(menuSections.map(section => {
      if (section.id === sectionId) {
        return { ...section, items: [...section.items, newItem] };
      }
      return section;
    }));
  };

  // Function to delete a menu item
  const deleteMenuItem = (sectionId, itemId) => {
    setMenuSections(menuSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      }
      return section;
    }));
  };

  // Function to add a new section
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: "New Section",
      items: []
    };
    setMenuSections([...menuSections, newSection]);
  };

  // Function to delete a section
  const deleteSection = (sectionId) => {
    setMenuSections(menuSections.filter(section => section.id !== sectionId));
  };

  // Function to generate HTML
  const generateMenuHTML = () => {
    // This is a simplified version - you would need more complex logic
    // to generate the full HTML with all the styling from the original menu
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${restaurantInfo.name}</title>
    <!-- CSS styles would go here -->
</head>
<body>
    <header>
        <h1>${restaurantInfo.name}</h1>

        <div class="tagline">${restaurantInfo.tagline}</div>
        <div class="hours">${restaurantInfo.hours}</div>
    </header>
    
    <div class="special">
        <div class="special-title">TODAY'S SPECIAL</div>
        <div class="menu-item">
            <div>
                <div class="item-name">${dailySpecial.name}</div>
                <div class="item-description">${dailySpecial.description}</div>
            </div>
            <div class="price">$${dailySpecial.price}</div>
        </div>
    </div>
    
    ${menuSections.map(section => `
    <section>
        <h2>${section.title}</h2>
        ${section.items.map(item => `
        <div class="menu-item">
            <div>
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
            </div>
            <div class="price">${item.price}</div>
        </div>
        `).join('')}
    </section>
    `).join('')}
    
    <footer>
        <p>*Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness</p>
        <p>18% gratuity added for parties of 6 or more</p>
        <p>${restaurantInfo.address}</p>
        <p>${restaurantInfo.footer}</p>
    </footer>
</body>
</html>`;

    return html;
  };

  // Function to copy HTML to clipboard
  const copyHtmlToClipboard = () => {
    const html = generateMenuHTML();
    navigator.clipboard.writeText(html)
      .then(() => {
        alert('Menu HTML copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy HTML: ', err);
        alert('Failed to copy HTML to clipboard');
      });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">Japanese Diner Menu Editor</h1>
      
      {/* Restaurant Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Restaurant Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={restaurantInfo.name}
              onChange={handleRestaurantInfoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={restaurantInfo.tagline}
              onChange={handleRestaurantInfoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hours</label>
            <input
              type="text"
              name="hours"
              value={restaurantInfo.hours}
              onChange={handleRestaurantInfoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address & Phone</label>
            <input
              type="text"
              name="address"
              value={restaurantInfo.address}
              onChange={handleRestaurantInfoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Footer Text</label>
            <input
              type="text"
              name="footer"
              value={restaurantInfo.footer}
              onChange={handleRestaurantInfoChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Daily Special */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-pink-600">Today's Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              name="name"
              value={dailySpecial.name}
              onChange={handleSpecialChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={dailySpecial.description}
              onChange={handleSpecialChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows="2"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="text"
              name="price"
              value={dailySpecial.price}
              onChange={handleSpecialChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-grow mr-4">
              <label className="block text-sm font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              onClick={() => deleteSection(section.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete Section
            </button>
          </div>
          
          {/* Menu Items */}
          {section.items.map((item) => (
            <div key={item.id} className="border p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleMenuItemChange(section.id, item.id, 'name', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleMenuItemChange(section.id, item.id, 'description', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    rows="2"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => handleMenuItemChange(section.id, item.id, 'price', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => deleteMenuItem(section.id, item.id)}
                    className="bg-red-100 text-red-800 px-3 py-2 rounded hover:bg-red-200"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => addMenuItem(section.id)}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 w-full"
          >
            + Add Menu Item
          </button>
        </div>
      ))}
      
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={addSection}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add New Section
        </button>
        
        <button
          onClick={copyHtmlToClipboard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate & Copy HTML
        </button>
      </div>
      
      {/* Preview section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Menu Preview</h2>
        <div className="border p-4 rounded bg-gray-50">
          <h1 className="text-2xl font-bold text-center">{restaurantInfo.name}</h1>

          <p className="text-center italic mb-2">{restaurantInfo.tagline}</p>
          <p className="text-center text-sm mb-4">{restaurantInfo.hours}</p>
          
          <div className="bg-pink-50 p-3 border-l-4 border-pink-500 mb-4">
            <p className="font-bold text-center text-pink-600">TODAY'S SPECIAL</p>
            <div className="flex justify-between mt-2">
              <div>
                <p className="font-semibold">{dailySpecial.name}</p>
                <p className="text-sm italic">{dailySpecial.description}</p>
              </div>
              <p className="font-bold">${dailySpecial.price}</p>
            </div>
          </div>
          
          {menuSections.map(section => (
            <div key={section.id} className="mb-4">
              <h2 className="font-bold text-lg border-b border-pink-300 pb-1 mb-2">{section.title}</h2>
              
              {section.items.map(item => (
                <div key={item.id} className="flex justify-between mb-2 pb-2 border-b border-dotted">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm italic">{item.description}</p>
                  </div>
                  <p className="font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          ))}
          
          <div className="text-center text-sm mt-6 pt-4 border-t">
            <p>{restaurantInfo.address}</p>
            <p className="font-bold mt-2">{restaurantInfo.footer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
