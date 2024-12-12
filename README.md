# JoseQuintana20.github.io

# Website Design Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Page Structure](#page-structure)
5. [Design Principles](#design-principles)
6. [Hover Effects and Transitions](#hover-effects-and-transitions)
7. [Dark and Light Modes](#dark-and-light-modes)
8. [Interactivity and JavaScript Features](#interactivity-and-javascript-features)
9. [Future Improvements](#future-improvements)

---

## Introduction

This document provides a detailed overview of the artistic design, visual styling, user experience, and interactivity implemented in the webpage. The design aims to create a modern, elegant, and accessible interface that enhances the user's browsing experience while maintaining a clean and professional aesthetic.

---

## Color Palette

The chosen color palette creates a balance between professionalism, elegance, and accessibility:

| Color       | Hex Code    | Usage                           |
|-------------|-------------|---------------------------------|
| **Black Gray**   | #1f1f1f | Background for a minimalist look. |
| **Smoky White**  | #eaeaea | Primary text color for contrast.  |
| **Bright Blue**  | #4dabf7 | Accent color for hover effects, buttons, and links. |
| **Dark Gray**    | #2a2a2a | Section backgrounds for contrast. |
| **Pure White**   | #ffffff | Highlighted text and elements.    |

### Rationale
- **Accessibility:** High contrast ensures readability for all users.
- **Modern Minimalism:** A limited color palette keeps the design clean and uncluttered.
- **Focus:** The bright blue accent draws attention to interactive elements.

---

## Typography

- **Font Family:** Lato, sans-serif.
- **Hierarchy:**
  - **H1 Titles:** Large, bold, and centered to grab attention.
  - **H2 Subtitles:** Smaller but distinct for clear section division.
  - **Paragraph Text:** Ample line height to ensure readability.

### Typography Styling
css
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  text-align: center;
  color: #eaeaea;
  transition: color 0.3s ease;
}

h1:hover {
  color: #4dabf7;
}    

## Page Structure

### Layout
The page layout is designed to provide a logical flow and visual hierarchy, ensuring that users can easily navigate and access information:

1. **Header:**
   - A fixed navigation bar at the top of the page.
   - Contains the site logo, menu links for navigation, and a theme toggle button to switch between dark and light modes.
   - The header includes hover effects on menu items for interactivity.

2. **Hero Section:**
   - Fullscreen introduction with a centered profile image, name, subtitle, and social media icons.
   - Acts as the focal point of the homepage to immediately engage the user.

3. **Content Sections:**
   - Each section (e.g., About, Projects, Skills, etc.) is wrapped in a `.content-container` for consistent styling.
   - Titles (`H2`) are used for each section to provide clear separation.
   - Includes padding and margins to avoid clutter.

4. **Footer:**
   - Positioned at the bottom of the page.
   - Contains social media links and legal information.
   - Minimalistic design to provide closure without drawing too much attention.

---

## Design Principles

### White Space
White space, or negative space, is used strategically to:
- Improve readability and focus on content.
- Reduce visual fatigue and make the layout visually appealing.
- Separate sections and components for a clean design.

### Responsive Design
- **Flexbox and Grid Layouts:** Used for dynamic alignment of elements across different screen sizes.
- **Media Queries:** Applied to adjust font sizes, padding, and layout for tablets and mobile devices.
- The design is optimized to work seamlessly across desktop, tablet, and mobile resolutions.

### Consistent Aesthetic
- Uniform spacing, font styles, and hover effects across all sections maintain consistency.
- Accent colors and transitions provide a cohesive visual experience.

---

## Hover Effects and Transitions

### Purpose
Hover effects add interactivity and guide user actions. Subtle animations and color changes create a more engaging experience.

### Examples
1. **Links and Buttons:**
   - Color and shadow changes when hovered.
   ```css
   button:hover {
     box-shadow: 0 0 10px rgba(77, 171, 247, 0.7);
     transform: translateY(-2px);
   }
2. **Icons:**
   - Icons use scaling and brightness adjustments to provide a visual cue for interaction.
   ```css
   .social-icons a i:hover {
     transform: scale(1.1);
     filter: brightness(1.2);
     transition: transform 0.3s ease, filter 0.3s ease;
   }
3. **Section Containers:**

- Hovering over containers creates an elevation effect with shadows and background changes.
  ```css
  .content-container:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background-color: #3a3a3a;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  }
4. **Navigation Links:**
   - Links show a color transition and underline animation on hover.
   ```css
   .menu-items a:hover {
     color: #4dabf7;
   }

   .menu-items a:hover::after {
     width: 100%;
     transition: width 0.3s ease;
   }
5. **Profile Image:**
   - The profile image in the hero section scales slightly and adds a glowing effect.

   ```css
   .profile-img:hover {
     transform: scale(1.05);
     box-shadow: 0 0 20px 4px #4dabf7;
     transition: transform 0.3s ease, box-shadow 0.3s ease;
   }
6. **Footer Social Icons:**
   - Icons in the footer scale and change color on hover for consistent interactivity.
   ```css
   .footer-social-icons .social-icons li a:hover {
     color: #4dabf7;
     transform: scale(1.2);
     transition: transform 0.3s ease, color 0.3s ease;
   }

## Dark and Light Modes

### Purpose

Dark and light modes allow users to customize their viewing experience based on preference or lighting conditions, improving usability and accessibility.

### Implementation

1. **Dark Mode:**
   - Default theme with dark backgrounds and light text for a modern and professional look.
   ```css
   body {
     background-color: #1f1f1f;
     color: #eaeaea;
   }
2. **Light Mode:**

   Bright theme with white backgrounds and dark text for better visibility in well-lit environments.
   ```css
   body.light-mode {
     background-color: #f9f9f9;
     color: #333;
   }
### 3. Theme Toggle
A toggle button switches between modes, using JavaScript to add or remove the light-mode class on the body.

```javascript
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});
```

### 4. Transitions
Smooth transitions ensure the mode change feels seamless.

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## Interactivity and JavaScript Features

### Purpose
Interactivity enhances user engagement and improves navigation by providing dynamic responses to user actions.

### Examples

#### 1. **Sticky Navigation:**
The navigation bar remains fixed at the top of the page, and the active menu link highlights based on the visible section.

```javascript
document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".menu-items a");
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });
  
  menuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
```

#### 2. **Scroll-to-Top Button:**
A button appears when the user scrolls down, allowing quick navigation back to the top.

```javascript
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
```

#### 3. **Animated Section Entries:**
Sections fade in as they enter the viewport for a dynamic appearance.

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}
```

```javascript
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

sections.forEach(section => observer.observe(section));
```

### Future Improvements

1. **Enhanced Animations:**
   * Implement parallax scrolling for backgrounds to add depth and a sense of motion.
   * Introduce 3D transformations for hover effects on cards and buttons.

2. **Accessibility Features:**
   * Add ARIA roles and descriptions for improved screen reader support.
   * Implement keyboard navigation and focus indicators for all interactive elements.

3. **Dynamic Content Loading:**
   * Use JavaScript or AJAX to load content dynamically, reducing page load times and improving performance.

4. **Interactive Charts:**
   * Integrate data visualization tools like Chart.js to display information interactively.

5. **Personalization:**
   * Save user preferences (e.g., theme mode, font size) using cookies or localStorage.

This document provides a comprehensive overview of the design principles, interactivity, and aesthetic considerations behind the webpage. It serves as a reference for understanding the artistic choices and user experience enhancements implemented.
