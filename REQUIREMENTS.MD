Frontend Developer Task
Alzaf IT
Please read the task carefully and follow all instructions before starting. The task is expected to take about 2-3 hours to complete.

Evaluation Summary
Design is NOT important for this task. Submissions will not be judged based on UI/UX or visual design.

We will primarily evaluate:

Next.js expertise (especially Server-Side Rendering)
Code quality and readability
Project structure and code organization
Proper data fetching and separation of concerns
Submissions will be reviewed on a first-come, first-served basis.

Task Description
You are required to build a simple frontend application that mimics a basic e-commerce website with the following features:

Mandatory
A homepage containing:
A banner carousel
A responsive product grid (maximum 4 products per row on large screens)
A product details page
A header with category-based navigation
Additional pages or blocks are optional but encouraged.
Optional
You are encouraged to handle 500 and 404 errors properly. (Bonus Tips: Product ID 1 will always return a 500 error)
Technical Instructions
Base URL: https://alzaf-frontend-2025.vercel.app/api
Fetch all products from:
GET /products
Query Parameters:

category: Filter by category slug (e.g., electronics)
minPrice / maxPrice: Filter by price range
search: Search by name, description, or brand
sort: Sort options:
price-asc, price-desc
name-asc, name-desc
rating-asc, rating-desc
page / limit: Pagination (default: 1 / 10)
Fetch product details from:GET /products/{id}
Fetch categories from:GET /categories
Fetch banners from:GET /banners
All data fetching must be server-side. You may use:
SSR (recommended)
Server Actions
You may use shadcn/ui (recommended) or any other UI library. UI choice will not affect your score.
Additional Notes
The application must be fully responsive and work across all screen sizes.
Usage of AI tools is strictly prohibited. Any AI usage will result in immediate disqualification.
Submission Details
Deadline:3rd January 2026, 11:59 PM
Push your code to a public GitHub repository and deploy it to a platform of your choice.
Early submissions are encouraged as reviews will be conducted on a rolling basis.
Send your GitHub repository link and live deployment link to: hr@alzaf.com