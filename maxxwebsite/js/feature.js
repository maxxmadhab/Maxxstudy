async function fetchAndDisplayCards() {
  try {
    const response = await fetch('data/feature.json');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const cardsContainer = document.getElementById('cardsContainer');
    
    data.cards.forEach(card => {
      // Create card element
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      cardDiv.id = card.id;
      
      // Create and append image
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('imgcard');
      const img = document.createElement('img');
      img.src = card.img.src;
      img.alt = card.img.alt;
      img.height = parseInt(card.img.height);
      img.width = parseInt(card.img.width);
      imgDiv.appendChild(img);
      cardDiv.appendChild(imgDiv);
      
      // Create and append feature name
      const featureDiv = document.createElement('div');
      featureDiv.classList.add('feature');
      featureDiv.id = card.feature.id;
      featureDiv.textContent = card.feature.name;
      cardDiv.appendChild(featureDiv);
      
      // Create and append feature description
      const descDiv = document.createElement('div');
      descDiv.classList.add('feature-description');
      descDiv.textContent = card.featureDescription;
      cardDiv.appendChild(descDiv);
      
      // Append the card to the container
      cardsContainer.appendChild(cardDiv);
    });
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayCards);


async function renderPricingPage() {
    try {
        // Fetch the JSON data
        const response = await fetch('pricing.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Render Header
        const headerContainer = document.createElement('div');
        headerContainer.className = 'head';
        
        // Logo
        const logoDiv = document.createElement('div');
        logoDiv.className = 'logo';
        const logoImg = document.createElement('img');
        logoImg.src = data.header.logo.src;
        logoImg.alt = data.header.logo.alt;
        logoImg.width = data.header.logo.width;
        logoImg.height = data.header.logo.height;
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
        
        // Pricing Container
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
        
        // Append to Document Body
        document.body.innerHTML = ''; // Clear existing content
        document.body.appendChild(headerContainer);
        document.body.appendChild(pricingContainer);
    } catch (error) {
        console.error('Error loading pricing data:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', renderPricingPage);







var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });



  // review page

  document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const profilePicture = document.getElementById('profilePicture').files[0];
    const experience = document.getElementById('experience').value.trim();

    if (!name || !profilePicture || !experience) {
        alert("All fields are required!");
        return;
    }

    alert("Review submitted successfully!");
});


//about page

const forma=document.querySelector('.email');

forma.addEventListener('submit',function(event){
  event.preventDefault();

  const email=document.getElementById('inputemail').value.trim();

  if(!email)
  {
    alert("all feilds are required");
    return;
  }
  alert("review submitted successfully");
});


//achivement counter

function submitReview(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Here you would typically send the data to a server
  console.log('Form submitted with data:', {
      name: formData.get('name'),
      experience: formData.get('experience'),
      profilePic: formData.get('profilePic').name
  });
  
  // Update review counter
  const reviewCounter = document.getElementById('reviewCounter');
  const currentValue = parseInt(reviewCounter.textContent);
  reviewCounter.textContent = currentValue + 1;
  
  // Reset form
  form.reset();
  
  return false;
}



// pricejsonfunction



