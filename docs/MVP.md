# Spec Plan: Recipe Video Website (MVP)

**I. Project Overview**

- **Project Name (Working Title):** Recipe Video Website (MVP)
- **Project Goal:** To create a minimal viable product (MVP) website using Next.js to showcase recipe videos hosted on YouTube, providing access to the associated recipe details (ingredients and steps) retrieved from a MongoDB database. The primary focus is on building the backend functionality.
- **Target Audience:** Self and friends (proof of concept).
- **Key Features:**
  - Individual web pages for each recipe video, accessible via a unique URL.
  - Display of embedded YouTube Shorts videos.
  - Clear presentation of ingredients retrieved from the database.
  - Step-by-step instructions retrieved from the database.
  - A simple homepage listing links to available recipes.

**II. Detailed Feature Breakdown**

- **Recipe Page:**

  - **Page URL Structure:** `/recipes/[drink-name]` (where `drink-name` is derived from the recipe title).
  - **Page Content:**
    - **Video Player:** Embedded YouTube Short.
    - **Recipe Title:** Retrieved from the MongoDB database.
    - **Ingredients Section:** Formatted list, retrieved from the MongoDB database.
    - **Steps Section:** Numbered list, retrieved from the MongoDB database.

- **Homepage:**

  - **Purpose:** To provide a simple list of available recipes.
  - **Content:** A list of links, where each link's text is the recipe name and the link points to the corresponding recipe page (`/recipes/[drink-name]`).

- **Navigation:**

  - Very basic. The homepage provides the primary "navigation" for now.

- **Search Functionality:** Not included in the MVP.

**III. Technical Specifications**

- **Technology Stack:**

  - **Frontend Framework:** Next.js (React-based)
  - **Backend Framework/Data Fetching:** tRPC
  - **Database:** MongoDB (free hosted version)
  - **Schema Definition:** Zod
  - **Hosting:** Vercel (free hosting)

- **Data Storage:** MongoDB collection for drinks, containing recipe details (title, ingredients, steps) and the associated YouTube video ID.

- **Video Hosting:** YouTube Shorts (embedded).

