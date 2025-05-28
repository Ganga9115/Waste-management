import React from 'react';

const CompostingPage = () => {
  return (
    <div className="bg-green-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-6">Composting Food Waste</h1>
        <p className="text-xl text-green-700 max-w-3xl mx-auto">
          Transforming food waste into nutrient-rich soil for a greener planet
        </p>
        <div className="mt-10">
          <div className="w-24 h-2 bg-green-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">The Environmental Impact of Food Waste</h2>
          <div className="space-y-6 text-lg">
            <p>
              Unlike other types of waste, food waste contains a lot of water. Therefore, more energy is required when it is incinerated. It contributes to approximately 8-10% of global greenhouse gas emissions.
            </p>
            <p>
              This not only accelerates climate change but also results in putrid odors, vermin infestations, compromised water quality, fires, and air pollution from waste transportation.
            </p>
            <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-600">
              <p className="font-semibold text-green-800">
                The most effective solution is simple: don't waste food. Buy only what you need, prepare the right portion sizes, and store leftovers properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Composting as a Sustainable Approach</h2>
          <div className="space-y-6 text-lg">
            <p>
              While some food waste is inevitable, such as vegetable peels and scraps, we can still minimize its negative consequences through composting.
            </p>
            <p>
              Composting is a biodegradation method where organic matter decomposes into nutrient-rich soil that can be used for gardens and farms.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 mb-3">Why Compost?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Reduces greenhouse gas emissions from landfills
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Creates natural fertilizer for plants
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Improves soil structure and water retention
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 mb-3">Types of Composting</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">Household/Community:</span>
                    Small-scale composting in backyards or community spaces
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">Centralized:</span>
                    Large facilities that process organic waste from entire communities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto pb-32">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Backyard Composting Guide</h2>
          
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-green-100 text-green-800 font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">Collect Materials</h3>
                <p>
                  Collect fruit/vegetable scraps in a kitchen container. Store brown materials (leaves, twigs) outside. 
                  You'll need a 2:1 ratio of browns to greens.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-green-100 text-green-800 font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">Choose Location</h3>
                <p>
                  Select a well-drained area in your yard with easy access. Build or buy a compost bin from materials like 
                  wood, wire, or plastic barrels.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-green-100 text-green-800 font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">Build Your Pile</h3>
                <p>
                  Start with a base of twigs/chips for aeration. Alternate layers of greens and browns like lasagna. 
                  Keep moist like a wrung-out sponge.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-green-100 text-green-800 font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">Maintain</h3>
                <p>
                  Turn the pile weekly to aerate. Monitor temperature (should be warm) and moisture. 
                  Troubleshoot odors (add browns) or dryness (add water).
                </p>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-green-100 text-green-800 font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">Harvest</h3>
                <p>
                  After 3-5 months, your compost should be dark, crumbly, and earthy-smelling. 
                  Sift out large pieces and use in your garden!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
          Start Composting Today
        </button>
      </div>
    </div>
  );
};

export default CompostingPage;