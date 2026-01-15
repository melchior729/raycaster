# Abhay's Raycaster

A lightweight, high-performance raycasting engine built from scratch using modern **Vanilla JavaScript** and the HTML5 **Canvas API**. This project demonstrates the mathematical principles behind retro 3D rendering (similar to *Wolfenstein 3D*) without external game engines or libraries.

![Project Screenshot](imgs/example.png)

## Features

* **Core Raycasting Engine:** Implements the **DDA (Digital Differential Analysis)** algorithm for precise and efficient wall detection.
* **Procedural Map Generation:**
    * **Pillars:** A classic grid of pillars.
    * **Simple Border:** An empty room with solid borders.
    * **Expanding Square:** A mathematically generated, recursive geometric pattern.
* **Real-time Customization:**
    * Adjustable grid resolution (16x16 to 144x144).
    * Dynamic wall and background color styling.
    * Live map switching.
* **Zero Dependencies:** Written entirely in ES6+ JavaScript modules.

## Controls

| Key | Action |
| :--- | :--- |
| **W** | Move Forward |
| **S** | Move Backward |
| **A** | Rotate Camera Left |
| **D** | Rotate Camera Right |
| **Shift** | Sprint |

**UI Controls:** Use the bottom panel to change colors, map patterns, and grid complexity.

## Technical Implementation

### Architecture
The project follows a modular Object-Oriented structure:

* **`Raycaster.js`**: The core math engine. It casts rays from the player's perspective using vector math to calculate wall distances.
* **`World.js`**: Manages the grid data and procedural generation logic for map patterns.
* **`Player.js`**: Handles physics, collision checks, and movement vectors/rotation matrices.
* **`Artist.js`**: Handles the rendering pipeline, drawing vertical strips to the Canvas based on calculated ray depths (fisheye correction included).
* **`InputController.js`**: Manages asynchronous keyboard state for smooth movement.

### The DDA Algorithm
Instead of stepping forward by a fixed distance (which is inaccurate) or checking every pixel (which is slow), this engine uses **Digital Differential Analysis**.

The `_dda` method in `Raycaster.js` calculates the length of the ray from the current position to the next x-side or y-side of a grid square. This ensures the algorithm only checks grid intersections, making it extremely efficient, running effectively `O(N)` time complexity.

## Installation & Setup

From the project directory:

```bash
# install live-server globally (once)
npm install -g live-server

# run the server
live-server
```

## Author

**Abhay Manoj**

- [GitHub  ](https://www.github.com/melchior729)
- [LinkedIn](https://www.linkedin.com/in/abhaymanoj729)

Created for educational purposes to explore vector math and computer graphics.