- **Development Environment:** (You'll define your specific tools)
  - Version Control: Git (recommended)

**IV. Content Plan**

- **Existing Content:** Approximately 100 videos hosted on YouTube.
- **Data Collection - Phase 1 (MVP):** Manual extraction of recipe data (name, ingredients, steps, YouTube video ID) for a small set of **5 drinks**. This data will be manually entered into the MongoDB database.
- **Data Collection - Phase 2 (Future):** Automated extraction of recipe data from video transcripts using an LLM and subsequent population of the MongoDB database. This is outside the scope of the MVP.
- **Content Organization:** Each drink will be a document in the MongoDB collection.

**V. Timeline (Focus on Phase 1 - MVP)**

- **Phase 1: MVP Development (Focus for your break)**
  1. **Set up Development Environment:**
     - Install necessary tools (Node.js, npm/yarn).
     - Initialize a Next.js project.
     - Set up local MongoDB connection (or connect to your hosted instance).
  2. **Set up Next.js with tRPC and MongoDB:**
     - Install tRPC dependencies.
     - Configure tRPC client and server.
     - Install MongoDB driver.
     - Establish connection to the MongoDB database.
  3. **Define MongoDB Schema (using Zod):**
     - Create a schema for the drink data (title, videoId, ingredients, steps).
  4. **Add Initial Data to MongoDB:**
     - Manually enter data for the first 5 drinks into the MongoDB collection.
  5. **Implement tRPC Functions:**
     - `fetchAllRecipes`: Retrieve a list of all recipe titles and IDs for the homepage.
     - `fetchRecipeByName(drinkName)`: Retrieve the full recipe details (including video ID, ingredients, steps) for a specific drink.
  6. **Create Homepage (`/pages/index.js`):**
     - Fetch the list of recipe titles using the `fetchAllRecipes` tRPC function.
     - Display the list of titles as links to their respective recipe pages.
  7. **Create Recipe Page (`app/recipes/[drink-name]/page.tsx` or `.jsx`):**
     - Use server components to fetch the recipe data based on the `drink-name` parameter.
     - Display the embedded YouTube Short.
     - Display the ingredients and steps.

**VI. Success Metrics (for the MVP)**

- Successful setup of the development environment.
- Successful connection between the Next.js application and the MongoDB database.
- Implementation of the `fetchAllRecipes` and `fetchRecipeByName` tRPC functions.
- Successful creation of the recipe page that dynamically displays data from the database.
- Creation of a basic homepage listing the available recipes.
- Ability to navigate from the homepage to individual recipe pages and view the video, ingredients, and steps for the initial 5 drinks.

**VII. Detailed Phase 1 Tasks and Acceptance Criteria**

This section provides a detailed breakdown of each task within Phase 1, outlining the specific steps and criteria for successful completion.

**Task 1: Set up Development Environment**

- **Goal:** Establish a consistent and reproducible development environment using Docker and a Dev Container, configured for both local and production MongoDB connections.
- **Description:** This involves adapting an existing Dev Container configuration, ensuring it includes the necessary tools and dependencies for Next.js development, and configuring connections to both local and production MongoDB instances.
- **Acceptance Criteria:**
  - **1.1 Dev Container Setup:**
    - Given an existing Dev Container configuration, when it is adapted for this project, then it should successfully build and run without errors.
    - The Dev Container should include Node.js and npm (or yarn) at compatible versions for Next.js development.
    - The Dev Container should include any necessary extensions or tools for a smooth development experience (e.g., ESLint, Prettier).
    - A basic `README.md` file should be created within the Dev Container directory, outlining its purpose and the included features.
  - **1.2 Git Repository Initialization:**
    - Given a new project directory, when a Git repository is initialized, then the initial commit should contain the adapted Dev Container configuration.
    - A suitable `.gitignore` file should be configured to exclude unnecessary files and directories.
  - **1.3 Local MongoDB Connection:**
    - Given the Dev Container is running, when the application attempts to connect to a locally running MongoDB instance (assuming one is running), then the connection should be established successfully without errors.
    - Environment variables or configuration files should be set up to manage the local MongoDB connection string.
  - **1.4 Production MongoDB Connection:**
    - Given the Dev Container is running, when the application attempts to connect to the hosted production MongoDB instance (using placeholder credentials for now), then the connection should be established successfully without errors.
    - Environment variables or configuration files should be set up to manage the production MongoDB connection string, ensuring they are separate from the local configuration.
  - **1.5 Basic Project Initialization:**
    - Given the Dev Container is running, when a basic Next.js project is initialized within the container, then the default Next.js application should run successfully (e.g., the default "Welcome to Next.js!" page is accessible).

**Task 2: Install Next.js with tRPC and MongoDB & Establish Connection**

- **Goal:** Integrate the core technologies (Next.js, tRPC, MongoDB) into the project and establish a working data connection.
- **Description:** This involves installing the necessary dependencies, configuring tRPC for backend communication, and writing the initial code to connect to the MongoDB database.
- **Acceptance Criteria:**
  - **2.1 Dependency Installation:**
    - Given the Next.js project is initialized, when the `trpc-react`, `@trpc/server`, `@trpc/client`, `@tanstack/react-query`, and `mongodb` packages are installed, then the installation should complete without errors and the dependencies should be listed in `package.json`.
  - **2.2 tRPC Setup:**
    - Given the necessary tRPC packages are installed, when a basic tRPC router is created (even if it has no procedures yet), then the project should compile without errors.
    - A basic tRPC client should be set up in the frontend, configured to connect to the tRPC router.
  - **2.3 MongoDB Connection Code:**
    - Given the `mongodb` package is installed, when a module or function is created to establish a connection to the MongoDB database (using the configured connection strings), then this module should be able to connect to both the local and production databases without errors.
    - The connection logic should be designed to reuse existing connections to avoid unnecessary overhead.
  - **2.4 Basic Data Fetch Test (Optional - Could be moved to Task 5):**
    - Given the MongoDB connection is established, when a simple query is executed against the database (even if the database is empty), then the query should execute without errors.

**Task 3: Create Zod Schemas**

- **Goal:** Define the data structure for drink recipes using Zod schemas for type safety and validation.
- **Description:** This involves creating Zod schemas that accurately represent the structure of the drink data that will be stored in MongoDB.
- **Acceptance Criteria:**
  - **3.1 Drink Schema Definition:**
    - Given the project setup, when a Zod schema named `DrinkSchema` (or similar) is created, then it should define the following properties with appropriate types:
      - `_id`: MongoDB ObjectId
      - `name`: String
      - `videoId`: String
      - `ingredients`: Array of Strings
      - `steps`: Array of Strings
  - **3.2 Schema Export:**
    - The `DrinkSchema` should be properly exported so it can be used in other parts of the application (e.g., tRPC procedures).
  - **3.3 Type Inference (Optional):**
    - TypeScript types should be inferable from the Zod schema (e.g., using `z.infer`).

**Task 4: Hardcode Initial Drink Data**

- **Goal:** Provide a set of default drink recipes that can be automatically added to the database in development mode for easy setup.
- **Description:** This involves creating a data structure (e.g., an array of JavaScript objects) containing the details for the first five drinks.
- **Acceptance Criteria:**
  - **4.1 Data Structure Creation:**
    - Given the project setup, when a data structure (e.g., a `seedData.js` file) is created, then it should contain an array of at least 5 JavaScript objects.
  - **4.2 Data Format:**
    - Each object in the array should conform to the structure defined by the `DrinkSchema` (or a simplified version for initial seeding).
    - Each object should contain realistic example data for a drink recipe (name, videoId, ingredients, steps).
  - **4.3 Database Seeding Logic:**
    - Given the MongoDB connection is established, when code is implemented to check if the database is empty (or has fewer than 5 drinks), then the hardcoded data should be inserted into the `drinks` collection.
    - This seeding logic should ideally only run in development mode.

**Task 5: Implement tRPC Functions (Proof of Concept)**

- **Goal:** Create and test the core tRPC procedures for fetching recipe data.
- **Description:** This involves defining the `fetchAllRecipes` and `fetchRecipeByName` procedures in the tRPC router and ensuring they can successfully retrieve data from the MongoDB database.
- **Acceptance Criteria:**
  - **5.1 `fetchAllRecipes` Procedure:**
    - Given the tRPC router is set up, when a `fetchAllRecipes` procedure is defined, then it should successfully connect to the MongoDB database.
    - When `fetchAllRecipes` is called, it should return an array of objects, where each object contains at least the `_id` and `name` of a drink from the database.
  - **5.2 `fetchRecipeByName` Procedure:**
    - Given the tRPC router is set up, when a `fetchRecipeByName` procedure is defined, then it should successfully connect to the MongoDB database.
    - When `fetchRecipeByName` is called with a valid drink name, it should return a single object containing all the details for that drink (as defined by the `DrinkSchema`).
    - When `fetchRecipeByName` is called with a drink name that does not exist in the database, it should handle the case gracefully (e.g., return `null` or throw an appropriate error).
  - **5.3 Basic Client-Side Testing:**
    - Using a simple client-side component or a testing utility, verify that both tRPC procedures can be called from the frontend and return the expected data.

**Task 6: Create Homepage with Recipe List**

- **Goal:** Implement the homepage to display a list of available recipes fetched using the `fetchAllRecipes` tRPC procedure.
- **Description:** This involves creating a server component for the homepage, fetching the recipe data, and rendering a list of links to the individual recipe pages.
- **Acceptance Criteria:**
  - **6.1 Homepage Server Component:**
    - Given the Next.js project setup, when a server component is created at `app/page.tsx` (or `.jsx`), then it should render without errors.
  - **6.2 Data Fetching:**
    - Within the homepage server component, the `fetchAllRecipes` tRPC procedure should be called to retrieve the list of recipes.
    - The data fetching should be done on the server-side.
  - **6.3 Recipe List Display:**
    - The homepage should display a list of the recipe names retrieved from the database.
    - Each recipe name should be a hyperlink (`<a>` tag) that points to the corresponding recipe page (`/recipes/[drink-name]`).

**Task 7: Create Recipe Page (`app/recipes/[drink-name]/page.tsx` or `.jsx`)**

- **Goal:** Implement the individual recipe page to display the details of a specific drink fetched using the `fetchRecipeByName` tRPC procedure.
- **Description:** This involves creating a dynamic route in Next.js, fetching the recipe data based on the `drink-name` parameter, and rendering the video, ingredients, and steps.
- **Acceptance Criteria:**
  - **7.1 Dynamic Route Setup:**
    - Given the Next.js project setup, when a file is created at `app/recipes/[drink-name]/page.tsx` (or `.jsx`), then Next.js should recognize this as a dynamic route.
  - **7.2 Data Fetching on the Server:**
    - Within the recipe page server component, the `fetchRecipeByName` tRPC procedure should be called, passing the `drink-name` from the route parameters.
    - The data fetching should be done on the server-side.
  - **7.3 Video Embedding:**
    - The recipe page should embed the YouTube Short video using the `videoId` retrieved from the database.
  - **7.4 Ingredient Display:**
    - The ingredients for the drink should be displayed in a clear and readable format (e.g., a bulleted list).
  - **7.5 Steps Display:**
    - The steps for making the drink should be displayed in a clear and ordered format (e.g., a numbered list).
  - **7.6 Page Accessibility:**
    - When a user navigates to a URL like `/recipes/example-drink`, the corresponding recipe page should load and display the correct information.

**Next Steps:**

Begin working on **Phase 1: MVP Development**, starting with **Task 1: Set up Development Environment**. Good luck!
