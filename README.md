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
