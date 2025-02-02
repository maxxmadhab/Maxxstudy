async function renderPricingPage() {
    try {
        // Use relative path for JSON file
        const response = await fetch('./data/price.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create a document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Render Header
        const headerContainer = document.createElement('div');
        headerContainer.className = 'head';
        
        // Logo
        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo';
        const logoImg = document.createElement('img');
        logoImg.src = data.header.logo.src;
        logoImg.alt = data.header.logo.alt;
        logoImg.setAttribute('width', data.header.logo.width);
        logoImg.setAttribute('height', data.header.logo.height);
        const logoText = document.createElement('span');
        logoText.id = 'text1';
        logoText.textContent = data.header.logo.text;
        
        logoDiv.appendChild(logoImg);
        logoDiv.appendChild(logoText);
        headerContainer.appendChild(logoDiv);
        
        // Navigation
        const navDiv = document.createElement('div');
        navDiv.className = 'nav';
        data.header.navigation.forEach(navItem => {
            const navLink = document.createElement('p');
            const anchor = document.createElement('a');
            anchor.href = navItem.href;
            anchor.textContent = navItem.text;
            navLink.appendChild(anchor);
            navDiv.appendChild(navLink);
        });
        headerContainer.appendChild(navDiv);
        
        // Contact Button
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact';
        const contactButton = document.createElement('button');
        const contactAnchor = document.createElement('a');
        contactAnchor.href = `mailto:${data.header.contact.email}`;
        contactAnchor.textContent = 'Contact us';
        contactButton.appendChild(contactAnchor);
        contactDiv.appendChild(contactButton);
        headerContainer.appendChild(contactDiv);
        
        // Pricing Container (ADDED BACK IN)
        const pricingContainer = document.createElement('div');
        pricingContainer.className = 'pricing-container';
        
        // Pricing Header
        const pricingHeader = document.createElement('h1');
        pricingHeader.id = 'pricing-header';
        pricingHeader.textContent = data.pricing.header;
        pricingContainer.appendChild(pricingHeader);
        
        // Pricing Cards Container
        const pricingCardsDiv = document.createElement('div');
        pricingCardsDiv.className = 'pricing-cards';
        
        // Render Pricing Cards
        data.pricing.plans.forEach((plan, index) => {
            const planCard = document.createElement('div');
            planCard.className = `pricing-card ${index === 0 ? 'normal-card' : 'premium-card'}`;
            
            // Plan Title
            const planTitle = document.createElement('h2');
            planTitle.className = 'plan-title';
            planTitle.textContent = plan.title;
            
            // Plan Price
            const planPrice = document.createElement('p');
            planPrice.className = 'plan-price';
            planPrice.textContent = plan.price;
            
            // Plan Features
            const featuresList = document.createElement('ul');
            featuresList.className = 'plan-features';
            plan.features.forEach(feature => {
                const featureItem = document.createElement('li');
                featureItem.textContent = feature;
                featuresList.appendChild(featureItem);
            });
            
            // Plan Button
            const planButton = document.createElement('a');
            planButton.href = plan.buttonLink;
            planButton.className = 'plan-button';
            planButton.textContent = plan.buttonText;
            
            // Assemble Card
            planCard.appendChild(planTitle);
            planCard.appendChild(planPrice);
            planCard.appendChild(featuresList);
            planCard.appendChild(planButton);
            
            // Add to Cards Container
            pricingCardsDiv.appendChild(planCard);
        });
        
        pricingContainer.appendChild(pricingCardsDiv);
        
        // Use document fragment
        fragment.appendChild(headerContainer);
        fragment.appendChild(pricingContainer);
        
        // Clear existing content and append fragment
        document.body.innerHTML = ''; 
        document.body.appendChild(fragment);
        
    } catch (error) {
        console.error('Error loading pricing data:', error);
        
        // Enhanced error display
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #ff4444;
            color: white;
            text-align: center;
            padding: 15px;
            z-index: 1000;
        `;
        errorContainer.textContent = `Failed to load pricing data. Please try again later. (${error.message})`;
        
        document.body.innerHTML = '';
        document.body.appendChild(errorContainer);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', renderPricingPage);